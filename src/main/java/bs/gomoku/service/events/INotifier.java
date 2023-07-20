package bs.gomoku.service.events;

import bs.gomoku.service.events.listeners.*;
import bs.gomoku.service.jobs.JobsFactory;
import bs.gomoku.service.profile.ProfileModel;

import java.util.ArrayList;
import java.util.List;

import static bs.gomoku.service.events.INotifier.Type.*;


public interface INotifier {

    List<IUpdateProfile> updateProfileSubscribers = new ArrayList<>();
    List<ICreateProfile> createProfileSubscribers = new ArrayList<>();
    List<IWorkerStatus> workerStatusSubscribers = new ArrayList<>();
    List<IUpdateLog> updateLogSubscribers = new ArrayList<>();

    static void addSubscriber(ISubscriber listener) {
        if (listener instanceof IUpdateLog) {
            updateLogSubscribers.add((IUpdateLog) listener);
        }
        if (listener instanceof IUpdateProfile) {
            updateProfileSubscribers.add((IUpdateProfile) listener);
        }
        if (listener instanceof IWorkerStatus) {
            workerStatusSubscribers.add((IWorkerStatus) listener);
        }
        if (listener instanceof ICreateProfile) {
            createProfileSubscribers.add((ICreateProfile) listener);
        }
    }

    default void notify(Type type, Object param) {
        if (type == LOG_UPDATED) {
            for (IUpdateLog hl : INotifier.updateLogSubscribers) hl.onLogUpdate((String) param);
        }
        if (type == WORK_FINISHED) {
            for (IWorkerStatus hl : INotifier.workerStatusSubscribers) hl.onFinished((JobsFactory) param);
        }
        if (type == PROFILE_UPDATED) {
            for (IUpdateProfile hl : INotifier.updateProfileSubscribers)
                hl.onProfileUpdated((ProfileModel) param);
        }
        if (type == CREATE_PROFILE) {
            for (ICreateProfile hl : INotifier.createProfileSubscribers) {
                hl.onProfileCreate((ProfileModel) param);
            }
        }
    }

    enum Type {
        PROFILE_UPDATED,
        LOG_UPDATED,
        CREATE_PROFILE,
        WORK_FINISHED,
    }
}
