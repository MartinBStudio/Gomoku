package bs.gomoku.service.api.jobsmodel;

import bs.gomoku.Gomoku;
import bs.gomoku.service.logger.LoggerService;
import bs.gomoku.service.profile.ProfileModel;
import bs.gomoku.service.profile.ProfileService;
import bs.gomoku.utils.SAC;
import lombok.Getter;
import org.json.JSONObject;

import java.util.List;

public class JobsRequest {

    public String endpointURL;
    public String userEmail;
    public JSONObject jsonPayload = new JSONObject();
    public Type type;
    public JobsGame game;
    public ProfileModel profileModel;

    public JobsRequest(Type type, JobsGame game, String userEmail) {
        this.userEmail = userEmail;
        ProfileModel profile = SAC.getBean(ProfileService.class).loadProfile(userEmail);
        if (type.equals(Type.CHECK_STATUS)) {
            endpointURL = URLs.checkStatus;
            jsonPayload.put("userToken", profile.getUserToken());
            jsonPayload.put("gameToken", game.getGameId());
            this.game = game;
            this.type = type;
        }
        if (type.equals(Type.MAKE_MOVE)) {
            endpointURL = URLs.sendHit;
            jsonPayload.put("userToken", profile.getUserToken());
            jsonPayload.put("gameToken", game.getGameId());
            jsonPayload.put("positionX", game.getCoords().getX());
            jsonPayload.put("positionY", game.getCoords().getY());
            this.game = game;
            this.type = type;
        }
        if (type.equals(Type.CREATE_PLAYER)) {
            endpointURL = URLs.create;
            jsonPayload.put("nickname", profile.getUserName());
            jsonPayload.put("email", profile.getUserMail());
            this.type = type;
        }
        if (type.equals(Type.CREATE_GAME)) {
            endpointURL = URLs.connect;
            jsonPayload.put("userToken", profile.getUserToken());
            this.type = type;
        }
        displayRequest(jsonPayload);
    }

    public JobsRequest(Type type, ProfileModel profile) {
        if (type.equals(Type.CREATE_PLAYER)) {
            endpointURL = URLs.create;
            jsonPayload.put("nickname", profile.getUserName());
            jsonPayload.put("email", profile.getUserMail());
            this.type = type;
            this.profileModel = profile;
        }
        displayRequest(jsonPayload);
    }

    private void displayRequest(JSONObject request) {
        if (Gomoku.getIsDebugMode()) {
            var loggerService = SAC.getBean(LoggerService.class);
            loggerService.info(String.valueOf(request));
        }
    }

    public enum Type {
        CREATE_PLAYER(List.of(201, 0, 0)),
        CREATE_GAME(List.of(201, 0, 0)),
        CHECK_STATUS(List.of(200, 226, 0)),
        MAKE_MOVE(List.of(201, 226, 410));

        @Getter
        private final List<Integer> codes;

        Type(List<Integer> codes) {
            this.codes = codes;
        }
    }

    public static class URLs {
        private static final String createS = "/api/v1/user";
        private static final String connectS = "/api/v1/connect";
        private static final String checkStatusS = "/api/v1/checkStatus";
        private static final String sendHitS = "/api/v1/play";
        private static final String prefix = "https://piskvorky.jobs.cz";

        public static final String create = buildURL(createS);
        public static final String connect = buildURL(connectS);
        public static final String checkStatus = buildURL(checkStatusS);
        public static final String sendHit = buildURL(sendHitS);

        static String buildURL(String suffix) {
            return prefix + suffix;
        }
    }
}
