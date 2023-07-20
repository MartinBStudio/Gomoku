package bs.gomoku.serviceLayer.events.listeners;

import bs.gomoku.serviceLayer.profile.ProfileModel;

@FunctionalInterface
public interface ICreateProfile extends ISubscriber {
    void onProfileCreate(ProfileModel userMail);
}
