package com.HYB;
import java.util.*;
public class AStar {
    private static List<Integer> goal=new ArrayList<Integer>();
    private static List<Integer> goalCooX = new ArrayList<Integer>();
    private static List<Integer> goalCooY = new ArrayList<Integer>();
    private static Set<Node.actions> actions;
    private static HashMap<Node, Node.actions> nodeActionMap;
    private static void Initialize(){
        // generate the goal state looking for
        for(int i=0;i<9;i++){
            goal.add(i);
            goalCooX.add(i % 3);
            goalCooY.add(i / 3);
        }
        // generate data structure we need
        actions = EnumSet.allOf(Node.actions.class);
        nodeActionMap = new HashMap<>();
    }
    //Using hash value to compare with the goal state
    private static boolean checkGoal(Node node)
    {
        return node.getState().equals(goal);
    }
    private static Node getChildNode(Node node, Node.actions action)
    {
        List<Integer> children=new ArrayList<Integer>();
        if(node.getValidActions().get(action))
        {
            children=new ArrayList<Integer>(node.getState());
            node.swap(children,action); //might
        }
        if(children.size()!=0)
        {
            Node child=new Node(children, node, node.getDepth()+1,
                    node.getPathCost()+1, Cost2Go(children));
            child.setActions();
            nodeActionMap.put(child, action);
            return child;
        }
        else
        {
            return null;
        }
    }
    private static List<Node> Solution(Node initNode)
    {
        List<Node> result = new ArrayList<Node>();
        Comparator<Node> cmptor = new CostCmptor();
        PriorityQueue<Node> frontier = new PriorityQueue<Node>(100, cmptor);
        Set<List<Integer>> explored = new HashSet<>();
        frontier.add(initNode);
        boolean failed = false;
        while(true)
        {
            Node curNode;
            if(frontier.size() == 0)
            {
                failed = true;
                break;
            }
            else
            {
                curNode = frontier.poll();
                explored.add(curNode.getState());
            }
            if(checkGoal(curNode))
            {
                Node retrive = curNode;
                while(retrive != null)
                {
                    result.add(0, retrive);
                    retrive = retrive.getParent();
                }
                break;
            }
            else
            {
                for(Node.actions action: actions)
                {
                    Node child = getChildNode(curNode, action);
                    if(child!=null && !explored.contains(child.getState()))
                    {
                        frontier.add(child);
                    }
                }
            }
        }
        return result;
    }

    private static int Cost2Go(List<Integer> state)
    {
        int cost = 0;
        for(int i=0; i<9; i++)
        {
            int x = i % 3;
            int y = i / 3;
            int tile = state.get(i);
            cost += Math.abs(goalCooX.get(tile)- x);
            cost += Math.abs(goalCooY.get(tile) - y);
        }
        return cost;
    }

    private static List<Integer> initList(Integer... nums)
    {
        List<Integer> list = new ArrayList<Integer>();
        for(Integer num : nums)
        {
            list.add(num);
        }
        return list;
    }

    private static void prettyPrint(List<Node> result)
    {
        for(int i=0; i<result.size(); i++)
        {
            String act;
            if(i==0)
            {
                act="None";
                System.out.println("Step "+i+": "+act);
            }
            else
            {
                act = nodeActionMap.get(result.get(i)).toString();
                System.out.println("Step "+i+": "+act);
            }
            Node cur = result.get(i);
            System.out.println(cur.getState().get(0)+" "+cur.getState().get(1)+" "+cur.getState().get(2));
            System.out.println(cur.getState().get(3)+" "+cur.getState().get(4)+" "+cur.getState().get(5));
            System.out.println(cur.getState().get(6)+" "+cur.getState().get(7)+" "+cur.getState().get(8) + "\n");
        }
    }

    public static void main(String[] args)
    {
        Initialize();
        List<Integer> initState = initList(5,0,4,2,1,3,6,7,8);
        Node initNode = new Node(initState, null, 0, 0, Cost2Go(initState));
        initNode.setActions();
        nodeActionMap.put(initNode, null);
        List<Node> result = Solution(initNode);
        prettyPrint(result);
    }

    private static class CostCmptor implements Comparator<Node>
    {
        @Override
        public int compare(Node x, Node y)
        {
            return (x.getPathCost() + x.getCostToGo())
                    - (y.getPathCost() + y.getCostToGo());
        }
    }
}
