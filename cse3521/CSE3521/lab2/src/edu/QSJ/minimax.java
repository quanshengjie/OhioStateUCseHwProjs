/*
 *Zilong Xu
 *
 */
package edu.QSJ;
import java.util.ArrayList;

public final class minimax {
	
	public final static char player1mark = 'x';
	public final static char player2mark = 'o';
    public static ArrayList<Integer> utility = new ArrayList<Integer>();
    public static class Node {
        char[] state;
        Node child;
        int step;

        public Node() {
            this.state = new char[9];
            this.child = null;
            this.step = 0;
        }
    }
    
   
    public static int MINIMAX_DECISION(char[] board) {
        int actionPostion = 0;
        return actionPostion;
    }
 
    public static int MAX_VALUE(Node node, int alpha, int beta) {
        int value = 0;
        if (GoalTest(node.state)) {
            value = utility(node.state);
        } else {
            value = Integer.MIN_VALUE;

            // for each a in ACTIONS(state)
            int[] action = ACTION(node.state);
            Node minChild = null;
            boolean flag = true;
            for (int k = 0; k < action.length; k++) {
                if (action[k] < 0) {
                    flag = false;
                    break;
                }
            }

            for (int k = 0; k < action.length; k++) {
                if (action[k] >= 0) {
                    Node nextChild = new Node();
                    nextChild.state = result(node.state, action[k], 'x');
                    int nextValue = MIN_VALUE(nextChild, alpha, beta);

                    if (flag) {
                        utility.add(nextValue);
                    }

                    if (nextValue > value) {
                        value = nextValue;
                        minChild = nextChild;
                    }
                    if (value >= beta) {
                        break;
                    }
                    if (value > alpha) {
                        alpha = value;
                    }
                }
            }
            node.child = minChild;
            node.step++;
        }
        return value;
    }

    public static int MIN_VALUE(Node node, int alpha, int beta) {
        int value = 0;
        if (GoalTest(node.state)) {
            value = utility(node.state);
        } else {
            value = Integer.MAX_VALUE;

            // for each a in ACTIONS(state)
            int[] action = ACTION(node.state);
            Node minChild = null;
            for (int k = 0; k < action.length; k++) {
                if (action[k] >= 0) {
                    Node nextChild = new Node();
                    nextChild.state = result(node.state, action[k], 'o');
                    int nextValue = MAX_VALUE(nextChild, alpha, beta);
                    if (nextValue < value) {
                        value = nextValue;
                        minChild = nextChild;
                    }
                    if (value <= alpha) {
                        break;
                    }
                    if (value < beta) {
                        beta = value;
                    }
                }
            }
            node.child = minChild;
            node.step++;
        }
        return value;
    }

    public static int[] ACTION(char[] state) {
        int[] possibleSpace = new int[9];
        for (int i = 0; i < 9; i++) {
            possibleSpace[i] = -1;
        }
        int count = 0;
        for (int i = 0; i < 9; i++) {
            if (state[i] == '.') {
                possibleSpace[count] = i;
                count++;
            }
        }
        return possibleSpace;
    }

   
    /* Generate new result with action in position */
    public static char[] result(char[] state, int position, char player) {
        char[] newState = new char[9];
        for (int i = 0; i < 9; i++) {
            newState[i] = state[i];
        }
        newState[position] = player;
        return newState;
    }
    
    public static boolean WinCheck(char[] state, char mark){
    	boolean win = false;
    	if ((state[0] == mark && state[1] == mark && state[2] == mark)
            || (state[0] == mark && state[3] == mark && state[6] == mark)
            || (state[0] == mark && state[4] == mark && state[8] == mark)
            || (state[1] == mark && state[4] == mark && state[7] == mark)
            || (state[2] == mark && state[5] == mark && state[8] == mark)
            || (state[2] == mark && state[4] == mark && state[6] == mark)
            || (state[3] == mark && state[4] == mark && state[5] == mark)
            || (state[6] == mark && state[7] == mark && state[8] == mark)) {
            win = true;
        }
    	return win;
    }   
    
    
    /*
     * Goal state: All squared are filled or one of the player has filled in one
     * of three horizontal rows, three vertical columns, or two diagonals.
     */
    public static boolean GoalTest(char[] state) {
        boolean result = false;        
        boolean full  = true;
        boolean player1win = false;
        boolean player2win = false;
        for(int i = 0; i < 9; i ++){
        	if(state[i] == '.'){full = false;}
        }
        player1win = WinCheck(state, player1mark);
        player2win = WinCheck(state, player2mark);   
        
        if(full || player1win || player2win){
        	result = true;
        }
        return result;
    }

    /*
     * Utility value: 10--Max win 0--Draw -10--Max lose
     */
    public static int utility(char[] state) {
        int value = 0;
        boolean player1win = WinCheck(state, player1mark);
        boolean player2win = WinCheck(state, player2mark);         
        // Max win
        if (player1win) {
            value = 10;
        }
        // Min win
        if (player2win) {
            value = -10;
        }
        return value;
    }

    
    /* Print the board in 3*3 board. */
    public static void printBoard(char[] board) {
        for (int i = 1; i <= 9; i++) {
            System.out.print(board[i - 1]);
            System.out.print(" ");
            if (i % 3 == 0) {
                System.out.println();
            }
        }
    }

    
    public static void main(String[] args) {
        char[] board = { '.', '.', '.', '.', '.', '.', '.', '.', '.' };
        Node initialBoard = new Node();
        initialBoard.state = board;
        initialBoard.step = 0;

        
        MAX_VALUE(initialBoard, Integer.MIN_VALUE, Integer.MAX_VALUE);

        
        System.out.println(" ------ minimax values for X's first move ------");
        for (int i = 1; i <= utility.size(); i++) {
            System.out.print(utility.get(i - 1) + " ");
            if (i % 3 == 0) {
                System.out.println();
            }
        }
       
        System.out.println();

        Node solution = initialBoard;
        int count = 1;
        System.out.println("----------------- Optimal Play ----------------");
        while (solution.child != null) {
            System.out.println("Step " + count + " :");
            printBoard(solution.child.state);
            System.out.println();
            solution = solution.child;
            count++;
        }

    }
}

