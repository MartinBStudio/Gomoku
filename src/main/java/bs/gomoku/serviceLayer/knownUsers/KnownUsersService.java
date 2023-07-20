package bs.gomoku.serviceLayer.knownUsers;

import bs.gomoku.serviceLayer.logger.LoggerService;
import bs.gomoku.serviceLayer.profile.ProfileModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KnownUsersService {
    private final KnownUsersRepository knownUsersRepository;
    private final LoggerService loggerService;
    private List<KnownUserEntity> knownUsers;

    public KnownUsersService(KnownUsersRepository knownUsersRepository, LoggerService loggerService) {
        this.knownUsersRepository = knownUsersRepository;
        this.loggerService = loggerService;
        knownUsers = knownUsersRepository.getAllKnownUsers();
    }

    public String getUserNameFromUserId(String userId) {
        for (KnownUserEntity knownUser : knownUsers) {
            if (knownUser.userId.equals(userId)) {
                return knownUser.userName;
            }
        }
        return "Unknown user";
    }

    public void saveNewKnownUser(KnownUserEntity knownUser) {
        knownUsersRepository.save(knownUser);
        knownUsers = knownUsersRepository.getAllKnownUsers();
        loggerService.info(List.of("Added known user: ", knownUser.getUserName()));
    }

    public void deleteExistingKnownUser(ProfileModel profile) {
        knownUsersRepository.delete(new KnownUserEntity(profile.getUserName(), profile.getUserId()));
        knownUsers = knownUsersRepository.getAllKnownUsers();
        loggerService.info(List.of("Deleted known user: ", profile.getUserName()));
    }

    public List<KnownUserEntity> displayKnownUsers(String searchTerm) {
        if (searchTerm.isEmpty() || searchTerm == null) {
            return knownUsersRepository.getAllKnownUsers();
        } else {
            return knownUsersRepository.search(searchTerm);
        }
    }

}
