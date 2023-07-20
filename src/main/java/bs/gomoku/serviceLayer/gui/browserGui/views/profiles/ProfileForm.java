package bs.gomoku.serviceLayer.gui.browserGui.views.profiles;

import bs.gomoku.serviceLayer.profile.ProfileModel;
import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.data.binder.BeanValidationBinder;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.shared.Registration;
import lombok.Getter;

public class ProfileForm extends FormLayout {
    EmailField userMail = new EmailField("Email");
    Binder<ProfileModel> binder = new BeanValidationBinder<>(ProfileModel.class);
    Checkbox checkBox = new Checkbox("Auto restart");
    Button start = new Button("Start");
    Button save = new Button("Save");
    Button stop = new Button("Stop");
    Button close = new Button("Cancel");
    private ProfileModel contact;

    public ProfileForm() {
        addClassName("contact-form");
        binder.bindInstanceFields(this);

        add(userMail, start, stop, checkBox,
                createButtonsLayout());
    }

    private HorizontalLayout createButtonsLayout() {
        save.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        close.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        start.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        stop.addThemeVariants(ButtonVariant.LUMO_PRIMARY);


        start.addClickShortcut(Key.ENTER);
        close.addClickShortcut(Key.ESCAPE);

        start.addClickListener(event -> startJob());
        stop.addClickListener(event -> stopJob());
        save.addClickListener(event -> saveNewContact());
        close.addClickListener(event -> fireEvent(new CloseEvent(this)));


        return new HorizontalLayout(start, stop, checkBox, save, close);
    }

    private void startJob() {
        fireEvent(new StartEvent(this, ProfileModel.builder().userMail(userMail.getValue()).build(), checkBox.getValue()));
    }

    private void stopJob() {
        fireEvent(new StopEvent(this, ProfileModel.builder().userMail(userMail.getValue()).build()));
    }

    private void saveNewContact() {
        fireEvent(new SaveEvent(this, ProfileModel.builder().userMail(userMail.getValue()).build()));
    }


    public void setContact(ProfileModel contact) {
        this.contact = contact;
        binder.readBean(contact);
    }


    public <T extends ComponentEvent<?>> Registration addListener(Class<T> eventType,
                                                                  ComponentEventListener<T> listener) {
        return getEventBus().addListener(eventType, listener);
    }

    public static abstract class ContactFormEvent extends ComponentEvent<ProfileForm> {
        @Getter
        private final ProfileModel profile;
        @Getter
        private Boolean doRestart;

        protected ContactFormEvent(ProfileForm source, ProfileModel contact) {
            super(source, false);
            this.profile = contact;
        }

        protected ContactFormEvent(ProfileForm source, ProfileModel contact, Boolean doRestart) {
            super(source, false);
            this.profile = contact;
            this.doRestart = doRestart;
        }
    }

    public static class StartEvent extends ContactFormEvent {
        StartEvent(ProfileForm source, ProfileModel contact, Boolean doRestart) {
            super(source, contact, doRestart);
        }
    }

    public static class SaveEvent extends ContactFormEvent {
        SaveEvent(ProfileForm source, ProfileModel contact) {
            super(source, contact);
        }
    }

    public static class StopEvent extends ContactFormEvent {
        StopEvent(ProfileForm source, ProfileModel contact) {
            super(source, contact);
        }
    }

    public static class CloseEvent extends ContactFormEvent {
        CloseEvent(ProfileForm source) {
            super(source, null);
        }
    }
}