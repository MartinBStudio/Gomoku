package bs.gomoku.service.events.listeners;

import bs.gomoku.service.profile.ProfileModel;

@FunctionalInterface
public interface ICreateProfile extends ISubscriber {
    void onProfileCreate(ProfileModel userMail);
}
