package com.HYB;
import java.util.*;
import com.HYB.Node.actions;
public class IDDFS {
    private static List<Integer> goal=new ArrayList<Integer>();
    private static Node goalNode;
    private static List<Node.actions> steps;
    private static List<List<Integer>> result;
    private static Set<actions> acti;

    /*When you are using the UCS, we should use this comparator*/
    private static Comparator<Node> comparator=new Comparator<Node>() {
        @Override
        public int compare(Node o1, Node o2) {
            return o1.getDepth()-o2.getDepth();
        }
    };

    /* initialize goal state*/
    private static void InitializeGoal(){
        for(int i=0;i<9;i++){
            goal.add(i);
        }
        /* only check state with the goal node*/
        goalNode=new Node(goal,null,0,0,0);
    }


    //Using hash value to compare with the goal state
    public static boolean check(Node node1,Node node2){
        return node1.getHash()==node2.getHash();
    }


    /* return child node corresponding to particular action, return empty if the action is not valid
    * May be return a node that has already explored.
    * */
    private static Node getChildNode(Node node,actions action){
        List<Integer> children=new ArrayList<Integer>();
        if(node.getValidActions().get(action)){
            children=new ArrayList<Integer>(node.getState());
            node.swap(children,action); //might
        }
        if(children.size()!=0) {
            Node child=new Node(children,node,node.getDepth()+1,node.getPathCost()+1,0);
            child.setActions();
            return child;
        }
        else {
            return null;
        }
    }
    private static boolean DLS(Node node, int limit){
        /* the cut_goal[0] mark cutoff, cut_goal[1] mark goal*/
        boolean goal=false;
        if(check(node,goalNode)){
            goal=true;
            return goal;
        }
        else if(limit==0){
            return goal;
        }
        else{
            //boolean cutoff_occured=false;
            for(Node.actions act: acti){
                Node child=getChildNode(node,act);

                if(child==null) continue;       //current action is invalid

                steps.add(act);
                result.add(node.getState());

                goal=DLS(child,limit-1);
                if(goal) return goal;

                steps.remove(steps.size()-1);
                result.remove(result.size()-1);
            }
            return goal;
        }
    }


    /*print out the results*/
    private static void print(){
        for(int i=0;i<=steps.size();i++){
            String act;
            if(i==0){
                act="None";
                System.out.println("Step "+i+": "+act);
            }else {
                act = steps.get(i-1).toString();
                System.out.println("Step "+i+": "+act);
            }
            if(i!=steps.size()){
                List<Integer> temp=result.remove(0);
                System.out.println(temp.get(0)+" "+temp.get(1)+" "+temp.get(2));
                System.out.println(temp.get(3)+" "+temp.get(4)+" "+temp.get(5));
                System.out.println(temp.get(6)+" "+temp.get(7)+" "+temp.get(8));
            }else{
                System.out.println(goal.get(0)+" "+goal.get(1)+" "+goal.get(2));
                System.out.println(goal.get(3)+" "+goal.get(4)+" "+goal.get(5));
                System.out.println(goal.get(6)+" "+goal.get(7)+" "+goal.get(8));
            }

        }
    }

    public static void main(String[] args) {
        InitializeGoal();
        /* If using ucs, we need to use these two queues*/
        //explored=new PriorityQueue<Node>(20,comparator);
        //frontier=new PriorityQueue<Node>(20,comparator);
        steps=new ArrayList<actions>();
        result=new ArrayList<List<Integer>>();
        acti=EnumSet.allOf(Node.actions.class);
        Node root=new Node(Arrays.asList(5,0,4,2,1,3,6,7,8),null,1,0,0);
        root.setActions();

        //IDDFS
        boolean target=false;
        for(int i=1;i<21;i++){
            target=DLS(root,i);
            if(target)
                break;
            /*make sure steps is clear*/
             steps.clear();
            result.clear();
        }
        if(target)
            print();
        else
            System.out.print("failed");




    }
}
