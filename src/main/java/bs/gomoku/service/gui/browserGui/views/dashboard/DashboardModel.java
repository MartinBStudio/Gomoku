package bs.gomoku.service.gui.browserGui.views.dashboard;

import lombok.Data;

@Data
public class DashboardModel {

    public String name;
    public String value;

    public DashboardModel(String name, String value) {
        this.name = name;
        this.value = value;
    }

}
