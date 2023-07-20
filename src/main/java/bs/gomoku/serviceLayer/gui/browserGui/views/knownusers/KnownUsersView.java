package bs.gomoku.serviceLayer.gui.browserGui.views.knownusers;

import bs.gomoku.serviceLayer.gui.browserGui.views.BaseView;
import bs.gomoku.serviceLayer.gui.browserGui.views.MainLayout;
import bs.gomoku.serviceLayer.knownUsers.KnownUserEntity;
import bs.gomoku.serviceLayer.knownUsers.KnownUsersService;
import bs.gomoku.serviceLayer.logger.LoggerService;
import bs.gomoku.serviceLayer.profile.ProfileModel;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;



@Service
@Scope("prototype")
@Route(value = "known-users", layout = MainLayout.class)
@PageTitle("Known Users | Gomoku")
@PermitAll
public class KnownUsersView extends BaseView {
    Grid<KnownUserEntity> grid = new Grid<>(KnownUserEntity.class);
    KnownUserForm form;
    TextField filterText = new TextField();
    KnownUsersService knownUsersService;


    @Autowired
    public KnownUsersView(LoggerService loggerService, KnownUsersService knownUsersService) {
        super(loggerService);
        this.knownUsersService = knownUsersService;
        setSpacing(true);
        addClassName("home-view");
        setSizeFull();
        addLogBar();
        addHeader();
        addGrid();
        updateList();
    }

    private void addGrid() {
        configureGrid();
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


    private void addHeader() {
        HorizontalLayout header = new HorizontalLayout();
        header.add(new H2("Known users"));
        add(header);
    }

    private void addForm() {
        form = new KnownUserForm();
        form.setWidth("25em");
        form.setHeight("25em");
        form.addListener(KnownUserForm.DeleteEvent.class, this::deleteProfile);
        form.addListener(KnownUserForm.SaveEvent.class, this::saveProfile);
        form.addListener(KnownUserForm.CloseEvent.class, e -> closeEditor());
    }

    private void configureGrid() {
        grid.addClassNames("knownusers-grid");
        grid.setSizeFull();
        grid.setColumns("userName", "userId");
        grid.getColumns().forEach(col -> col.setAutoWidth(true));
    }


    private HorizontalLayout getToolbar() {
        filterText.setPlaceholder("Filter by username...");
        filterText.setClearButtonVisible(true);
        filterText.setValueChangeMode(ValueChangeMode.LAZY);
        filterText.addValueChangeListener(e -> updateList());

        Button addContactButton = new Button("Add profile");
        Button refresh = new Button("Add profile");
        addContactButton.addClickListener(click -> addProfile());
        refresh.addClickListener(click -> updateList());

        HorizontalLayout toolbar = new HorizontalLayout(filterText, addContactButton);
        toolbar.addClassName("toolbar");
        return toolbar;
    }

    private void saveProfile(KnownUserForm.SaveEvent event) {
        knownUsersService.saveNewKnownUser(event.getKnownUser());
        updateList();
        closeEditor();
    }


    private void deleteProfile(KnownUserForm.DeleteEvent event) {
        knownUsersService.deleteExistingKnownUser(ProfileModel.builder().userId(event.getKnownUser().userId).userName(event.getKnownUser().userName).build());
        updateList();
        closeEditor();
    }

    public void selectProfile(KnownUserEntity contact) {
        if (contact == null) {
            closeEditor();
        } else {
            form.setContact(contact);
            form.setVisible(true);
            form.userId.setReadOnly(true);
            form.userName.setReadOnly(true);
            form.save.setEnabled(false);
            form.delete.setEnabled(true);
            addClassName("editing");
        }

    }

    void addProfile() {
        grid.asSingleSelect().clear();
        form.setContact(form.getContact());
        form.setVisible(true);
        addClassName("editing");
        form.userName.setReadOnly(false);
        form.userId.setReadOnly(false);
        form.delete.setEnabled(false);
        form.save.setEnabled(true);
    }

    private void closeEditor() {
        form.setContact(null);
        form.setVisible(false);
        removeClassName("editing");
        addLogBar();
        updateList();
    }

    private void updateList() {
        updateLogBar();
        grid.setItems(knownUsersService.displayKnownUsers(filterText.getValue()));

    }
}

