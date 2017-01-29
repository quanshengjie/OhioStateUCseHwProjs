package edu.osu.cse3341.syntaxtree;

import java.util.Scanner;

import edu.osu.cse3341.tokenizer.Tokenizer;
import edu.osu.cse3341.util.InterpreterUtil;
import edu.osu.cse3341.util.VariableMemoryPool;

public class Out implements Parsable, PrettyPrintable {
	private VariableMemoryPool memPool = null;
	private IdList idList = null;
	
	public Out(final VariableMemoryPool memPool) {
		this.memPool = memPool;
	}
	@Override
	public void Parse(Tokenizer tokenizer) {
		InterpreterUtil.checkTokenAndSkip("write", 11, tokenizer);
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
		System.out.print("write ");
		idList.prettyPrint(0);
		System.out.println(";");
	}
	
	public void execute(Scanner inputData) {
		idList.writeOutIds();
	}
}
