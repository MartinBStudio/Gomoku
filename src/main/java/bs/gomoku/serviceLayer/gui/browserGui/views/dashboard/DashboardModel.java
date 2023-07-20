package bs.gomoku.serviceLayer.gui.browserGui.views.dashboard;

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
