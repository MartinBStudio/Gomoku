package bs.gomoku.serviceLayer.jobs;

import bs.gomoku.serviceLayer.events.listeners.IWorkerStatus;
import bs.gomoku.serviceLayer.logger.LoggerService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import static bs.gomoku.serviceLayer.jobs.JobsFactory.Type.AUTO_RUN;

@Component
public class JobsComponent implements IWorkerStatus {


    private final ExecutorService threadPool;
    private final LoggerService loggerService;
    @Getter
    private List<JobsFactory> runningJobs = new ArrayList<>();

    @Autowired
    public JobsComponent(LoggerService loggerService) {
        this.loggerService = loggerService;
        addSubscriber();
        threadPool = Executors.newFixedThreadPool(20);
    }

    @Override
    public void onFinished(JobsFactory jobId) {
        runningJobs.remove(jobId);
        restartStoppedJob(jobId.getJobId(), jobId.getAutoRestart());
    }

    void startAutorun(String userEmail, Boolean autoRestart) {
        if (isProfileIdle(userEmail)) {
            JobsFactory currentJob = new JobsFactory<>().init(AUTO_RUN, userEmail, autoRestart);
            runningJobs.add(currentJob);
            threadPool.execute(currentJob);
        } else {
            loggerService.info(List.of("Worker is busy", userEmail));
        }
    }

    Boolean isProfileIdle(String userMail) {
        Boolean profileIsIdle = true;
        for (JobsFactory job : runningJobs) {
            if (job.getJobId().equals(userMail)) {
                profileIsIdle = false;
                break;
            }
        }
        return profileIsIdle;
    }

    void stopSpecificJob(String jobToStop) {
        List<JobsFactory> tempJobs = new ArrayList<>();
        JobsFactory jobToCancel = null;
        for (JobsFactory runningJob : runningJobs) {
            if (runningJob.getJobId().equals(jobToStop)) {
                runningJob.setAutoRestart(false);
                jobToCancel = runningJob;
            } else {
                tempJobs.add(runningJob);
            }
        }
        jobToCancel.cancel(true);
        loggerService.info(List.of("Job stopped", jobToCancel.getJobId()));
        runningJobs = tempJobs;
    }
}
