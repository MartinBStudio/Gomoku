package bs.gomoku.service.gui.browserGui.views;

import bs.gomoku.service.gui.browserGui.security.SecurityService;
import bs.gomoku.service.gui.browserGui.views.dashboard.DashboardView;
import bs.gomoku.service.gui.browserGui.views.knownusers.KnownUsersView;
import bs.gomoku.service.gui.browserGui.views.log.LogListView;
import bs.gomoku.service.gui.browserGui.views.profiles.ProfileListView;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.RouterLink;

import static bs.gomoku.service.gui.browserGui.Constants.*;

public class MainLayout extends AppLayout {
    private final SecurityService securityService;
    VerticalLayout vL = new VerticalLayout();

    public MainLayout(SecurityService securityService) {
        this.securityService = securityService;
        createHeader();
        createDrawer();
        addToDrawer(vL);
    }

    private void createHeader() {
        H1 logo = new H1("Gomoku AI");
        logo.addClassNames("text-l", "m-m");

        Button logout = new Button("Log out", e -> securityService.logout());

        HorizontalLayout header = new HorizontalLayout(new DrawerToggle(), logo, logout);

        header.setDefaultVerticalComponentAlignment(FlexComponent.Alignment.CENTER);
        header.expand(logo);
        header.setWidth("100%");
        header.addClassNames("py-0", "px-m");

        addToNavbar(header, vL);

    }

    private void createDrawer() {
        addToDrawer(new VerticalLayout(
                new RouterLink(PAGE_TITLE_DASHBOARD, DashboardView.class),
                new RouterLink(PAGE_TITLE_PROFILES, ProfileListView.class),
                new RouterLink(PAGE_TITLE_KNOWN_USERS, KnownUsersView.class),
                new RouterLink(PAGE_TITLE_LOG, LogListView.class)
        ));
        setDrawerOpened(true);
    }

}
