package bs.gomoku.serviceLayer.events.listeners;

import bs.gomoku.serviceLayer.events.INotifier;
import bs.gomoku.serviceLayer.jobs.JobsFactory;
import bs.gomoku.serviceLayer.jobs.JobsService;
import bs.gomoku.serviceLayer.logger.LoggerService;
import bs.gomoku.utils.SAC;

import java.util.List;

public interface IWorkerStatus extends ISubscriber, INotifier {


    void onFinished(JobsFactory job);

    default void stopAllJobs(List<JobsFactory> runningJobs) {
        LoggerService logger = SAC.getBean(LoggerService.class);
        for (JobsFactory job : runningJobs) {
            job.setAutoRestart(false);
            job.cancel(true);
            logger.info(List.of("Job stopped ", job.getJobId()));
        }
        runningJobs.clear();
    }

    default void restartStoppedJob(String jobId, Boolean doRestart) {
        JobsService jobsService = SAC.getBean(JobsService.class);
        if (doRestart) {
            SAC.getBean(LoggerService.class).info(List.of("Auto restart is enabled, staring Autorun job again..", jobId));
            jobsService.startAutorunJob(jobId, true);
        }
    }
}
