package unit;

import bs.gomoku.Gomoku;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.Before;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

@Slf4j
@SpringBootTest(classes = Gomoku.class)
class UnitTests extends AbstractTestNGSpringContextTests {

    @BeforeTest
    public void setUp() {
        System.setProperty("java.awt.headless", "false");
    }
    @Test
    void contextLoads() {
        log.info("Context loaded");
    }
}
