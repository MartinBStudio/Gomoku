package bs.gomoku.serviceLayer.suiteResult;

import lombok.Builder;
import lombok.Data;
import lombok.experimental.Accessors;

import javax.persistence.Column;

@Builder
@Data
@Accessors(chain = true)
public class SuiteResultModel {
    private String suitName;
    private String timeStamp;
    private int runtime;
    private SuiteResultEntity.SuiteResult result;
    private int total;
    private int passed;
    private int failed;

    @Column(length = 500)
    private String propertiesBody;
}
