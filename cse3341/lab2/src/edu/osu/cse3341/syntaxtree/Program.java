package edu.osu.cse3341.syntaxtree;

import java.util.Scanner;

import edu.osu.cse3341.tokenizer.Tokenizer;
import edu.osu.cse3341.util.InterpreterUtil;
import edu.osu.cse3341.util.VariableMemoryPool;
import edu.osu.cse3341.util.VariableMemoryPoolHashMapImpl;

public class Program implements Parsable, PrettyPrintable{
	private VariableMemoryPool memPool = null;
	private DeclSeq declSeq = null;
	private StmtSeq stmtSeq = null;
	
	public Program() {
		memPool = new VariableMemoryPoolHashMapImpl();
	}
	
	@Override
	public void Parse(Tokenizer tokenizer) {
		InterpreterUtil.checkTokenAndSkip("program", 1, tokenizer);
		declSeq = new DeclSeq(memPool);
		declSeq.Parse(tokenizer);
		InterpreterUtil.checkTokenAndSkip("begin", 2, tokenizer);
		stmtSeq = new StmtSeq(memPool);
		stmtSeq.Parse(tokenizer);
		InterpreterUtil.checkTokenAndSkip("end", 3, tokenizer);
	}

	@Override
	public void ContextSensitiveCheck() {
		declSeq.ContextSensitiveCheck();
		stmtSeq.ContextSensitiveCheck();
	}

	@Override
	public void prettyPrint(int offset) {
		InterpreterUtil.printSpace(offset);
		System.out.println("program");
		declSeq.prettyPrint(offset+InterpreterUtil.INDENT_SIZE);
		InterpreterUtil.printSpace(offset);
		System.out.println("begin");
		stmtSeq.prettyPrint(offset+InterpreterUtil.INDENT_SIZE);
		InterpreterUtil.printSpace(offset);
		System.out.println("end");
	}
	
	public void execute(Scanner inputData) {
		stmtSeq.execute(inputData);
	}
}
