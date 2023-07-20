package bs.gomoku.serviceLayer.gui.browserGui.views.dashboard;

import bs.gomoku.serviceLayer.gui.browserGui.views.BaseView;
import bs.gomoku.serviceLayer.gui.browserGui.views.MainLayout;
import bs.gomoku.serviceLayer.jobs.JobsFactory;
import bs.gomoku.serviceLayer.jobs.JobsService;
import bs.gomoku.serviceLayer.logger.LoggerService;
import bs.gomoku.utils.Utils;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static bs.gomoku.serviceLayer.gui.browserGui.Constants.PAGE_TITLE_DASHBOARD;

@Service
@Scope("prototype")
@Route(value = "", layout = MainLayout.class)
@PageTitle("Dashboard | Gomoku")
@PermitAll
public class DashboardView extends BaseView {
    Button refreshButton = new Button("Refresh");
    Button stopAllButton = new Button("Stop all");

    Grid<DashboardModel> dashboardModelGrid = new Grid<>(DashboardModel.class);
    JobsService jobsService;

    @Autowired
    public DashboardView(LoggerService loggerService, JobsService jobsService) {
        super(loggerService);
        this.jobsService = jobsService;
        addClassName(PAGE_TITLE_DASHBOARD);
        addHeader(PAGE_TITLE_DASHBOARD);
        addDashboard();
        addLogBar();
        update();
    }

    private void addDashboard() {
        dashboardModelGrid.addClassNames("contact-grid");
        dashboardModelGrid.setSizeFull();
        dashboardModelGrid.getColumns().forEach(col -> col.setAutoWidth(true));
        HorizontalLayout toolbar = new HorizontalLayout(stopAllButton, refreshButton);
        add(toolbar);
        add(dashboardModelGrid);
        stopAllButton.addClickListener(click -> stopAll());
        refreshButton.addClickListener(click -> update());
    }

    //Actions
    private void stopAll() {
        jobsService.stopAllRunningJobs();
        update();
    }

    private void update() {
        dashboardModelGrid.setItems(getDashBoardValues());
        stopAllButton.setEnabled(!jobsService.isApplicationIdle());
        updateLogBar();
    }

    private List<DashboardModel> getDashBoardValues() {
        List<DashboardModel> propertieslist = new ArrayList<>();
        List<JobsFactory> runningJobs = jobsService.getRunningJobs();
        Boolean isApplicationIdle = jobsService.isApplicationIdle();
        propertieslist.add(new DashboardModel("Application status", isApplicationIdle ? "idle" : "running"));
        propertieslist.add(new DashboardModel("Number of running jobs", isApplicationIdle ? "0" : String.valueOf(runningJobs.size())));
        if (!isApplicationIdle) {
            final StringBuilder builder = new StringBuilder();
            runningJobs.forEach(val ->
                    builder.append(runningJobs.size() > 1 && runningJobs.indexOf(val) != runningJobs.size() - 1 ? val.getJobId() + ", " : val.getJobId()));
            propertieslist.add(new DashboardModel("Working profiles", builder.toString()));
        }
        propertieslist.add(new DashboardModel("Uptime", Utils.getAplicationRuntimeInStringFormat()));
        propertieslist.add(new DashboardModel("Jobs - Leaderboard", "https://piskvorky.jobs.cz/probihajici-hry"));
        propertieslist.add(new DashboardModel("Jobs - Running games", "https://piskvorky.jobs.cz/prehled-hracu"));
        return propertieslist;
    }

}
