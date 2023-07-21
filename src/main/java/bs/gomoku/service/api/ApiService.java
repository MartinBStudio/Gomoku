package bs.gomoku.service.api;

import bs.gomoku.service.api.jobsmodel.JobsRequest;
import bs.gomoku.service.events.listeners.ICreateProfile;
import bs.gomoku.service.profile.ProfileModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static bs.gomoku.service.api.jobsmodel.JobsRequest.Type.CREATE_PLAYER;

@Service
@Slf4j
public class ApiService implements ICreateProfile {

    private final ApiComponent apiComponent;

    @Autowired
    public ApiService(ApiComponent apiComponent) {
        addSubscriber();
        this.apiComponent = apiComponent;
    }

    public void makeApiRequest(JobsRequest request) {
        apiComponent.makeRequest(request);
    }

    @Override
    public void onProfileCreate(ProfileModel profile) {
        makeApiRequest(new JobsRequest(CREATE_PLAYER, profile));
    }
}
