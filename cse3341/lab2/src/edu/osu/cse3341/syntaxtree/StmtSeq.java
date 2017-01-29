package edu.osu.cse3341.syntaxtree;

import java.util.Scanner;

import edu.osu.cse3341.tokenizer.Tokenizer;
import edu.osu.cse3341.util.InterpreterUtil;
import edu.osu.cse3341.util.VariableMemoryPool;

public class StmtSeq implements Parsable, PrettyPrintable {
	private VariableMemoryPool memPool = null;
	private Stmt stmt = null;
	private StmtSeq stmtSeq = null;
	
	public StmtSeq(final VariableMemoryPool memPool) {
		this.memPool = memPool;
	}
	
	@Override
	public void Parse(Tokenizer tokenizer) {
		if(tokenizer.getToken() != 32 && tokenizer.getToken() != 5 &&
				tokenizer.getToken() != 8 && tokenizer.getToken() != 10 && tokenizer.getToken() != 11) {
			throw new RuntimeException("Expecting a statment but get token # \"" + tokenizer.getToken() + "\".");
		}
		stmt = new Stmt(memPool);
		stmt.Parse(tokenizer);
		if(tokenizer.getToken() == 32 || tokenizer.getToken() == 5 ||
				tokenizer.getToken() == 8 || tokenizer.getToken() == 10 || tokenizer.getToken() == 11) {
			stmtSeq = new StmtSeq(memPool);
			stmtSeq.Parse(tokenizer);
		}
	}

	@Override
	public void ContextSensitiveCheck() {
		stmt.ContextSensitiveCheck();
		if(stmtSeq != null) {
			stmtSeq.ContextSensitiveCheck();
		}
	}

	@Override
	public void prettyPrint(int offset) {
		stmt.prettyPrint(offset);
		if(stmtSeq != null) {
			stmtSeq.prettyPrint(offset);
		}
	}
	
	public void execute(Scanner inputData) {
		stmt.execute(inputData);
		if(stmtSeq != null) {
			stmtSeq.execute(inputData);
		}
	}
}
