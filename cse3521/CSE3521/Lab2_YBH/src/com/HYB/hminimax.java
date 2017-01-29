package com.HYB;

public class hminimax {

    public static void gamePrinter(gameState state){
        for(int i=0;i<3;i++){
            for(int j=0;j<3;j++){
                System.out.print(state.getStateSeq()[i*3+j]);
                if(j!=2)
                    System.out.print(' ');
            }
            System.out.println();
        }
        System.out.println("-----");
    }
    public static void printInitialStateV(gameState state){
        if(state.getPlayer()=='X') {
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    int value = hMin(state.newState(i * 3 + j), 4, 1);
                    System.out.print(value);
                    if (j != 2)
                        System.out.print(' ');
                }
                System.out.println();
            }
        }
        if(state.getPlayer()=='O'){

        }
        System.out.println("-----");
    }

    public static int hMin(gameState state,int cutOff,int depth){
        if(state.terminalTest())
            return state.utility();
        if(cutOff==depth)
            return state.eval();
        int minV=Integer.MAX_VALUE;
        for(int i=0;i<9;i++){
            if(state.getStateSeq()[i]=='.'){
                minV=Math.min(minV,hMax(state.newState(i),cutOff,depth+1));
            }
        }
        return minV;
    }
    public static int hMax(gameState state,int cutOff,int depth){
        if(state.terminalTest())
            return state.utility();
        if(cutOff==depth)
            return state.eval();
        int maxV=Integer.MIN_VALUE;
        for(int i=0;i<9;i++){
            if(state.getStateSeq()[i]=='.'){
                maxV=Math.max(maxV,hMin(state.newState(i),cutOff,depth+1));
            }
        }
        return maxV;
    }
    /* Compare which action is the optimal in current state*/
    public static int h_minimax(gameState state){
        int action=-1;
        if(state.getPlayer()=='X'){
            int maxV=Integer.MIN_VALUE;
            for(int i=0;i<9;i++){
                if(state.getStateSeq()[i]=='.'){
                    int value=hMin(state.newState(i),4,1);
                    if(value>maxV){
                        action=i;
                        maxV=value;
                    }
                }
            }
        }else if(state.getPlayer()=='O'){
            int minV=Integer.MAX_VALUE;
            for(int i=0;i<9;i++){
                if(state.getStateSeq()[i]=='.'){
                    int value=hMax(state.newState(i),4,1);
                    if(value<minV){
                        action=i;
                        minV=value;
                    }
                }
            }
        }
        return action;
    }
    public static void main(String[] args) {
        gameState game=new gameState(new char[]{'.','.','.','.','.','.','.','.','.'},'X');

        System.out.println("---------------Initial State H_Minimax Value-----------");
        printInitialStateV(game);
        System.out.println("---------------Below is optimal solution----------");
        while(!game.terminalTest()){
            int action=h_minimax(game);
            game=game.newState(action);
            game=new gameState(game.getStateSeq(),game.getPlayer());
            gamePrinter(game);
            //System.out.print(game.getPlayer());
        }

    }
}
