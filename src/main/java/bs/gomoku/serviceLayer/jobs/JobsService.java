package bs.gomoku.serviceLayer.jobs;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobsService {
    private final JobsComponent jobsComponent;
    @Getter
    @Setter
    private Boolean doRestart = true;

    @Autowired
    public JobsService(JobsComponent jobsComponent) {
        this.jobsComponent = jobsComponent;
    }

    public Boolean isApplicationIdle() {
        return jobsComponent.getRunningJobs().size() == 0;
    }

    public List<JobsFactory> getRunningJobs() {
        return jobsComponent.getRunningJobs();
    }

    public void stopAllRunningJobs() {
        jobsComponent.stopAllJobs(getRunningJobs());
    }

    public void stopAutorunJob(String jobId) {
        jobsComponent.stopSpecificJob(jobId);
    }

    public void startAutorunJob(String jobId, Boolean autoRestart) {
        jobsComponent.startAutorun(jobId, autoRestart);
    }

    public Boolean isProfileIdle(String userMail) {
        return jobsComponent.isProfileIdle(userMail);
    }
}
