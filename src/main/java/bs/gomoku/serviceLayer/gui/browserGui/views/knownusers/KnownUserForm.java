package bs.gomoku.serviceLayer.gui.browserGui.views.knownusers;

import bs.gomoku.serviceLayer.knownUsers.KnownUserEntity;
import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.BeanValidationBinder;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.shared.Registration;
import lombok.Getter;

public class KnownUserForm extends FormLayout {
    TextField userName = new TextField("Username");
    TextField userId = new TextField("UserId");
    Binder<KnownUserEntity> binder = new BeanValidationBinder<>(KnownUserEntity.class);

    Button delete = new Button("Delete");
    Button save = new Button("Save");
    Button close = new Button("Cancel");
    @Getter
    private KnownUserEntity contact;

    public KnownUserForm() {
        addClassName("contact-form");
        binder.bindInstanceFields(this);

        add(userName, userId,
                createButtonsLayout());
    }

    private HorizontalLayout createButtonsLayout() {
        delete.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        save.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        close.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        close.addClickShortcut(Key.ESCAPE);
        delete.addClickListener(event -> fireEvent(new DeleteEvent(this, contact)));
        save.addClickListener(event -> saveNewContact());
        close.addClickListener(event -> fireEvent(new CloseEvent(this)));


        return new HorizontalLayout(save, delete, close);
    }

    public void setContact(KnownUserEntity contact) {
        this.contact = contact;
        binder.readBean(contact);
    }

    private void saveNewContact() {
        fireEvent(new SaveEvent(this, new KnownUserEntity(userName.getValue(), userId.getValue())));
    }


    public <T extends ComponentEvent<?>> Registration addListener(Class<T> eventType,
                                                                  ComponentEventListener<T> listener) {
        return getEventBus().addListener(eventType, listener);
    }

    public static abstract class ContactFormEvent extends ComponentEvent<KnownUserForm> {

        private final KnownUserEntity profile;

        protected ContactFormEvent(KnownUserForm source, KnownUserEntity contact) {
            super(source, false);
            this.profile = contact;
        }

        public KnownUserEntity getKnownUser() {
            return profile;
        }
    }

    public static class SaveEvent extends ContactFormEvent {
        SaveEvent(KnownUserForm source, KnownUserEntity contact) {
            super(source, contact);
        }
    }

    public static class DeleteEvent extends ContactFormEvent {
        DeleteEvent(KnownUserForm source, KnownUserEntity contact) {
            super(source, contact);
        }

    }

    public static class CloseEvent extends ContactFormEvent {
        CloseEvent(KnownUserForm source) {
            super(source, null);
        }
    }
}