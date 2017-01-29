package edu.osu.cse3341.syntaxtree;

import java.util.Scanner;

import edu.osu.cse3341.tokenizer.Tokenizer;
import edu.osu.cse3341.util.InterpreterUtil;
import edu.osu.cse3341.util.VariableMemoryPool;

public class In implements Parsable, PrettyPrintable {
	private VariableMemoryPool memPool = null;
	private IdList idList = null;
	
	public In(final VariableMemoryPool memPool) {
		this.memPool = memPool;
	}
	@Override
	public void Parse(Tokenizer tokenizer) {
		InterpreterUtil.checkTokenAndSkip("read", 10, tokenizer);
		InterpreterUtil.checkToken("identifier", 32, tokenizer);
		idList = new IdList(memPool);
		idList.Parse(tokenizer);
		InterpreterUtil.checkTokenAndSkip(";", 12, tokenizer);
	}

	@Override
	public void ContextSensitiveCheck() {
		idList.ContextSensitiveCheck();
	}
	
	@Override
	public void prettyPrint(int offset) {
		InterpreterUtil.printSpace(offset);
		System.out.print("read ");
		idList.prettyPrint(0);
		System.out.println(";");
	}
	
	public void execute(Scanner inputData) {
		idList.readInIds(inputData);
	}
}
