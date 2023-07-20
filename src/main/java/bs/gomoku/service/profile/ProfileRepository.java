package bs.gomoku.service.profile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;

@Repository
public interface ProfileRepository extends JpaRepository<ProfileEntity, String> {

    @Query("SELECT profileEntity FROM ProfileEntity profileEntity WHERE profileEntity.userMail=?1")
    Optional<ProfileEntity> findProfileEntityById(String entityId);

    @Query(
            "SELECT profileEntity FROM ProfileEntity profileEntity")
    List<ProfileEntity> findAllProfileEntities();

    @Transactional
    @Modifying
    @Query(
            "update ProfileEntity profileEntity set profileEntity.profileString =?2  where profileEntity.userMail=?1")
    void updateExistingProfileEntity(String userId, String profileString);

    @Query("select profileEntity from ProfileEntity profileEntity " +
            "where lower(profileEntity.userMail) like lower(concat('%', :searchTerm, '%'))")
    List<ProfileEntity> search(@Param("searchTerm") String searchTerm);
}
