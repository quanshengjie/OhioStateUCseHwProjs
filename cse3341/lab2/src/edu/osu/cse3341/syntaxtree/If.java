package edu.osu.cse3341.syntaxtree;

import java.util.Scanner;

import edu.osu.cse3341.tokenizer.Tokenizer;
import edu.osu.cse3341.util.InterpreterUtil;
import edu.osu.cse3341.util.VariableMemoryPool;

public class If implements Parsable, PrettyPrintable {
	private VariableMemoryPool memPool = null;
	private Cond cond = null;
	private StmtSeq stmtSeq1 = null;
	private StmtSeq stmtSeq2 = null;
	
	public If(final VariableMemoryPool memPool) {
		this.memPool = memPool;
	}
	@Override
	public void Parse(Tokenizer tokenizer) {
		InterpreterUtil.checkTokenAndSkip("if", 5, tokenizer);
		if(tokenizer.getToken() != 20 && tokenizer.getToken() != 15 && 
				tokenizer.getToken() != 16) {
			throw new RuntimeException("Expecting a condition but get token # \"" + tokenizer.getToken() + "\".");
		}
		cond = new Cond(memPool);
		cond.Parse(tokenizer);
		InterpreterUtil.checkTokenAndSkip("then", 6, tokenizer);
		if(tokenizer.getToken() != 32 && tokenizer.getToken() != 5 &&
				tokenizer.getToken() != 8 && tokenizer.getToken() != 10 && tokenizer.getToken() != 11) {
			throw new RuntimeException("Expecting a statment but get token # \"" + tokenizer.getToken() + "\".");
		}
		stmtSeq1 = new StmtSeq(memPool);
		stmtSeq1.Parse(tokenizer);
		if(tokenizer.getToken() == 3) {
			InterpreterUtil.checkTokenAndSkip("end", 3, tokenizer);
			InterpreterUtil.checkTokenAndSkip(";", 12, tokenizer);
		} else if(tokenizer.getToken() == 7) {
			InterpreterUtil.checkTokenAndSkip("else", 7, tokenizer);
			stmtSeq2 = new StmtSeq(memPool);
			stmtSeq2.Parse(tokenizer);
			InterpreterUtil.checkTokenAndSkip("end", 3, tokenizer);
			InterpreterUtil.checkTokenAndSkip(";", 12, tokenizer);
		} else {
			throw new RuntimeException("Expecting a else or end but get token # \"" + tokenizer.getToken() + "\".");
		}
	}

	@Override
	public void ContextSensitiveCheck() {
		cond.ContextSensitiveCheck();
		stmtSeq1.ContextSensitiveCheck();
		if(stmtSeq2 != null) {
			stmtSeq2.ContextSensitiveCheck();
		}
	}
	
	@Override
	public void prettyPrint(int offset) {
		InterpreterUtil.printSpace(offset);
		System.out.print("if ");
		cond.prettyPrint(0);
		System.out.println(" then");
		stmtSeq1.prettyPrint(offset+InterpreterUtil.INDENT_SIZE);
		if(stmtSeq2 != null) {
			InterpreterUtil.printSpace(offset);
			System.out.println("else");
			stmtSeq2.prettyPrint(offset+InterpreterUtil.INDENT_SIZE);
		}
		InterpreterUtil.printSpace(offset);
		System.out.println("end;");
	}
	
	public void execute(Scanner inputData) {
		boolean condition = cond.evaluate();
		if(condition) {
			stmtSeq1.execute(inputData);
		} else {
			if(stmtSeq2 != null) {
				stmtSeq2.execute(inputData);
			}
		}
	}
}
