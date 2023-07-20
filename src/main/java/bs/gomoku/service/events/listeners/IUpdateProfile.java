package bs.gomoku.service.events.listeners;

import bs.gomoku.service.profile.ProfileModel;

@FunctionalInterface
public interface IUpdateProfile extends ISubscriber {
    void onProfileUpdated(ProfileModel springUtils);
}
