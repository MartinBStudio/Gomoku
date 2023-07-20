package bs.gomoku.serviceLayer.suiteResult;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Component
@Repository
public interface SuiteResultRepository extends JpaRepository<SuiteResultEntity, Integer> {

  /*   @Query("SELECT testResult FROM SuiteResults testResult WHERE testResult.id=?1")
  Optional<SuiteResultEntity> findProfileEntityById(String entityId);*/

}
