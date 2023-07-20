package bs.gomoku.serviceLayer.events.listeners;

import bs.gomoku.serviceLayer.profile.ProfileModel;

@FunctionalInterface
public interface IUpdateProfile extends ISubscriber {
    void onProfileUpdated(ProfileModel springUtils);
}
