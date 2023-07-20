package bs.gomoku.service.events.listeners;

import bs.gomoku.service.events.INotifier;

public interface ISubscriber {
    default void addSubscriber() {
        INotifier.addSubscriber(this);
    }
}
