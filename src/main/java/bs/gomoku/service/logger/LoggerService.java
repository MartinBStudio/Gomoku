package bs.gomoku.service.logger;


import bs.gomoku.service.events.INotifier;
import bs.gomoku.service.events.listeners.IUpdateLog;
import bs.gomoku.utils.Utils;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

import static bs.gomoku.service.events.INotifier.Type.LOG_UPDATED;

@Service
public class LoggerService implements IUpdateLog, INotifier {

    private static int lineCounter = 0;

    @Getter
    private final LinkedList<String> loggedMessages = new LinkedList<>();
    @Getter
    private final LinkedList<LogMessageModel> loggedMessagesList = new LinkedList<>();

    @Autowired
    public LoggerService() {
        addSubscriber();
    }

    public void info(List<Object> messages) {
        String logMessage = "";
        StringBuilder allmessages = new StringBuilder();
        for (Object o : messages) {
            allmessages.append(logMessage.concat(o.toString() + " | "));
        }
        loggedMessagesList.add(LogMessageModel.builder().lineNumber(lineCounter).timestamp(Utils.getTimestamp()).message(allmessages.toString()).build());
        notify(LOG_UPDATED, ("[" + lineCounter++ + "] " + Utils.getTimestamp() + " | " + allmessages));
    }

    public void info(Object message) {
        loggedMessagesList.add(LogMessageModel.builder().lineNumber(lineCounter).timestamp(Utils.getTimestamp()).message(message.toString()).build());
        notify(LOG_UPDATED, ("[" + lineCounter++ + "] " + Utils.getTimestamp() + " | " + message));
    }

    @Override
    public void onLogUpdate(String content) {
        if (loggedMessages.size() > 1000) {
            loggedMessages.clear();
            notify(LOG_UPDATED, "Logged messages cleared.");
        }
        loggedMessages.add(content);
        org.testng.log4testng.Logger.getLogger(this.getClass()).info("LOGGER: " + content);
    }

    public List<LogMessageModel> getFilteredMessages(String textFilter) {
        LinkedList<LogMessageModel> reversedList;
        if (textFilter.isEmpty() || textFilter == null) {
            reversedList = loggedMessagesList;
        } else {
            LinkedList<LogMessageModel> filteredMessages = new LinkedList<>();
            for (LogMessageModel unfilteredMessage : loggedMessagesList) {
                if (unfilteredMessage.getMessage().toLowerCase().contains(textFilter) || unfilteredMessage.getTimestamp().toLowerCase().contains(textFilter)) {
                    filteredMessages.add(unfilteredMessage);
                }
            }
            reversedList = filteredMessages;
        }
        return Utils.reverseOrderInLinkedList(reversedList);
    }

    public LogMessageModel getLastLoggedMessage() {
        return loggedMessagesList.getLast();
    }
}
