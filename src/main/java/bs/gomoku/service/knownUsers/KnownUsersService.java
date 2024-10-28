package bs.gomoku.service.knownUsers;

import bs.gomoku.service.logger.LoggerService;
import bs.gomoku.service.profile.ProfileModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class KnownUsersService {
  private final KnownUsersRepository knownUsersRepository;
  private final LoggerService loggerService;


  public String getUserNameFromUserId(String userId) {
    return knownUsersRepository.getAllKnownUsers().stream()
            .filter(user -> user.userId.equals(userId))
            .map(KnownUserEntity::getUserName)
            .findFirst()
            .orElse("Unknown user");
  }

  public void saveNewKnownUser(KnownUserEntity knownUser) {
    knownUsersRepository.save(knownUser);
    loggerService.info(List.of("Added known user:", knownUser.getUserName()));
  }

  public void deleteExistingKnownUser(ProfileModel profile) {
    String userName = profile.getUserName();
    knownUsersRepository.findByUserName(userName).ifPresentOrElse(
            user -> {
              knownUsersRepository.delete(user);
              loggerService.info(List.of("Deleted known user:", userName));
            },
            () -> loggerService.info(List.of("Known user not found:", userName))
    );
  }

  public List<KnownUserEntity> displayKnownUsers(String searchTerm) {
    searchTerm = Objects.requireNonNullElse(searchTerm, "").trim();
    return searchTerm.isEmpty()
            ? knownUsersRepository.getAllKnownUsers()
            : knownUsersRepository.search(searchTerm);
  }
}
