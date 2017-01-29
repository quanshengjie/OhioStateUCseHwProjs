package edu.osu.cse3341.syntaxtree;

import java.util.Scanner;

import edu.osu.cse3341.tokenizer.Tokenizer;
import edu.osu.cse3341.util.InterpreterUtil;
import edu.osu.cse3341.util.VariableMemoryPool;

public class Assign implements Parsable, PrettyPrintable {
	private VariableMemoryPool memPool = null;
	private Id id = null;
	private Exp exp = null;
	
	public Assign(final VariableMemoryPool memPool) {
		this.memPool = memPool;
	}
	@Override
	public void Parse(Tokenizer tokenizer) {
		InterpreterUtil.checkToken("identifier", 32, tokenizer);
		id = new Id(memPool);
		id.Parse(tokenizer);
		InterpreterUtil.checkTokenAndSkip("=", 14, tokenizer);
		if(tokenizer.getToken() != 32 && tokenizer.getToken() != 31 && 
				tokenizer.getToken() != 20) {
			throw new RuntimeException("Expecting a expression but get token # \"" + tokenizer.getToken() + "\".");
		}
		exp = new Exp(memPool);
		exp.Parse(tokenizer);
		InterpreterUtil.checkTokenAndSkip(";", 12, tokenizer);
	}

	@Override
	public void ContextSensitiveCheck() {
		if(!memPool.exsistVariable(id.getIdName())) {
			throw new RuntimeException("Variable \"" + id.getIdName() + "\"has not been declared.");
		}
		exp.ContextSensitiveCheck();
	}
	
	@Override
	public void prettyPrint(int offset) {
		InterpreterUtil.printSpace(offset);
		System.out.print(id.getIdName() + " = ");
		exp.prettyPrint(0);
		System.out.println(";");
	}
	
	public void execute(Scanner inputData) {
		int value = exp.evaluate();
		id.setIdVal(value);
	}
}
