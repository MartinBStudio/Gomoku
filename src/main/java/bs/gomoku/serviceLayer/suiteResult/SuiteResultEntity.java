package bs.gomoku.serviceLayer.suiteResult;


import jakarta.persistence.*;

@Entity
@Table(name = "TEST_SUITE_RESULTS")
public class SuiteResultEntity {
    @Id
    @Column
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "id_Sequence")
    @SequenceGenerator(name = "suiteResult_Sequence", sequenceName = "ID_SEQ")
    public int id;

    public String suiteName;
    public String timestamp;
    public int runtime;
    public String result;
    public int total;
    public int passed;
    public int failed;

    @Column(length = 5000)
    public String propertiesBody;

    public enum SuiteResult {
        FAILED,
        PASSED
    }
}
