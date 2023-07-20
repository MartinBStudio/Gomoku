package bs.gomoku.serviceLayer.suiteResult;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SuiteResultService {

    private final SuiteResultRepository suiteResultRepository;

    @Autowired
    public SuiteResultService(SuiteResultRepository suiteResultRepository) {
        this.suiteResultRepository = suiteResultRepository;
    }

    public void saveResult(SuiteResultModel testResultModel) {
        SuiteResultEntity testResultEntity = new SuiteResultEntity();
        testResultEntity.suiteName = testResultModel.getSuitName();
        testResultEntity.timestamp = testResultModel.getTimeStamp();
        testResultEntity.runtime = testResultModel.getRuntime();
        testResultEntity.result = testResultModel.getResult().toString();
        testResultEntity.total = testResultModel.getTotal();
        testResultEntity.passed = testResultModel.getPassed();
        testResultEntity.failed = testResultModel.getFailed();
        testResultEntity.propertiesBody = new Gson().toJson(testResultEntity);
        suiteResultRepository.save(testResultEntity);
    }
}
