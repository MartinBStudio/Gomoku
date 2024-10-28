package bs.gomoku.service.profile;


import bs.gomoku.service.events.INotifier;
import bs.gomoku.service.events.listeners.IUpdateProfile;
import bs.gomoku.service.knownUsers.KnownUserEntity;
import bs.gomoku.service.knownUsers.KnownUsersService;
import bs.gomoku.service.logger.LoggerService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProfileComponent implements IUpdateProfile, INotifier {

    private final ProfileRepository profileRepository;
    private final LoggerService loggerService;
    private final KnownUsersService knownUsersService;

    @Autowired
    ProfileComponent(
            ProfileRepository profileRepository, LoggerService loggerService, KnownUsersService knownUsersService) {
        addSubscriber();
        this.profileRepository = profileRepository;
        this.loggerService = loggerService;
        this.knownUsersService = knownUsersService;
    }

    String createNewProfile(String guiEmail) {
        if (isPresent(guiEmail)) {
            return "User already exists: " + guiEmail;
        } else {
            String[] separatedUsername = guiEmail.split("@");
            notify(Type.CREATE_PROFILE, ProfileModel.builder()
                    .userName(separatedUsername[0])
                    .userMail(guiEmail)
                    .games(new ArrayList<>())
                    .build());
            return "Trying create new profile: " + guiEmail;
        }
    }

    @Override
    public void onProfileUpdated(ProfileModel profileModel) {
        profileRepository.updateExistingProfileEntity(
                profileModel.getUserMail(), new Gson().toJson((profileModel)));
    }

    Boolean isPresent(String userEmail) {
        return profileRepository.findProfileEntityById(userEmail).isPresent();
    }

    ProfileModel loadProfile(String userEmail) {
        ProfileEntity pE = profileRepository.findProfileEntityById(userEmail).get();
        ProfileModel profile = new Gson().fromJson(pE.profileString, ProfileModel.class);
        return profile;
    }

    void deleteProfile(ProfileModel profileModel) {
        loggerService.info(List.of("Attempt to delete", profileModel.getUserMail(), "disabled during development."));
        ProfileEntity profileEntity = new ProfileEntity();
        profileEntity.profileString = new Gson().toJson(profileModel);
        profileEntity.userMail = profileModel.getUserMail();
        knownUsersService.deleteExistingKnownUser(profileModel);
        profileRepository.delete(profileEntity);
    }

    void saveNewProfileToDb(ProfileModel profileModel) {
        ProfileEntity profileEntity = new ProfileEntity();
        profileEntity.profileString = new Gson().toJson(profileModel);
        profileEntity.userMail = profileModel.getUserMail();
        profileRepository.save(profileEntity);
        loggerService.info(List.of("Profile saved to DB", profileModel.getUserMail()));
        knownUsersService.saveNewKnownUser(new KnownUserEntity(profileModel.getUserName(), profileModel.getUserId()));
    }

    List<ProfileModel> getProfilesFromDb(String searchTerm) {
        List<ProfileEntity> profileEntities = searchTerm == "" || searchTerm == null ?
                profileRepository.findAllProfileEntities() :
                profileRepository.search(searchTerm);

        List<ProfileModel> profileModels = new ArrayList<>();
        for (ProfileEntity entity : profileEntities) {
            profileModels.add(new Gson().fromJson(entity.profileString, ProfileModel.class));
        }
        return profileModels;
    }
}
