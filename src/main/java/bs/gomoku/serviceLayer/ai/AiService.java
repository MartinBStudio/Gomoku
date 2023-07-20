package bs.gomoku.serviceLayer.ai;

import bs.gomoku.serviceLayer.api.jobsmodel.JobsGame;
import bs.gomoku.utils.Utils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class AiService {
    public JobsGame.Coords getNextCoords(List<JobsGame.Coords> coords, int depth) {
        BoardComponent boardComponent = new BoardComponent(40);
        // Change format of Coords from Jobs API to AI
        for (JobsGame.Coords coord : coords) {
            int[] formatedCoords =
                    Utils.reformatCoordsFromJobsToAi(
                            coord.getX(), coord.getY(), boardComponent.getBoardSize(), coord.isEnemy());
            coord.setX(formatedCoords[0]);
            coord.setY(formatedCoords[1]);
        }
        // Calculate move
        int[] aiMove;
        if (coords.size() > 0) {
            for (JobsGame.Coords coord : coords) {
                boardComponent.addStone(coord.getX(), coord.getY(), coord.isEnemy());
            }
            aiMove = new MinmaxComponent(boardComponent).calculateNextMove(depth);
            boardComponent.addStone(aiMove[1], aiMove[0], false);
        } else {
            aiMove = new int[]{20, 20};
        }
        // Format coords from AI format to Jobs API format
        int[] formattedAiCoords =
                Utils.reformatCoordsFromAiToJobs(
                        aiMove[0], aiMove[1], boardComponent.getBoardSize(), false);
        return new JobsGame.Coords(formattedAiCoords[1], formattedAiCoords[0], true);
    }

    public JobsGame.Coords getNextDumbCoords() {
        return new JobsGame.Coords(new Random().nextInt(19), new Random().nextInt(19), true);
    }
}
