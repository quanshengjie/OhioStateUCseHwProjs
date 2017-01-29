package edu.osu.cse3341.syntaxtree;

import edu.osu.cse3341.tokenizer.Tokenizer;
import edu.osu.cse3341.util.InterpreterUtil;
import edu.osu.cse3341.util.VariableMemoryPool;

public class Comp implements Parsable, PrettyPrintable {
	private VariableMemoryPool memPool = null;
	private Op op1 = null;
	private Op op2 = null;
	private enum TYPE {
		NOT_EQUAL,
		EQUAL,
		LESS,
		GREATER,
		LESS_EQUAL,
		GREATER_EQUAL
	};
	private TYPE type;
	
	public Comp(final VariableMemoryPool memPool) {
		this.memPool = memPool;
	}
	@Override
	public void Parse(Tokenizer tokenizer) {
		InterpreterUtil.checkTokenAndSkip("(", 20, tokenizer);
		if(tokenizer.getToken() != 32 && tokenizer.getToken() != 31 && 
				tokenizer.getToken() != 20) {
			throw new RuntimeException("Expecting a Op but get token # \"" + tokenizer.getToken() + "\".");
		}
		op1 = new Op(memPool);
		op1.Parse(tokenizer);
		int curToken = tokenizer.getToken();
		switch(curToken) {
		case 25:
			type = TYPE.NOT_EQUAL;
			InterpreterUtil.checkTokenAndSkip("!=", 25, tokenizer);
			break;
		case 26:
			type = TYPE.EQUAL;
			InterpreterUtil.checkTokenAndSkip("==", 26, tokenizer);
			break;
		case 27:
			type = TYPE.LESS;
			InterpreterUtil.checkTokenAndSkip("<", 27, tokenizer);
			break;
		case 28:
			type = TYPE.GREATER;
			InterpreterUtil.checkTokenAndSkip(">", 28, tokenizer);
			break;
		case 29:
			type = TYPE.LESS_EQUAL;
			InterpreterUtil.checkTokenAndSkip("<=", 29, tokenizer);
			break;
		case 30:
			type = TYPE.GREATER_EQUAL;
			InterpreterUtil.checkTokenAndSkip(">=", 30, tokenizer);
			break;
		default:
			throw new RuntimeException("Expecting a Comp Op but get token # \"" + curToken + "\".");
		}
		if(tokenizer.getToken() != 32 && tokenizer.getToken() != 31 && 
				tokenizer.getToken() != 20) {
			throw new RuntimeException("Expecting a Op but get token # \"" + tokenizer.getToken() + "\".");
		}
		op2 = new Op(memPool);
		op2.Parse(tokenizer);
		InterpreterUtil.checkTokenAndSkip(")", 21, tokenizer);
	}

	@Override
	public void ContextSensitiveCheck() {
		op1.ContextSensitiveCheck();
		op2.ContextSensitiveCheck();
	}
	
	@Override
	public void prettyPrint(int offset) {
		InterpreterUtil.printSpace(offset);
		System.out.print("(");
		op1.prettyPrint(0);
		switch(type) {
		case NOT_EQUAL:
			System.out.print(" != ");
			break;
		case EQUAL:
			System.out.print(" == ");
			break;
		case LESS:
			System.out.print(" < ");
			break;
		case GREATER:
			System.out.print(" > ");
			break;
		case LESS_EQUAL:
			System.out.print(" <= ");
			break;
		case GREATER_EQUAL:
			System.out.print(" >= ");
			break;
		default:
			throw new RuntimeException("The Comp Op is of type not recognized.");
		}
		op2.prettyPrint(0);
		System.out.print(")");
	}
	
	boolean evaluate() {
		int op1Val = op1.evaluate();
		int op2Val = op2.evaluate();
		switch(type) {
		case NOT_EQUAL:
			return op1Val != op2Val;
		case EQUAL:
			return op1Val == op2Val;
		case LESS:
			return op1Val < op2Val;
		case GREATER:
			return op1Val > op2Val;
		case LESS_EQUAL:
			return op1Val <= op2Val;
		case GREATER_EQUAL:
			return op1Val >= op2Val;
		default:
			throw new RuntimeException("The Comp Op is of type not recognized.");
		}
	}
}
