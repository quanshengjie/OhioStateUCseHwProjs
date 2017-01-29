package edu.osu.cse3341.syntaxtree;

import edu.osu.cse3341.tokenizer.Tokenizer;
import edu.osu.cse3341.util.InterpreterUtil;
import edu.osu.cse3341.util.VariableMemoryPool;

public class Op implements Parsable, PrettyPrintable {
	private VariableMemoryPool memPool = null;
	private Integer integer = null;
	private Id id = null;
	private Exp exp = null;
	private enum TYPE {
		INT,
		ID,
		EXP
	};
	private TYPE type;
	public Op(final VariableMemoryPool memPool) {
		this.memPool = memPool;
	}
	@Override
	public void Parse(Tokenizer tokenizer) {
		int curToken = tokenizer.getToken();
		if(curToken == 31) {
			type = TYPE.INT;
			integer = tokenizer.intVal();
			InterpreterUtil.checkTokenAndSkip("int", 31, tokenizer);
		} else if(curToken == 32) {
			type = TYPE.ID;
			id = new Id(memPool);
			id.Parse(tokenizer);
		} else if(curToken == 20) {
			InterpreterUtil.checkTokenAndSkip("(", 20, tokenizer);
			type = TYPE.EXP;
			exp = new Exp(memPool);
			exp.Parse(tokenizer);
			InterpreterUtil.checkTokenAndSkip(")", 21, tokenizer);
		} else {
			throw new RuntimeException("Expecting an Op but get token # \"" + curToken + "\".");
		}
	}

	@Override
	public void ContextSensitiveCheck() {
		switch(type) {
		case ID:
			memPool.exsistVariable(id.getIdName());
			break;
		case INT:
			break;
		case EXP:
			exp.ContextSensitiveCheck();
			break;
		default:
			throw new RuntimeException("The Op is not of the type expected.");
		}
	}
	
	@Override
	public void prettyPrint(int offset) {
		switch(type) {
		case ID:
			id.prettyPrint(offset);
			break;
		case INT:
			InterpreterUtil.printSpace(offset);
			System.out.print(integer);
			break;
		case EXP:
			InterpreterUtil.printSpace(offset);
			System.out.print("(");
			exp.prettyPrint(0);
			System.out.print(")");
			break;
		default:
			throw new RuntimeException("The Op is not of the type expected.");
		}
	}
	
	public int evaluate() {
		switch(type) {
		case ID:
			return id.getIdVal();
		case INT:
			return integer;
		case EXP:
			return exp.evaluate();
		default:
			throw new RuntimeException("The Op is not of the type expected.");
		}
	}
}
