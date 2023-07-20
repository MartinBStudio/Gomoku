package bs.gomoku.service.api.jobsmodel;

import bs.gomoku.Gomoku;
import bs.gomoku.service.logger.LoggerService;
import bs.gomoku.utils.SAC;
import io.restassured.response.Response;
import org.json.JSONObject;

import java.util.List;

public class JobsResponse {

    public int statusCode;
    public JobsRequest request;
    public JSONObject jsonResponse;

    public JobsResponse(Response response, JobsRequest request) {
        this.jsonResponse = new JSONObject(response.asString());
        this.statusCode = response.statusCode();
        this.request = request;

        if (Gomoku.getIsDebugMode()) {
            SAC.getBean(LoggerService.class).info(List.of("Response", String.valueOf(jsonResponse)));
        }
    }
}
