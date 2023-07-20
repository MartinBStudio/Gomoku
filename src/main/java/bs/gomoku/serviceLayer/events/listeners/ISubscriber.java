package bs.gomoku.serviceLayer.events.listeners;

import bs.gomoku.serviceLayer.events.INotifier;

public interface ISubscriber {
    default void addSubscriber() {
        INotifier.addSubscriber(this);
    }
}
