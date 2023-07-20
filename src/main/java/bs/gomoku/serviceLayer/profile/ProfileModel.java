package bs.gomoku.serviceLayer.profile;

import bs.gomoku.serviceLayer.api.jobsmodel.JobsGame;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Accessors;

import javax.persistence.Transient;
import java.util.ArrayList;
import java.util.List;

@Builder
@Data
@Accessors(chain = true)
public class ProfileModel {
    @Builder.Default
    private String userName = "username";
    @Builder.Default
    private String userMail = "userMail";
    @Builder.Default
    private String password = "";
    @Builder.Default
    private String userToken = "null";
    @Builder.Default
    private String userId = "userId";
    @Builder.Default
    private int maximumGames = 2;
    @Builder.Default
    private Integer won = 0;
    @Builder.Default
    private Integer lost = 0;
    @Builder.Default
    private Integer created = 0;
    @Builder.Default
    private Integer total = 0;
    @Builder.Default
    private Integer inprogress = 0;
    @Builder.Default
    private Integer noOpponent = 0;
    @Builder.Default
    private Integer abandoned = 0;
    @Builder.Default
    private int current = 0;
    @Builder.Default
    private int winrate = 0;
    @Transient
    @Builder.Default
    private List<JobsGame> games = new ArrayList<>();
    @Builder.Default
    private int maximumTries = 60;

}
