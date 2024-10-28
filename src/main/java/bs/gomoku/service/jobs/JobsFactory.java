package bs.gomoku.service.jobs;


import bs.gomoku.service.api.ApiService;
import bs.gomoku.service.api.jobsmodel.JobsGame;
import bs.gomoku.service.api.jobsmodel.JobsRequest;
import bs.gomoku.service.events.INotifier;
import bs.gomoku.service.logger.LoggerService;
import bs.gomoku.service.profile.ProfileService;
import bs.gomoku.utils.IBeanProvider;
import bs.gomoku.utils.SAC;
import lombok.Getter;
import lombok.Setter;

import javax.swing.*;
import java.util.List;

import static java.lang.Thread.sleep;


public class JobsFactory<V, Number> extends SwingWorker<Void, Integer> implements INotifier, IBeanProvider {
    protected Integer maximumChunks;
    ProfileService profileService;
    LoggerService loggerService;
    ApiService apiService;
    @Getter
    private Type type;
    @Getter
    private String jobId;
    private String userEmail;
    @Getter
    @Setter
    private Boolean autoRestart;

    JobsFactory<V, Number> init(Type type, String userEmail, Boolean autoRestart) {
        this.autoRestart = autoRestart;
        this.userEmail = userEmail;
        profileService = getBean(ProfileService.class);
        apiService = getBean(ApiService.class);
        loggerService = getBean(LoggerService.class);
        loggerService.info(List.of("Job started", userEmail, "Auto restart", autoRestart));

        this.maximumChunks =
                profileService.loadProfile(userEmail).getMaximumGames() - profileService.playableGamesCount(userEmail);
        this.jobId = userEmail;
        this.type = type;
        return this;
    }

    @Override
    protected Void doInBackground() throws Exception {
        autoRun();
        return null;
    }

    @Override
    protected void done() {
        notify(INotifier.Type.WORK_FINISHED, this);
    }

    @Override
    protected void process(List<Integer> chunks) {
        //    guiService.setProgressBarValue(type, chunks.get(chunks.size() - 1), maximumChunks);
    }

    private void createGamesJob() throws InterruptedException {
        while (profileService.canGameBeCreated(userEmail)) {
            JobsRequest request = new JobsRequest(JobsRequest.Type.CREATE_GAME, null, userEmail);
            apiService.makeApiRequest(request);
            publish(profileService.loadProfile(userEmail).getGames().size());
            if (isCancelled()) {
                notify(INotifier.Type.WORK_FINISHED, this);
                break;
            }
            sleep(2000);
        }
    }

    private void autoRun() throws InterruptedException {
        if (!profileService.hasProfileSomePlayableGames(userEmail)) {
            createGamesJob();
        }
        while (profileService.hasProfileSomePlayableGames(userEmail)) {
            if (checkStatus()) break;
            if (profileService.canGameBeCreated(userEmail)) {
                createGamesJob();
                sleep(2000);
            }
        }
    }

    private boolean checkStatus() throws InterruptedException {
        for (JobsGame game : profileService.loadProfile(userEmail).getGames()) {
            if (game.getStatus() != JobsGame.Status.LOST
                    || game.getStatus() != JobsGame.Status.WON
                    || game.getStatus() != JobsGame.Status.ABANDONED) {
                JobsRequest request = new JobsRequest(JobsRequest.Type.CHECK_STATUS, game, userEmail);
                apiService.makeApiRequest(request);
                if (game.getIsMyturn()) {
                    request = new JobsRequest(JobsRequest.Type.MAKE_MOVE, game, userEmail);
                    apiService.makeApiRequest(request);
                }
            } else {
                getBean(LoggerService.class).info(game.getStatus());
            }
            publish(profileService.totalProfileGameLives(userEmail));
            sleep(3000);
        }
        if (isCancelled()) {
            notify(INotifier.Type.WORK_FINISHED, userEmail);
            return true;
        }
        return false;
    }


    public enum Type {
        AUTO_RUN,
    }
}
