package bs.gomoku.utils;

import lombok.Getter;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class SAC implements ApplicationContextAware {
@Getter
    private static ApplicationContext context;

  static <T extends Object> T getBean(Class<T> beanClass) {
        return context.getBean(beanClass);
    }

    @Override
    public void setApplicationContext(ApplicationContext context) {
        SAC.context = context;
    }
}
