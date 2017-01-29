package edu.osu.cse3341.syntaxtree;

import java.util.Scanner;

import edu.osu.cse3341.tokenizer.Tokenizer;
import edu.osu.cse3341.util.InterpreterUtil;
import edu.osu.cse3341.util.VariableMemoryPool;

public class Loop implements Parsable, PrettyPrintable {
	private VariableMemoryPool memPool = null;
	private Cond cond = null;
	private StmtSeq stmtSeq = null;
	
	public Loop(final VariableMemoryPool memPool) {
		this.memPool = memPool;
	}
	@Override
	public void Parse(Tokenizer tokenizer) {
		InterpreterUtil.checkTokenAndSkip("while", 8, tokenizer);
		if(tokenizer.getToken() != 20 && tokenizer.getToken() != 15 && 
				tokenizer.getToken() != 16) {
			throw new RuntimeException("Expecting a condition but get token # \"" + tokenizer.getToken() + "\".");
		}
		cond = new Cond(memPool);
		cond.Parse(tokenizer);
		InterpreterUtil.checkTokenAndSkip("loop", 9, tokenizer);
		if(tokenizer.getToken() != 32 && tokenizer.getToken() != 5 &&
				tokenizer.getToken() != 8 && tokenizer.getToken() != 10 && tokenizer.getToken() != 11) {
			throw new RuntimeException("Expecting a statment but get token # \"" + tokenizer.getToken() + "\".");
		}
		stmtSeq = new StmtSeq(memPool);
		stmtSeq.Parse(tokenizer);
		InterpreterUtil.checkTokenAndSkip("end", 3, tokenizer);
		InterpreterUtil.checkTokenAndSkip(";", 12, tokenizer);
	}

	@Override
	public void ContextSensitiveCheck() {
		cond.ContextSensitiveCheck();
		stmtSeq.ContextSensitiveCheck();
	}
	
	@Override
	public void prettyPrint(int offset) {
		InterpreterUtil.printSpace(offset);
		System.out.print("while ");
		cond.prettyPrint(0);
		System.out.println(" loop");
		stmtSeq.prettyPrint(offset+InterpreterUtil.INDENT_SIZE);
		InterpreterUtil.printSpace(offset);
		System.out.println("end;");
	}
	
	public void execute(Scanner inputData) {
		boolean condition = cond.evaluate();
		while(condition) {
			stmtSeq.execute(inputData);
			condition = cond.evaluate();
		}
	}
}
