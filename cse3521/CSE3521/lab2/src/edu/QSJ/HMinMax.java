package edu.QSJ;
import java.util.ArrayList;
import java.util.List;


public final class HMinMax
{
    private static class Result
	{
		public int utility = 0;
		public List<List<Integer>> stateSequence;
		public Result() { }
	}
	
	private static boolean Terminal_Test(List<Integer> state)
	{
		// test the validaity of state
		assert state.size() == 9;
		
		boolean ret = false;
		
		// have empty space ?
		boolean space = false;
		for(Integer cell : state)
		{
			if(cell == 0)
			{
				space = true;
			}
		}
		if(!space)
		{
			ret = true;
			return ret;
		}
		
		// someone win ?
		// check rows
		for(int i=0; i<=6; i+=3)
		{
			if(state.get(0+i) == state.get(1+i) && 
			   state.get(1+i) == state.get(2+i) && state.get(0+i) != 0)
			{
				ret = true;
				return ret;
			}
		}
		// check cols
		for(int i=0; i<=2; i++)
		{
			if(state.get(0+i) == state.get(3+i) && 
			   state.get(3+i) == state.get(6+i) && state.get(0+i) != 0)
			{
				ret = true;
				return ret;
			}
		}
		// check diagonals
		if(state.get(0) == state.get(4) && 
		   state.get(4) == state.get(8) && state.get(0) != 0)
		{
			ret = true;
			return ret;
		}
		if(state.get(2) == state.get(4) && 
		   state.get(4) == state.get(6) && state.get(2) != 0)
		{
			ret = true;
			return ret;
		}
		return ret;
	}
	
	private static int Utility(List<Integer> state)
	{
		// test the validaity of state
		assert state.size() == 9;
		int utility = 0;
		// someone win/lose ?
		// check rows
		for(int i=0; i<=6; i+=3)
		{
			if(state.get(0+i) == state.get(1+i) && 
			   state.get(1+i) == state.get(2+i) && state.get(0+i) != 0)
			{
				if(state.get(0+i) == 1)
				{
					// win
					utility = 10;
					return utility;
				}
				else
				{
					// lose
					utility = -10;
					return utility;
				}
			}
		}
		// check cols
		for(int i=0; i<=2; i++)
		{
			if(state.get(0+i) == state.get(3+i) && 
			   state.get(3+i) == state.get(6+i) && state.get(0+i) != 0)
			{
				if(state.get(0+i) == 1)
				{
					// win
					utility = 10;
					return utility;
				}
				else
				{
					// lose
					utility = -10;
					return utility;
				}
			}
		}
		// check diagonals
		if(state.get(0) == state.get(4) && 
		   state.get(4) == state.get(8) && state.get(0) != 0)
		{
			if(state.get(0) == 1)
			{
				// win
				utility = 10;
				return utility;
			}
			else
			{
				// lose
				utility = -10;
				return utility;
			}
		}
		if(state.get(2) == state.get(4) && 
		   state.get(4) == state.get(6) && state.get(2) != 0)
		{
			if(state.get(2) == 1)
			{
				// win
				utility = 10;
				return utility;
			}
			else
			{
				// lose
				utility = -10;
				return utility;
			}
		}
		return utility;
	}
	
	private static List<Integer> Action(List<Integer> state)
	{
		// test the validaity of state
		assert state.size() == 9;
		
		List<Integer> actionList = new ArrayList<Integer>();
		for(int i=0; i<9; i++)
		{
			if(state.get(i) == 0)
			{
				actionList.add(i);
			}
		}
		return actionList;
	}
    
	private static List<Integer> Result(List<Integer> state, Integer action, Integer player)
	{
		assert state.get(action) == 0;
		List<Integer> newState = new ArrayList<Integer>(state);
		newState.set(action, player);
		return newState;
	}
	
	private static Result MinMax_Decision(List<Integer> state, List<Integer> firstStepUtility, int whoFirst, int d)
	{
		// test the validaity of state
		assert state.size() == 9;
		int player = whoFirst;
		Result ret = null;
		if(d == 0)
		{
			ret = new Result();
			ret.utility = evals(state);
			ret.stateSequence = new ArrayList<List<Integer>>();
			ret.stateSequence.add(0, new ArrayList<Integer>(state));
			return ret;
		}
		if(player == 1)
		{
			int value = Integer.MIN_VALUE;
			Result result_of_value = null;
			List<Integer> actions = Action(state);
			for(int i=0; i<actions.size(); i++)
			{
				Integer a = actions.get(i);
				Result candidate = Min_Value(Result(state, a, player), d-1);
				if(candidate.utility > value)
				{
					value = candidate.utility;
					result_of_value = candidate;
				}
				firstStepUtility.set(a, candidate.utility);
			}
			if(result_of_value != null)
			{
				result_of_value.stateSequence.add(0, state);
				ret = result_of_value;
			}
		}
		else if(player == 2)
		{
			int value = Integer.MAX_VALUE;
			Result result_of_value = null;
			List<Integer> actions = Action(state);
			for(int i=0; i<actions.size(); i++)
			{
				Integer a = actions.get(i);
				Result candidate = Max_Value(Result(state, a, player), d-1);
				if(candidate.utility < value)
				{
					value = candidate.utility;
					result_of_value = candidate;
				}
				firstStepUtility.set(a, candidate.utility);
			}
			if(result_of_value != null)
			{
				result_of_value.stateSequence.add(0, state);
				ret = result_of_value;
			}
		}
		return ret;
	}
	
	private static Result Max_Value(List<Integer> state, int d)
	{
		// test the validaity of state
		assert state.size() == 9;
		int player =  1;
		
		Result ret = null;
		if(Terminal_Test(state))
		{
			ret = new Result();
			ret.utility = Utility(state);
			ret.stateSequence = new ArrayList<List<Integer>>();
			ret.stateSequence.add(0, new ArrayList<Integer>(state));
			
		}
		else if(d == 0)
		{
			ret = new Result();
			ret.utility = evals(state);
			ret.stateSequence = new ArrayList<List<Integer>>();
			ret.stateSequence.add(0, new ArrayList<Integer>(state));
			return ret;
		}
		else
		{
			int value = Integer.MIN_VALUE;
			Result result_of_value = null;
			List<Integer> actions = Action(state);
			for(int i=0; i<actions.size(); i++)
			{
				Integer a = actions.get(i);
				Result candidate = Min_Value(Result(state, a, player), d-1);
				if(candidate.utility > value)
				{
					value = candidate.utility;
					result_of_value = candidate;
				}
			}
			if(result_of_value != null)
			{
				result_of_value.stateSequence.add(0, state);
				ret = result_of_value;
			}
		}
		return ret;
	}
	
	private static Result Min_Value(List<Integer> state, int d)
	{
		// test the validaity of state
		assert state.size() == 9;
		int player =  2;
		
		Result ret = null;
		if(Terminal_Test(state))
		{
			ret = new Result();
			ret.utility = Utility(state);
			ret.stateSequence = new ArrayList<List<Integer>>();
			ret.stateSequence.add(0, new ArrayList<Integer>(state));
			
		}
		else if(d == 0)
		{
			ret = new Result();
			ret.utility = evals(state);
			ret.stateSequence = new ArrayList<List<Integer>>();
			ret.stateSequence.add(0, new ArrayList<Integer>(state));
			return ret;
		}
		else
		{
			int value = Integer.MAX_VALUE;
			Result result_of_value = null;
			List<Integer> actions = Action(state);
			for(int i=0; i<actions.size(); i++)
			{
				Integer a = actions.get(i);
				Result candidate = Max_Value(Result(state, a, player), d-1);
				if(candidate.utility < value)
				{
					value = candidate.utility;
					result_of_value = candidate;
				}
			}
			if(result_of_value != null)
			{
				result_of_value.stateSequence.add(0, state);
				ret = result_of_value;
			}
		}
		return ret;
	}
	
	private static List<Integer> GenerateList(Integer... nums)
	{
		List<Integer> list = new ArrayList<Integer>();
		for(Integer num : nums)
		{
			list.add(num);
		}
		return list;
	}
	
	private static void prettyPrintList(List<Integer> list)
	{
		for(int i=0; i<list.size(); i++)
		{
			System.out.print(list.get(i) + " ");
			if((i+1) % 3 == 0)
			{
				System.out.println();
			}
		}
	}
	
	private static void prettyPrintState(List<Integer> state)
	{
		for(int i=0; i<state.size(); i++)
		{
			Integer cell = state.get(i);
			String out = "\u2588";
			if(cell == 1)
			{
				out = "X";
			}
			else if(cell == 2)
			{
				out = "O";
			}
			System.out.print(out + " ");
			if((i+1) % 3 == 0)
			{
				System.out.println();
			}
		}
		System.out.println();
	}
	private static int countXorO(List<Integer> state, int num, boolean isO)
	{
		int count = 0;
		// check rows
		for(int i=0; i<=6; i+=3)
		{
			// see what's inside a row
			int subCount[] = {0, 0, 0};
			subCount[state.get(0+i)]++;
			subCount[state.get(1+i)]++;
			subCount[state.get(2+i)]++;
			if(isO)
			{
				if(subCount[1] == 0 && subCount[2] == num)
				{
					count++;
				}
			}
			else
			{
				if(subCount[2] == 0 && subCount[1] == num)
				{
					count++;
				}
			}
		}
		// check cols
		for(int i=0; i<=2; i++)
		{			
			// see what's inside a col
			int subCount[] = {0, 0, 0};
			subCount[state.get(0+i)]++;
			subCount[state.get(3+i) ]++;
			subCount[state.get(6+i)]++;
			if(isO)
			{
				if(subCount[1] == 0 && subCount[2] == num)
				{
					count++;
				}
			}
			else
			{
				if(subCount[2] == 0 && subCount[1] == num)
				{
					count++;
				}
			}
		}
		// check diagonals
		// see what's inside a diagonal
		int subCount[] = {0, 0, 0};
		subCount[state.get(0)]++;
		subCount[state.get(4)]++;
		subCount[state.get(8)]++;
		if(isO)
		{
			if(subCount[1] == 0 && subCount[2] == num)
			{
				count++;
			}
		}
		else
		{
			if(subCount[2] == 0 && subCount[1] == num)
			{
				count++;
			}
		}
		// see what's inside a diagonal
		subCount[0] = 0; subCount[1] = 0; subCount[2] = 0;
		subCount[state.get(2)]++;
		subCount[state.get(4)]++;
		subCount[state.get(6)]++;
		if(isO)
		{
			if(subCount[1] == 0 && subCount[2] == num)
			{
				count++;
			}
		}
		else
		{
			if(subCount[2] == 0 && subCount[1] == num)
			{
				count++;
			}
		}
		return count;
	}
	private static int evals(List<Integer> state)
	{
		int evals = 3 * countXorO(state, 2, false) + 
				    1 * countXorO(state, 1, false) -
				    (3 * countXorO(state, 2, true) + 
				     1 * countXorO(state, 1, true));
		return evals;
	}
	
    public static void main(String[] args) 
    {
    	int depth = 4;	// must >= 1
    	List<Integer> initState = GenerateList(0, 0, 0, 0, 0, 0, 0, 0, 0);
    	List<Integer> firstStepUtility = GenerateList(0, 0, 0, 0, 0, 0, 0, 0, 0);
    	Result result = MinMax_Decision(initState, firstStepUtility, 1, depth);
    	System.out.println("The h-minimax values for X's first move are :");
    	prettyPrintList(firstStepUtility);
    	if(!Terminal_Test(result.stateSequence.get(result.stateSequence.size()-1)))
    	{
    		int player = 2;
    		Result trueResult = new Result();
    		trueResult.stateSequence = new ArrayList<List<Integer>>();
    		trueResult.stateSequence.add(0, initState);
    		trueResult.stateSequence.add(1, result.stateSequence.get(1));
    		initState = new ArrayList<Integer>(result.stateSequence.get(1));
    		do
    		{
    			result = MinMax_Decision(initState, firstStepUtility, player, depth);
    			trueResult.stateSequence.add(trueResult.stateSequence.size(), result.stateSequence.get(1));
    			player = 3 - player;
    			initState = new ArrayList<Integer>(result.stateSequence.get(1));
    		} while(!Terminal_Test(result.stateSequence.get(result.stateSequence.size()-1)));
    		trueResult.utility = result.utility;
    		for(int i=2; i<result.stateSequence.size(); i++)
    		{
    			trueResult.stateSequence.add(trueResult.stateSequence.size(), result.stateSequence.get(i));
    		}
    		result = trueResult;
    	}
    	System.out.println("Sequence of steps are :");
    	for(int i=0; i<result.stateSequence.size(); i++)
    	{
    		prettyPrintState(result.stateSequence.get(i));
    	}
    }
}
