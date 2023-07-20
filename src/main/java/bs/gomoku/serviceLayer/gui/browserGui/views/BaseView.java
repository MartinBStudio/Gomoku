package bs.gomoku.serviceLayer.gui.browserGui.views;

import bs.gomoku.serviceLayer.logger.LogMessageModel;
import bs.gomoku.serviceLayer.logger.LoggerService;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

import java.util.List;
import java.util.stream.Collectors;

public class BaseView extends VerticalLayout {
    protected LoggerService loggerService;
    protected HorizontalLayout logBar = new HorizontalLayout();
    protected H2 header = new H2();

    public BaseView(LoggerService loggerService) {
        this.loggerService = loggerService;
        setSizeFull();
    }

    protected void addHeader(String pageTitle) {
        header.setText(pageTitle);
        add(header);
    }

    protected void addLogBar() {
        Text logHeader = new Text("");
        Text timestamp = new Text("");
        Text message = new Text("");
        Text separator = new Text("");
        logBar.add(logHeader, timestamp, separator, message);
        logBar.setPadding(true);
        add(logBar);
    }

    protected void updateLogBar() {
        LogMessageModel lastLogMessage = loggerService.getLastLoggedMessage();
        List<Component> list = logBar.getChildren().collect(Collectors.toList());
        if (list.size() > 0) {
            Text header = (Text) list.get(0);
            header.setText("Last log message: ");
            Text timestamp = (Text) list.get(1);
            timestamp.setText(lastLogMessage.getTimestamp());
            Text separator = (Text) list.get(2);
            separator.setText(" | ");
            Text message = (Text) list.get(3);
            message.setText(lastLogMessage.getMessage());
        }
    }
}
