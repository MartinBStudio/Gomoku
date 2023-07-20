package bs.gomoku.service.logger;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class LogMessageModel {
    private int lineNumber;
    private String timestamp;
    private String message;
}
