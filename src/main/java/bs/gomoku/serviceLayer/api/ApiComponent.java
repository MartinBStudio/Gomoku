package bs.gomoku.serviceLayer.api;

import bs.gomoku.serviceLayer.ai.AiService;
import bs.gomoku.serviceLayer.api.jobsmodel.JobsGame;
import bs.gomoku.serviceLayer.api.jobsmodel.JobsRequest;
import bs.gomoku.serviceLayer.api.jobsmodel.JobsResponse;
import bs.gomoku.serviceLayer.events.INotifier;
import bs.gomoku.serviceLayer.logger.LoggerService;
import bs.gomoku.serviceLayer.profile.ProfileModel;
import bs.gomoku.serviceLayer.profile.ProfileService;
import bs.gomoku.utils.Utils;
import io.restassured.RestAssured;
import io.restassured.http.Method;
import io.restassured.response.Response;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

import static bs.gomoku.serviceLayer.events.INotifier.Type.PROFILE_UPDATED;

@Component
@RequiredArgsConstructor
public class ApiComponent {

    private final AiService aiService;
    private final ProfileService profileService;
    private final LoggerService loggerService;

    void makeRequest(JobsRequest request) {
        if (!request.type.equals(JobsRequest.Type.CREATE_PLAYER)) {
            request.profileModel = profileService.loadProfile(request.userEmail);
        }
        RestAssured.baseURI = request.endpointURL;
        Response response =
                RestAssured.given()
                        .header("Content-Type", "application/json")
                        .body(request.jsonPayload.toString())
                        .request(Method.POST);
        new ResponseHandlers().processResponse(new JobsResponse(response, request));
    }

    private class ResponseHandlers implements INotifier {

        private JobsGame.Coords handleNewCoords(JSONArray coordinates, String userId) {
            List<JobsGame.Coords> usedCoords = Utils.getGameCoordsFromJsonArray(coordinates, userId);
            return aiService.getNextCoords(usedCoords, 4);
        }

        private JobsGame.Coords handleNewDumbCoords(JSONArray coordinates, String userId) {
            List<JobsGame.Coords> usedCoords = Utils.getGameCoordsFromJsonArray(coordinates, userId);
            return aiService.getNextCoords(usedCoords, 1);
        }

        protected void processResponse(JobsResponse pR) {
            if (pR.request.type.getCodes().contains(pR.statusCode)) {
                if (pR.request.type == JobsRequest.Type.CREATE_PLAYER) {
                    handleCreateProfile(pR);
                }
                if (pR.request.type == JobsRequest.Type.CREATE_GAME) {
                    handleCreateGame(pR);
                }
                if (pR.request.type == JobsRequest.Type.CHECK_STATUS) {
                    handleCheckStatus(pR);
                }
                if (pR.request.type == JobsRequest.Type.MAKE_MOVE) {
                    handleMakeMove(pR);
                }
            } else {
                handleErrorResponse(pR);
            }
        }

        private void handleMakeMove(JobsResponse r) {
            ProfileModel profile = r.request.profileModel;
            JobsGame currentGame = r.request.game;
            if (r.statusCode == 201) {
                currentGame.setLives(currentGame.getLives() + 2);
                currentGame.setIsMyturn(false);
            }
            for (JobsGame game : profile.getGames()) {
                if (game.getGameId().equals(currentGame.getGameId())) {
                    profile.getGames().set(profile.getGames().indexOf(game), currentGame);
                }
            }
            notify(PROFILE_UPDATED, profile);
        }

        private void handleCreateGame(JobsResponse r) {
            ProfileModel profile = r.request.profileModel;
            JSONObject j = r.jsonResponse;
            String gameToken = j.getString("gameToken");
            JobsGame game =
                    JobsGame.builder()
                            .gameId(gameToken)
                            .isMyturn(false)
                            .coords(new JobsGame.Coords(0, 0, false))
                            .status(JobsGame.Status.CREATED)
                            .build();
            profile.getGames().add(game);
            profile.setTotal(r.request.profileModel.getTotal() + 1);
            profile.setCreated(r.request.profileModel.getCreated() + 1);

            Utils.displayGameInLog(game, profile);
            notify(PROFILE_UPDATED, profile);
        }

        private void handleCheckStatus(JobsResponse r) {
            Boolean removeCurrentGame = false;
            JSONObject j = r.jsonResponse;
            Object actualPlayerId = j.get("actualPlayerId");
            Object playerCircleId = j.get("playerCircleId");
            Object playerCrossId = j.get("playerCrossId");
            Object winnerId = j.get("winnerId");
            JSONArray coordinates = j.getJSONArray("coordinates");
            JobsGame currentGame = r.request.game;
            ProfileModel profile = r.request.profileModel;

            // If one of players is null
            if (String.valueOf(playerCircleId).equals("null")
                    || String.valueOf(playerCrossId).equals("null")) {
                currentGame.setStatus(JobsGame.Status.NO_OPPONENT);
            } else {
                currentGame.setStatus(JobsGame.Status.IN_PROGRESS);
                currentGame.setCircleId(String.valueOf(playerCircleId));
                currentGame.setCrossId(String.valueOf(playerCrossId));
                currentGame.setIsEnemyMainProfile(Utils.isEnemyMyMain(currentGame.getCircleId(), currentGame.getCrossId(), profile.getUserId()));
            }
            if (actualPlayerId.equals(profile.getUserId())
                    && currentGame.getStatus() == JobsGame.Status.IN_PROGRESS
                    && r.statusCode != 226) {
                if (currentGame.getIsEnemyMainProfile()) {
                    currentGame.setCoords(handleNewDumbCoords(coordinates, profile.getUserId()));
                } else {
                    currentGame.setCoords(handleNewCoords(coordinates, profile.getUserId()));
                }
                currentGame.setIsMyturn(true);
            } else {
                currentGame.setIsMyturn(false);
                currentGame.setLives(currentGame.getLives() - 1);
            }

            if (currentGame.getLives() <= 0) {
                if (currentGame.getStatus() != JobsGame.Status.ABANDONED) {
                    currentGame.setStatus(JobsGame.Status.ABANDONED);
                    currentGame.setIsMyturn(false);
                    profile.setAbandoned(profile.getAbandoned() + 1);
                    removeCurrentGame = true;
                }
            }
            // If game is finished
            if (r.statusCode == 226) {
                if (String.valueOf(winnerId).equals(profile.getUserId())) {
                    if (currentGame.getStatus() != JobsGame.Status.WON) {
                        currentGame.setStatus(JobsGame.Status.WON);
                        profile.setWon(profile.getWon() + 1);
                        removeCurrentGame = true;
                    }
                } else {
                    if (currentGame.getStatus() != JobsGame.Status.LOST) {
                        currentGame.setStatus(JobsGame.Status.LOST);
                        profile.setLost(profile.getLost() + 1);
                        removeCurrentGame = true;
                    }
                }
            }
            Utils.displayGameInLog(currentGame, profile);
            for (JobsGame game : profile.getGames()) {
                if (game.getGameId().equals(currentGame.getGameId())) {
                    profile.getGames().set(profile.getGames().indexOf(game), currentGame);
                }
            }
            if (removeCurrentGame) {
                List<JobsGame> gamesToNotRemove = new ArrayList<>();
                for (JobsGame game : profile.getGames()) {
                    if (!game.getGameId().equals(currentGame.getGameId())) {
                        gamesToNotRemove.add(game);
                    }
                }
                profile.setGames(gamesToNotRemove);
            }
            updateGamesCount(profile);
        }

        private void handleCreateProfile(JobsResponse r) {
            ProfileModel profile = r.request.profileModel;
            JSONObject j = r.jsonResponse;
            Object userToken = j.get("userToken");
            Object userId = j.get("userId");
            profile.setUserToken((String) userToken);
            profile.setUserId((String) userId);
            profileService.saveCreatedProfile(profile);
        }

        private void handleErrorResponse(JobsResponse r) {
            int statusCode = r.statusCode;
            String errorMessage = r.jsonResponse.get("errors").toString();
            if (statusCode == 429) {
                if (r.request.type.equals(JobsRequest.Type.CREATE_PLAYER)) {
                    loggerService.info(List.of("Server is busy", statusCode, "Try again !!!"));
                }
            } else {
                loggerService.info(List.of("UNKNOWN_ERROR", r.request.type, statusCode, errorMessage));
            }
        }

        private void updateGamesCount(ProfileModel profile) {
            int inProgressGames = 0;
            int createdGames = 0;
            int noOpponent = 0;
            for (JobsGame game : profile.getGames()) {
                if (game.getStatus().equals(JobsGame.Status.IN_PROGRESS)) {
                    inProgressGames += 1;
                }
                if (game.getStatus().equals(JobsGame.Status.CREATED)) {
                    createdGames += 1;
                }
                if (game.getStatus().equals(JobsGame.Status.NO_OPPONENT)) {
                    noOpponent += 1;
                }
            }

            profile.setInprogress(inProgressGames);
            profile.setCreated(createdGames);
            profile.setNoOpponent(noOpponent);
            profile.setWinrate(Utils.countWinrate(profile.getWon(), profile.getLost()));
            notify(PROFILE_UPDATED, profile);
        }
    }
}
