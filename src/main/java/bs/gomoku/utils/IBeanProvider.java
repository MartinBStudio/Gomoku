package bs.gomoku.utils;

import java.util.Optional;

public interface IBeanProvider {
    default <T> T getBean(Class<T> beanClass) {
        return Optional.ofNullable(SAC.getContext())
                .map(ctx -> SAC.getBean(beanClass))
                .orElseThrow(() -> new IllegalStateException("Application context is not initialized."));
    }
}
