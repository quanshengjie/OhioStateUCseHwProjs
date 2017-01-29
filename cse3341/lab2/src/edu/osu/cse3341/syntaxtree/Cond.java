package edu.osu.cse3341.syntaxtree;

import edu.osu.cse3341.tokenizer.Tokenizer;
import edu.osu.cse3341.util.InterpreterUtil;
import edu.osu.cse3341.util.VariableMemoryPool;

public class Cond implements Parsable, PrettyPrintable {
	private VariableMemoryPool memPool = null;
	private Comp comp = null;
	private Cond cond1 = null;
	private Cond cond2 = null;
	private enum TYPE {
		COMP,
		NEGATION,
		AND,
		OR
	};
	private TYPE type;
	
	public Cond(final VariableMemoryPool memPool) {
		this.memPool = memPool;
	}
	@Override
	public void Parse(Tokenizer tokenizer) {
		if(tokenizer.getToken() != 20 && tokenizer.getToken() != 15 && 
				tokenizer.getToken() != 16) {
			throw new RuntimeException("Expecting a condition but get token # \"" + tokenizer.getToken() + "\".");
		}
		int curToken = tokenizer.getToken();
		switch(curToken) {
		case 20:
			type = TYPE.COMP;
			comp = new Comp(memPool);
			comp.Parse(tokenizer);
			break;
		case 15:
			type = TYPE.NEGATION;
			InterpreterUtil.checkTokenAndSkip("!", 15, tokenizer);
			cond1 = new Cond(memPool);
			cond1.Parse(tokenizer);
			break;
		case 16:
			InterpreterUtil.checkTokenAndSkip("[", 16, tokenizer);
			cond1 = new Cond(memPool);
			if(tokenizer.getToken() != 20 && tokenizer.getToken() != 15 && 
					tokenizer.getToken() != 16) {
				throw new RuntimeException("Expecting a condition but get token # \"" + tokenizer.getToken() + "\".");
			}
			cond1.Parse(tokenizer);
			if(tokenizer.getToken() == 18) {
				type = TYPE.AND;
				InterpreterUtil.checkTokenAndSkip("&&", 18, tokenizer);
			} else if(tokenizer.getToken() == 19) {
				type = TYPE.OR;
				InterpreterUtil.checkTokenAndSkip("||", 19, tokenizer);
			} else {
				throw new RuntimeException("Expecting a && or || but get token # \"" + tokenizer.getToken() + "\".");
			}
			cond2 = new Cond(memPool);
			if(tokenizer.getToken() != 20 && tokenizer.getToken() != 15 && 
					tokenizer.getToken() != 16) {
				throw new RuntimeException("Expecting a condition but get token # \"" + tokenizer.getToken() + "\".");
			}
			cond2.Parse(tokenizer);
			InterpreterUtil.checkTokenAndSkip("]", 17, tokenizer);
			break;
		default:
			throw new RuntimeException("Expecting a condition but get token # \"" + tokenizer.getToken() + "\".");
		}
	}

	@Override
	public void ContextSensitiveCheck() {
		if(comp != null) {
			comp.ContextSensitiveCheck();
		}
		if(cond1 != null) {
			cond1.ContextSensitiveCheck();
		}
		if(cond2 != null) {
			cond2.ContextSensitiveCheck();
		}
	}
	
	@Override
	public void prettyPrint(int offset) {
		switch(type) {
		case COMP:
			comp.prettyPrint(offset);
			break;
		case NEGATION:
			InterpreterUtil.printSpace(offset);
			System.out.print("!");
			cond1.prettyPrint(0);
			break;
		case AND:
			InterpreterUtil.printSpace(offset);
			System.out.print("[");
			cond1.prettyPrint(0);
			System.out.print(" && ");
			cond2.prettyPrint(0);
			System.out.print("]");
			break;
		case OR:
			InterpreterUtil.printSpace(offset);
			System.out.print("[");
			cond1.prettyPrint(0);
			System.out.print(" || ");
			cond2.prettyPrint(0);
			System.out.print("]");
			break;
		default:
			throw new RuntimeException("The condition is of type not recognized.");
		}
	}
	
	boolean evaluate() {
		switch(type) {
		case COMP:
			return comp.evaluate();
		case NEGATION:
			return !cond1.evaluate();
		case AND:
			return cond1.evaluate() && cond2.evaluate();
		case OR:
			return cond1.evaluate() || cond2.evaluate();
		default:
			throw new RuntimeException("The condition is of type not recognized.");
		}
	}
}
