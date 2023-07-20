package bs.gomoku.serviceLayer.gui;

import bs.gomoku.Gomoku;
import bs.gomoku.serviceLayer.events.listeners.IUpdateLog;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.awt.*;
import java.util.ArrayList;
import java.util.List;

import static bs.gomoku.serviceLayer.gui.DeveloperGuiService.MainWindow.LogPanel.logPanel;
import static bs.gomoku.serviceLayer.gui.DeveloperGuiService.MainWindow.LogPanel.logRecords;

@Service
public class DeveloperGuiService implements IUpdateLog {
    public void start() {
        addSubscriber();
        MainWindow.init();
    }

    @Override
    public void onLogUpdate(String content) {
        JLabel newLabel = new JLabel(content);
        logRecords.add(newLabel);
        if (!Gomoku.getHideDeveloperGui()) {
            logPanel.add(newLabel, 0);
            logPanel.revalidate();
            logPanel.repaint();
        }
    }

    static class MainWindow {
        static void init() {
            JPanel mainPanel = new JPanel();
            JFrame mainFrame = new JFrame("Gomoku AI - Developer log");
            mainFrame.setVisible(true);
            mainFrame.setSize(550, 550);
            mainFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            mainFrame.add(mainPanel);
            mainFrame.setLocationRelativeTo(null);
            mainPanel.setLayout(new GridLayout(0, 1));
            mainPanel.setSize(new Dimension(mainFrame.getWidth(), mainFrame.getHeight()));
            mainPanel.add(new LogPanel().init());
            mainPanel.repaint();
            mainPanel.revalidate();
        }
        static class LogPanel {
            static JPanel logPanel;
            static List<JLabel> logRecords = new ArrayList<>();
            static JScrollPane scrollPanel;

            protected JScrollPane init() {
                logPanel = new JPanel();
                scrollPanel = new JScrollPane(logPanel);
                logPanel.setLayout(new BoxLayout(logPanel, BoxLayout.Y_AXIS));
                return scrollPanel;
            }
        }
    }
}
