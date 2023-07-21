package bs.gomoku.utils;

import bs.gomoku.Gomoku;
import bs.gomoku.service.api.jobsmodel.JobsGame;
import bs.gomoku.service.knownUsers.KnownUsersService;
import bs.gomoku.service.logger.LogMessageModel;
import bs.gomoku.service.logger.LoggerService;
import bs.gomoku.service.profile.ProfileModel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class Utils {
    public static final String MAIN_PROFILE_USER_ID = System.getenv("GOMOKU_MAIN_USER_TOKEN");
    private static LoggerService loggerService;
    private static KnownUsersService knownUsersService;

    @Autowired
    public Utils(LoggerService loggerService, KnownUsersService knownUsersService) {
        Utils.loggerService = loggerService;
        Utils.knownUsersService = knownUsersService;
    }

    public static List<JobsGame.Coords> getGameCoordsFromJsonArray(
            JSONArray jsonCoords, String userId) {
        List<JobsGame.Coords> usedCoords = new ArrayList<>();
        int x;
        int y;
        for (Object object : jsonCoords) {
            JSONObject jsonObject = (JSONObject) object;
            x = jsonObject.getInt("x");
            y = jsonObject.getInt("y");
            String playerID = jsonObject.getString("playerId");
            if (playerID.equals(userId)) {
                usedCoords.add(new JobsGame.Coords(x, y, false));
            } else {
                usedCoords.add(new JobsGame.Coords(x, y, true));
            }
        }
        return usedCoords;
    }

    public static Integer countRuntime(int startTime) {
        Integer runtimeTotalSeconds = LocalDateTime.now().toLocalTime().toSecondOfDay() - startTime;
        loggerService.info(runtimeTotalSeconds);
        return LocalDateTime.now().toLocalTime().toSecondOfDay() - startTime;
    }

    public static void setSystemProperties() {
        System.setProperty("java.awt.headless", "false");
        System.setProperty("jdbc.javaNetNio", "false");
    }

    public static long[] getApplicationRuntimeArray(LocalDateTime startTime, LocalDateTime endTime) {
        LocalDateTime from = startTime;
        LocalDateTime to = endTime;
        Duration duration = Duration.between(from, to);
        long totalSeconds = duration.getSeconds();
        return formatSecondsToRuntimeFormat(totalSeconds);
    }

    public static long[] formatSecondsToRuntimeFormat(long totalSeconds) {
        long[] runtimeArray = new long[4];
        runtimeArray[0] = (totalSeconds / 3600 / 24) % 365;
        runtimeArray[1] = (totalSeconds / 3600) % 24;
        runtimeArray[2] = (totalSeconds % 3600) / 60;
        runtimeArray[3] = totalSeconds % 60;
        return runtimeArray;
    }

    public static int[] reformatCoordsFromJobsToAi(int x, int y, int boardSize, Boolean isEnemy) {
        int[] coords = new int[2];
        int originalX = x;
        int originalY = y;
        int formatedX = 0;
        int formatedY = 0;
        if (originalX > 0) {
            formatedX = boardSize / 2 + originalX - 1;
        }
        if (originalY > 0) {
            formatedY += boardSize / 2 + originalY - 1;
        }
        if (originalX < 0) {
            formatedX = boardSize / 2 + originalX - 1;
        }
        if (originalY < 0) {
            formatedY = boardSize / 2 + originalY - 1;
        }
        if (originalY == 0) {
            formatedY = boardSize / 2 - 1;
        }
        if (originalX == 0) {
            formatedX = boardSize / 2 - 1;
        }
        coords[0] = formatedX;
        coords[1] = formatedY;
        if (Gomoku.getIsDebugMode()) {
            loggerService.info(
                    List.of(
                            "Formated coords API -> AI",
                            "X",
                            originalX,
                            coords[0],
                            "Y",
                            originalY,
                            coords[1],
                            "Is enemy: ",
                            isEnemy));
        }
        return coords;
    }

    public static int[] reformatCoordsFromAiToJobs(int x, int y, int boardSize, Boolean isEnemy) {
        int[] coords = new int[2];
        int boardOffset = boardSize / 2;
        int originalX = x;
        int originalY = y;
        int formattedX = 0;
        int formattedY = 0;
        if (originalX < boardOffset) {
            formattedX = ((boardOffset - originalX - 1) * -1);
        }
        if (originalX >= boardOffset) {

            formattedX = ((boardOffset - originalX + 1) * -1) + 2;
        }
        if (originalY < boardOffset) {

            formattedY = ((boardOffset - originalY - 1) * -1);
        }
        if (originalY >= boardOffset) {
            formattedY = ((boardOffset - originalY + 1) * -1) + 2;
        }
        if (originalX == 19) {
            formattedX = 0;
        }
        if (originalY == 19) {
            formattedY = 0;
        }
        coords[0] = formattedX;
        coords[1] = formattedY;
        if (Gomoku.getIsDebugMode()) {
            loggerService.info(
                    List.of(
                            "Formated coords AI -> API",
                            "X",
                            originalX,
                            coords[0],
                            "Y",
                            originalY,
                            coords[1],
                            "Is enemy: ",
                            isEnemy));
        }
        return coords;
    }

    public static void displayGameInLog(JobsGame game, ProfileModel profile) {
        String gameID = game.getGameId();
        String circle = getEnemyUsername(game.getCircleId());
        String cross = getEnemyUsername(game.getCrossId());
        loggerService.info(
                List.of(
                        profile.getUserName(),
                        circle,
                        cross,
                        gameID.substring(0, gameID.length() - 33),
                        game.getLives(),
                        game.getStatus()));

    }

    public static String getTimestamp() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss"));
    }

    public static String getAplicationRuntimeInStringFormat() {
        long[] runtimeArray = Utils.getApplicationRuntimeArray(Gomoku.getStartDateTime(), LocalDateTime.now());
        return runtimeArray[0]
                + " Days "
                + runtimeArray[1]
                + " Hours "
                + runtimeArray[2]
                + " Minutes "
                + runtimeArray[3]
                + " Seconds";
    }

    public static int countWinrate(int won, int lost) {
        float percentWinrate = ((float) won / ((float) won + (float) lost)) * 100;
        int formatedWinrate = (int) percentWinrate;
        return formatedWinrate;
    }

    public static LinkedList<LogMessageModel> reverseOrderInLinkedList(LinkedList<LogMessageModel> originalList) {
        LinkedList<LogMessageModel> reversedList = new LinkedList<>();
        for (int i = originalList.size() - 1; i > 0; i--) {
            reversedList.add(originalList.get(i));
        }
        return reversedList;
    }

    public static String getEnemyUsername(String userId) {
        return knownUsersService.getUserNameFromUserId(userId);
    }

    public static Boolean isEnemyMyMain(String circleId, String crossI, String userId) {
        if (circleId.equals(MAIN_PROFILE_USER_ID) || crossI.equals(MAIN_PROFILE_USER_ID)) {
            if (!userId.equals(MAIN_PROFILE_USER_ID)) {
                {
                    return true;
                }
            }

        }
        return false;
    }
}
