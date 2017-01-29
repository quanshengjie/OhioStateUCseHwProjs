package com.HYB;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Collections;

/**
 * Created by heyub_000 on 2/4/2016.
 */

public class Node {
    private List<Integer> state;
    private Node parent;
    public enum  actions {UP,DOWN,LEFT,RIGHT} //Actions are based on zero point
    private Map<actions,Boolean> validActions;
    private int depth;
    private int path_cost;
    private int costToGo;
    private int zeroPos; //Store the current zero state, it will initialize in setActions method
    private int hash; //Using to compare with goal state

    public Node(List<Integer> _state,Node _parent,int _depth,int _path_cost,int _costToGo){
        state=new ArrayList<Integer>(_state);
        parent=_parent;
        validActions=new HashMap<actions,Boolean>();
        depth=_depth;
        path_cost=_path_cost;
        costToGo=_costToGo;
        hash=this.state.hashCode();
    }

    public List<Integer> getState(){
        return this.state;
    }
    public Node getParent(){
        return this.parent;
    }
    public int getDepth(){
        return this.depth;
    }
    public int getPathCost(){return this.path_cost;}
    public int getCostToGo(){
        return this.costToGo;
    }
    public Map<actions,Boolean> getValidActions(){ return validActions;}
    public int getHash(){return this.hash;}

    /* Initialize the valid actions of current state
    *  ***THIS FUNCTION MUST BE CALLED WHEN CREATE NEW NODES
    * */
    public void setActions (){
        zeroPos=findIndexOfZero();
        //In the middle
        if(zeroPos==4){
            this.validActions.put(actions.UP,true);
            this.validActions.put(actions.DOWN,true);
            this.validActions.put(actions.LEFT,true);
            this.validActions.put(actions.RIGHT,true);
        }else if(zeroPos%2!=0){
            //In the middle row
            if(zeroPos==3||zeroPos==5){
                 this.validActions.put(actions.DOWN,true);
                 this.validActions.put(actions.UP,true);
                 if(zeroPos==3) {
                     this.validActions.put(actions.RIGHT, true);
                     this.validActions.put(actions.LEFT, false);
                 }
                else {
                     this.validActions.put(actions.RIGHT, false);
                     this.validActions.put(actions.LEFT, true);
                 }
            }else{
                // In the middle column
                 this.validActions.put(actions.LEFT,true);
                 this.validActions.put(actions.RIGHT,true);
                 if(zeroPos==1) {
                     this.validActions.put(actions.DOWN, true);
                     this.validActions.put(actions.UP, false);
                 }
                 else {
                     this.validActions.put(actions.UP, true);
                     this.validActions.put(actions.DOWN, false);
                 }
            }
        }else{
                if(zeroPos==0||zeroPos==2){
                    this.validActions.put(actions.DOWN,true);
                    if(zeroPos==0){
                        this.validActions.put(actions.RIGHT,true);
                        this.validActions.put(actions.LEFT,false);
                        this.validActions.put(actions.UP,false);
                    }else{
                        this.validActions.put(actions.LEFT,true);
                        this.validActions.put(actions.RIGHT,false);
                        this.validActions.put(actions.UP,false);
                    }
                }else{
                    this.validActions.put(actions.UP,true);
                    if(zeroPos==6){
                        this.validActions.put(actions.RIGHT,true);
                        this.validActions.put(actions.LEFT,false);
                        this.validActions.put(actions.DOWN,false);
                    }else{
                        this.validActions.put(actions.LEFT,true);
                        this.validActions.put(actions.DOWN,false);
                        this.validActions.put(actions.RIGHT,false);
                    }
                }
        }
    }


    // Generate child based on valid actions
    public void swap(List<Integer> child,actions action){
        switch(action){
            case UP:
                Collections.swap(child,zeroPos,zeroPos-3);
                break;
            case DOWN:
                Collections.swap(child,zeroPos,zeroPos+3);
                break;
            case LEFT:
                Collections.swap(child,zeroPos,zeroPos-1);
                break;
            case RIGHT:
                Collections.swap(child,zeroPos,zeroPos+1);
                break;
        }
    }

    private int findIndexOfZero(){
        int result=Integer.MAX_VALUE;
        for(int i=0;i<this.state.size();i++){
            if(this.state.get(i)==0) {
                result = i;
            }
        }
        return result;
    }
}
