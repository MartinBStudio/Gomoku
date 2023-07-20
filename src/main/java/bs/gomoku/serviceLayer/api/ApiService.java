package bs.gomoku.serviceLayer.api;

import bs.gomoku.serviceLayer.api.jobsmodel.JobsRequest;
import bs.gomoku.serviceLayer.events.listeners.ICreateProfile;
import bs.gomoku.serviceLayer.profile.ProfileModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static bs.gomoku.serviceLayer.api.jobsmodel.JobsRequest.Type.CREATE_PLAYER;

@Service
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
