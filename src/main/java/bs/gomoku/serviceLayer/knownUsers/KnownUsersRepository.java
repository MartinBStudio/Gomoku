package bs.gomoku.serviceLayer.knownUsers;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KnownUsersRepository extends JpaRepository<KnownUserEntity, String> {
    @Query("select knownUserEntity from KnownUserEntity knownUserEntity")
    List<KnownUserEntity> getAllKnownUsers();

    @Query("select knownUserEntity from KnownUserEntity knownUserEntity " +
            "where lower(knownUserEntity.userName) like lower(concat('%', :searchTerm, '%'))")
    List<KnownUserEntity> search(@Param("searchTerm") String searchTerm);
}
