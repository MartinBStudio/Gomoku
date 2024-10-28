package bs.gomoku.service.knownUsers;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KnownUsersRepository extends JpaRepository<KnownUserEntity, String> {
    @Query("select knownUserEntity from KnownUserEntity knownUserEntity")
    List<KnownUserEntity> getAllKnownUsers();

    Optional<KnownUserEntity> findByUserName(String userName);

    @Query("select knownUserEntity from KnownUserEntity knownUserEntity " +
            "where lower(knownUserEntity.userName) like lower(concat('%', :searchTerm, '%'))")
    List<KnownUserEntity> search(@Param("searchTerm") String searchTerm);
}
