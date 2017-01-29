package com.HYB;

import java.util.Arrays;

/**
 * Created by yubin on 2/28/16.
 */
public class gameState {

    private char[] state;
    private char player;
    private int[][] check={{0,1,2},{3,4,5},{6,7,8},{0,3,6},{1,4,7},{2,5,8},{0,4,8},{2,4,6}};

    public gameState(char[] _state,char _player){
        state=_state.clone();
        player=_player;
    }

    public int eval(){

        int X2=0,X1=0,O2=0,O1=0;
        for(int i=0;i<8;i++){
            int numX=0,numO=0;
            for(int j=0;j<3;j++){
                if(this.state[this.check[i][j]]=='X'){
                    numX++;
                }else if(this.state[this.check[i][j]]=='O'){
                    numO++;
                }
            }
            if(numX==0&&numO!=0){
                if(numO==2){
                    O2++;
                }else if(numO==1){
                    O1++;
                }
            }else if(numX!=0&&numO==0){
                if(numX==2){
                    X2++;
                }else if(numX==1){
                    X1++;
                }
            }
        }
        //if(3*X2+X1-3*O2-O1==-2)
          //  System.out.print("!!");
        return 3*X2+X1-3*O2-O1;
    }

    public boolean terminalTest(){
        boolean checkWinner=false;
        for(int i=0;i<9;i++){
            if(this.state[i]=='.'){
                checkWinner=true;
                break;
            }
        }
        if(checkWinner){
            for(int i=0;i<8;i++){
                int numX=0,numO=0;
                for(int j=0;j<3;j++){
                    if(this.state[this.check[i][j]]=='X'){
                        numX++;
                    }else if(state[this.check[i][j]]=='O'){
                        numO++;
                    }
                }
                if(numX==3||numO==3){
                    return true;
                }
            }
        }else{
            return true;
        }
        return false;
    }

    /* This method is to return the utility value of current gameState*/
    public int utility(){
        int utility=0;
        for(int i=0;i<3;i++){
            if(this.state[i*3]==this.state[i*3+1]&&this.state[i*3+1]==this.state[i*3+2]){
                if(this.state[i*3]=='X'){
                    utility=10;
                    break;
                }
                else if(this.state[i]=='O'){
                    utility = -10;
                    break;
                }
            }else if(this.state[i]==this.state[i+3]&&this.state[i+3]==this.state[i+6]){
                if(this.state[i]=='X'){
                    utility=10;
                    break;
                }
                else if(this.state[i]=='O'){
                    utility = -10;
                    break;
                }
            }
        }
        if(utility==0){
            if(this.state[0]==this.state[4]&&this.state[4]==this.state[8]){
                if(this.state[4]=='X'){
                    utility=10;
                }
                else if(this.state[4]=='O'){
                    utility = -10;
                }
            }else if(this.state[2]==this.state[4]&&this.state[4]==this.state[6]){
                if(this.state[4]=='X'){
                    utility=10;
                }
                else if(this.state[4]=='O'){
                    utility = -10;
                }
            }
        }
        return utility;
    }
    /* Before calling this method, you have to make sure pos is '.'*/
    public gameState newState(int pos){
        gameState newState;
        char[] temp;
        if(this.player=='X'){
            temp=this.state.clone();
            temp[pos]='X';
            newState=new gameState(temp,'O');
        }else{
            temp=this.state.clone();
            temp[pos]='O';
            newState=new gameState(temp,'X');
        }
        return newState;
    }
    public char[] getStateSeq(){
        return this.state;
    }
    public char getPlayer(){
        return this.player;
    }
    public void setPlayer(char _player){
        this.player=_player;
    }
}
