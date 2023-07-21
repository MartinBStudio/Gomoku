package bs.gomoku.service.gui.browserGui.views.log;

import bs.gomoku.service.events.listeners.IUpdateLog;
import bs.gomoku.service.gui.browserGui.views.BaseView;
import bs.gomoku.service.gui.browserGui.views.MainLayout;
import bs.gomoku.service.logger.LogMessageModel;
import bs.gomoku.service.logger.LoggerService;
import com.vaadin.flow.component.AttachEvent;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import static bs.gomoku.service.gui.browserGui.Constants.PAGE_TITLE_LOG;


@Component
@Scope("prototype")
@Route(value = "log", layout = MainLayout.class)
@PageTitle("Log | Gomoku")
@PermitAll
public class LogListView extends BaseView implements IUpdateLog {
    Grid<LogMessageModel> grid = new Grid<>(LogMessageModel.class);
    TextField filterText = new TextField();
    Button refreshButton = new Button();
    UI ui;
    LoggerService loggerService;

    @Autowired
    public LogListView(LoggerService loggerService) {
        super(loggerService);
        this.loggerService = loggerService;
        addSubscriber();
        addClassName(PAGE_TITLE_LOG);
        addHeader(PAGE_TITLE_LOG);
        addGrid();
        update();
    }

    @Override
    protected void onAttach(AttachEvent attachEvent) {
        this.ui = attachEvent.getUI();
    }

    private void addGrid() {
        grid.addClassNames("contact-grid");
        grid.setSizeFull();
        grid.setColumns("lineNumber", "timestamp", "message");
        grid.getColumns().forEach(col -> col.setAutoWidth(true));

        FlexLayout content = new FlexLayout(grid);
        content.setFlexGrow(2, grid);
        content.addClassName("content");
        content.setSizeFull();
        add(getToolbar(), content);
    }

    private HorizontalLayout getToolbar() {
        filterText.setPlaceholder("Filter by text...");
        filterText.setClearButtonVisible(true);
        filterText.setValueChangeMode(ValueChangeMode.LAZY);
        filterText.addValueChangeListener(e -> update());

        refreshButton = new Button("Refresh");
        refreshButton.addClickListener(click -> update());

        HorizontalLayout toolbar = new HorizontalLayout(filterText, refreshButton);
        toolbar.addClassName("toolbar");
        return toolbar;
    }

    private void update() {
        grid.setItems(loggerService.getFilteredMessages(filterText.getValue().toLowerCase()));
    }

    @Override
    public void onLogUpdate(String content) {
        //    updateList();
        //   ui.push();
    }
}
