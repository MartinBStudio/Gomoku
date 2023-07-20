package bs.gomoku.serviceLayer.ai;

import lombok.Getter;

import java.util.ArrayList;

public class BoardComponent {
    @Getter
    private final int[][] boardMatrix; // 0: Empty 1: White 2: Black
    @Getter
    private int boardSize = 40;

    protected BoardComponent(int boardSize) {
        boardMatrix = new int[boardSize][boardSize];
        this.boardSize = boardSize;
    }

    protected BoardComponent(BoardComponent boardComponent) {
        int[][] matrixToCopy = boardComponent.getBoardMatrix();
        boardMatrix = new int[matrixToCopy.length][matrixToCopy.length];
        for (int i = 0; i < matrixToCopy.length; i++) {
            System.arraycopy(matrixToCopy[i], 0, boardMatrix[i], 0, matrixToCopy.length);
        }
    }

    protected void addStoneNoGUI(int posX, int posY, boolean black) {
        boardMatrix[posY][posX] = black ? 2 : 1;
    }

    protected boolean addStone(int posX, int posY, boolean black) {
        if (boardMatrix[posY][posX] != 0) return false;
        boardMatrix[posY][posX] = black ? 2 : 1;
        return true;
    }

    protected ArrayList<int[]> generateMoves() {
        ArrayList<int[]> moveList = new ArrayList<int[]>();

        int boardSize = boardMatrix.length;

        // Look for cells that has at least one stone in an adjacent cell.
        for (int i = 0; i < boardSize; i++) {
            for (int j = 0; j < boardSize; j++) {

                if (boardMatrix[i][j] > 0) continue;

                if (i > 0) {
                    if (j > 0) {
                        if (boardMatrix[i - 1][j - 1] > 0 || boardMatrix[i][j - 1] > 0) {
                            int[] move = {i, j};
                            moveList.add(move);
                            continue;
                        }
                    }
                    if (j < boardSize - 1) {
                        if (boardMatrix[i - 1][j + 1] > 0 || boardMatrix[i][j + 1] > 0) {
                            int[] move = {i, j};
                            moveList.add(move);
                            continue;
                        }
                    }
                    if (boardMatrix[i - 1][j] > 0) {
                        int[] move = {i, j};
                        moveList.add(move);
                        continue;
                    }
                }
                if (i < boardSize - 1) {
                    if (j > 0) {
                        if (boardMatrix[i + 1][j - 1] > 0 || boardMatrix[i][j - 1] > 0) {
                            int[] move = {i, j};
                            moveList.add(move);
                            continue;
                        }
                    }
                    if (j < boardSize - 1) {
                        if (boardMatrix[i + 1][j + 1] > 0 || boardMatrix[i][j + 1] > 0) {
                            int[] move = {i, j};
                            moveList.add(move);
                            continue;
                        }
                    }
                    if (boardMatrix[i + 1][j] > 0) {
                        int[] move = {i, j};
                        moveList.add(move);
                        continue;
                    }
                }
            }
        }

        return moveList;
    }
}
