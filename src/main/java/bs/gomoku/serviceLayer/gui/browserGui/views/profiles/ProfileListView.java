package bs.gomoku.serviceLayer.gui.browserGui.views.profiles;

import bs.gomoku.serviceLayer.gui.browserGui.views.BaseView;
import bs.gomoku.serviceLayer.gui.browserGui.views.MainLayout;
import bs.gomoku.serviceLayer.jobs.JobsService;
import bs.gomoku.serviceLayer.logger.LoggerService;
import bs.gomoku.serviceLayer.profile.ProfileModel;
import bs.gomoku.serviceLayer.profile.ProfileService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.PermitAll;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;


import static bs.gomoku.serviceLayer.gui.browserGui.Constants.PAGE_TITLE_PROFILES;


@Service
@Scope("prototype")
@Route(value = "profiles", layout = MainLayout.class)
@PageTitle("Profiles | Gomoku")
@PermitAll
@Slf4j
public class ProfileListView extends BaseView {
    Grid<ProfileModel> grid = new Grid<>(ProfileModel.class);
    TextField filterText = new TextField();
    ProfileForm form;
    ProfileService profileService;
    JobsService jobsService;
    LoggerService loggerService;


    @Autowired
    public ProfileListView(ProfileService profileService, JobsService jobsService, LoggerService loggerService) {
        super(loggerService);
        this.jobsService = jobsService;
        this.profileService = profileService;
        this.loggerService = loggerService;
        addClassName(PAGE_TITLE_PROFILES);
        addHeader(PAGE_TITLE_PROFILES);
        addGrid();
        addLogBar();
        update();
    }

    private void addGrid() {
        grid.addClassNames("contact-grid");
        grid.setSizeFull();
        grid.setColumns("userMail", "won", "lost", "abandoned", "winrate", "inprogress");
        grid.getColumns().forEach(col -> col.setAutoWidth(true));
        addForm();
        FlexLayout content = new FlexLayout(grid, form);
        content.setFlexGrow(2, grid);
        content.setFlexGrow(1, form);
        content.setFlexShrink(1, form);
        content.addClassNames("content", "gap-m");
        content.setSizeFull();
        add(getToolbar(), content);
        grid.asSingleSelect().addValueChangeListener(event ->
                selectProfile(event.getValue()));
        closeEditor();
    }

    private void addForm() {
        form = new ProfileForm();
        form.setWidth("25em");
        form.setHeight("25em");
        form.addListener(ProfileForm.StartEvent.class, this::startJob);
        form.addListener(ProfileForm.StopEvent.class, this::stopJob);
        form.addListener(ProfileForm.SaveEvent.class, this::saveProfile);
        form.addListener(ProfileForm.CloseEvent.class, e -> closeEditor());
    }

    private HorizontalLayout getToolbar() {
        filterText.setPlaceholder("Filter by email...");
        filterText.setClearButtonVisible(true);
        filterText.setValueChangeMode(ValueChangeMode.LAZY);
        filterText.addValueChangeListener(e -> update());

        Button addContactButton = new Button("Add profile");
        Button refresh = new Button("Refresh");
        addContactButton.addClickListener(click -> addProfile());
        refresh.addClickListener(click -> update());
        HorizontalLayout toolbar = new HorizontalLayout(filterText, addContactButton, refresh);
        toolbar.addClassName("toolbar");
        return toolbar;
    }

    private void startJob(ProfileForm.StartEvent event) {
        jobsService.startAutorunJob(event.getProfile().getUserMail(), event.getDoRestart());
        update();
        closeEditor();
    }

    private void saveProfile(ProfileForm.SaveEvent event) {
        profileService.createNewProfile("Vaadin", event.getProfile().getUserMail());
        update();
        closeEditor();
    }

    private void stopJob(ProfileForm.StopEvent event) {
        jobsService.stopAutorunJob(event.getProfile().getUserMail());
        update();
        closeEditor();
    }

    public void selectProfile(ProfileModel contact) {
        if (contact == null) {
            closeEditor();
        } else {
            if (jobsService.isProfileIdle(contact.getUserMail()) && profileService.isProfilePresent(contact.getUserMail())) {
                form.start.setEnabled(true);
                form.stop.setEnabled(false);
                form.checkBox.setEnabled(true);
            } else if (!profileService.isProfilePresent(contact.getUserMail())) {
                form.start.setEnabled(false);
                form.stop.setEnabled(false);
                form.checkBox.setEnabled(false);
            } else {
                form.start.setEnabled(false);
                form.stop.setEnabled(true);
                form.checkBox.setEnabled(false);
            }
            form.setContact(contact);
            form.setVisible(true);
            form.save.setEnabled(false);
            addClassName("editing");
        }

    }

    void addProfile() {
        grid.asSingleSelect().clear();
        form.setContact(ProfileModel.builder().build());
        form.setVisible(true);
        addClassName("editing");
        form.userMail.setReadOnly(false);
        form.start.setEnabled(false);
        form.stop.setEnabled(false);
        form.save.setEnabled(true);
    }

    private void closeEditor() {
        form.setContact(null);
        form.setVisible(false);
        removeClassName("editing");
        update();
    }

    private void update() {
        grid.setItems(profileService.getProfilesFromDb(filterText.getValue()));
        updateLogBar();
    }
}

