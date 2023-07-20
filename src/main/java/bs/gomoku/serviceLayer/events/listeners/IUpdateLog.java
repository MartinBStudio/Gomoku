package bs.gomoku.serviceLayer.events.listeners;

public interface IUpdateLog extends ISubscriber {
    void onLogUpdate(String content);
}
