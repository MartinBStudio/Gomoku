package bs.gomoku.service.events.listeners;

import bs.gomoku.service.events.INotifier;
import bs.gomoku.service.jobs.JobsFactory;
import bs.gomoku.service.jobs.JobsService;
import bs.gomoku.service.logger.LoggerService;
import bs.gomoku.utils.IBeanProvider;
import bs.gomoku.utils.SAC;

import java.util.List;

public interface IWorkerStatus extends ISubscriber, INotifier, IBeanProvider {


    void onFinished(JobsFactory job);

    default void stopAllJobs(List<JobsFactory> runningJobs) {
        LoggerService logger = getBean(LoggerService.class);
        for (JobsFactory job : runningJobs) {
            job.setAutoRestart(false);
            job.cancel(true);
            logger.info(List.of("Job stopped ", job.getJobId()));
        }
        runningJobs.clear();
    }

    default void restartStoppedJob(String jobId, Boolean doRestart) {
        JobsService jobsService = getBean(JobsService.class);
        if (doRestart) {
            getBean(LoggerService.class).info(List.of("Auto restart is enabled, staring Autorun job again..", jobId));
            jobsService.startAutorunJob(jobId, true);
        }
    }
}
