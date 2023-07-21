package bs.gomoku.service.profile;

import bs.gomoku.service.api.jobsmodel.JobsGame;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileComponent profileComponent;

    public void deleteProfile(ProfileModel profileModel) {
        profileComponent.deleteProfile(profileModel);
    }

    public ProfileModel loadProfile(String userEmail) {
        return profileComponent.loadProfile(userEmail);
    }

    public Boolean canGameBeCreated(String userMail) {
        ProfileModel profileModel = loadProfile(userMail);
        return profileModel.getCreated() + profileModel.getInprogress() + profileModel.getNoOpponent()
                < profileModel.getMaximumGames();
    }

    public List<ProfileModel> getProfilesFromDb(String searchTerm) {
        return profileComponent.getProfilesFromDb(searchTerm);
    }

    public String createNewProfile(String password, String guiEmail) {
        return profileComponent.createNewProfile(password, guiEmail);
    }

    public void saveCreatedProfile(ProfileModel profileModel) {
        profileComponent.saveNewProfileToDb(profileModel);
    }

    public Boolean hasProfileSomePlayableGames(String userMail) {
        ProfileModel profile = loadProfile(userMail);
        return profile.getInprogress() > 0 || profile.getCreated() > 0 || profile.getNoOpponent() > 0;
    }

    public int totalProfileGameLives(String userMail) {
        ProfileModel profile = loadProfile(userMail);
        int totalLives = 0;
        for (JobsGame g : profile.getGames()) {
            totalLives += g.getLives();
        }
        return totalLives;
    }

    public int playableGamesCount(String userMail) {
        int playable = 0;
        List<JobsGame> games = loadProfile(userMail).getGames();
        for (JobsGame g : games) {
            if (g.getStatus().equals(JobsGame.Status.IN_PROGRESS)
                    || g.getStatus().equals(JobsGame.Status.CREATED)
                    || g.getStatus().equals(JobsGame.Status.NO_OPPONENT)) {
                playable += 1;
            }
        }
        return playable;
    }

    public Boolean isProfilePresent(String userMail) {
        return profileComponent.isPresent(userMail);
    }
}
