package bs.gomoku;

import bs.gomoku.service.gui.DeveloperGuiService;
import bs.gomoku.service.logger.LoggerService;
import bs.gomoku.utils.Utils;
import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.component.page.Push;
import com.vaadin.flow.server.PWA;
import com.vaadin.flow.theme.Theme;
import groovy.util.logging.Slf4j;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;


@EnableTransactionManagement
@EnableJpaRepositories
@EntityScan
@SpringBootApplication
@RestController
@NpmPackage(value = "lumo-css-framework", version = "^4.0.10")
@Theme("gomoku")
@Push
@Slf4j
@RequiredArgsConstructor
@PWA(name = "Gomoku", shortName = "GOM", offlinePath = "offline.html", offlineResources = {"./images/offline.png"})
public class Gomoku extends SpringBootServletInitializer implements CommandLineRunner, AppShellConfigurator {

    @Getter
    private static final Boolean isDebugMode = false;
    @Getter
    private static final Boolean hideDeveloperGui = true;
    @Getter
    private static LocalDateTime startDateTime;

    private final DeveloperGuiService guiService;
    private final LoggerService loggerService;
    private final Environment environment;


    public static void main(String[] args) {
        Utils.setSystemProperties();
        startDateTime = LocalDateTime.now();
        SpringApplication.run(Gomoku.class, args);
    }

    @Override
    public void run(String... args) {
        if (!hideDeveloperGui) {
            guiService.start();
        }
        loggerService.info(List.of("Application started on port", environment.getProperty("local.server.port")));
    }
}
