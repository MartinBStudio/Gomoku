package bs.gomoku.service.api.jobsmodel;

import lombok.Builder;
import lombok.Data;
import lombok.experimental.Accessors;

@Builder
@Data
public class JobsGame {
    public Object statusCode;
    private String gameId;
    private Boolean isMyturn;
    private int index;
    private Status status;
    @Builder.Default
    private int lives = 30;
    private Coords coords;
    private String circleId;
    private String crossId;
    @Builder.Default
    private Boolean isEnemyMainProfile = false;

    public enum Status {
        IN_PROGRESS,
        NO_OPPONENT,
        CREATED,
        WON,
        LOST,
        ABANDONED
    }

    @Data
    @Accessors(chain = true)
    public static class Coords {
        private int x;
        private int y;

        private boolean isEnemy = true;

        public Coords(int x, int y, boolean isEnemy) {
            this.y = y;
            this.x = x;

            this.isEnemy = isEnemy;
        }
    }
}
