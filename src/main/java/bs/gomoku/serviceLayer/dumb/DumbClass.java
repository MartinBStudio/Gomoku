package bs.gomoku.serviceLayer.dumb;

import bs.gomoku.serviceLayer.api.ApiService;
import bs.gomoku.utils.SAC;

public class DumbClass {

    private ApiService apiService = SAC.getBean(ApiService.class);


    public void test(){};
}
