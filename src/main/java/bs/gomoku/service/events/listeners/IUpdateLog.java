package bs.gomoku.service.events.listeners;

public interface IUpdateLog extends ISubscriber {
    void onLogUpdate(String content);
}
