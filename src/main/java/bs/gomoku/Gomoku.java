package bs.gomoku;

import bs.gomoku.serviceLayer.gui.DeveloperGuiService;
import bs.gomoku.utils.Utils;
import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.component.page.Push;
import com.vaadin.flow.server.PWA;
import com.vaadin.flow.theme.Theme;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@EnableTransactionManagement
@EnableJpaRepositories
@EntityScan
@SpringBootApplication
@RestController
@NpmPackage(value = "lumo-css-framework", version = "^4.0.10")
@Theme("gomoku")
@Push
@PWA(name = "Gomoku", shortName = "GOM", offlinePath = "offline.html", offlineResources = {"./images/offline.png"})
public class Gomoku extends SpringBootServletInitializer implements CommandLineRunner, AppShellConfigurator {

	@Getter
	private static final Boolean isDebugMode = false;
	@Getter
	private static final Boolean hideDeveloperGui = false;
	@Getter
	private static LocalDateTime startDateTime;

	private static DeveloperGuiService guiService;
	//   private static LoggerService loggerService;


	public static void main(String[] args) {
		Utils.setSystemProperties();
		startDateTime = LocalDateTime.now();
		SpringApplication.run(Gomoku.class, args);
		//  loggerService.info(List.of("Application started on port", SAC.getBean(Environment.class).getProperty("local.server.port")));
	}


	@Autowired
	public void autowire(DeveloperGuiService guiService) {
		Gomoku.guiService = guiService;
		// Gomoku.loggerService = loggerService;
	}

	@Override
	public void run(String... args) {
		if (!hideDeveloperGui) {
			guiService.start();
		}
	}
}
