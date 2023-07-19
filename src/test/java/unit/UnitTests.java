package unit;

import bs.gomoku.Gomoku;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.testng.annotations.Test;

@Slf4j
@SpringBootTest(classes = Gomoku.class)
class UnitTests extends AbstractTestNGSpringContextTests {

    @Test
    void contextLoads() {
        log.info("Context loaded");
    }
}
