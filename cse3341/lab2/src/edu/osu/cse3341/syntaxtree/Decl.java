package edu.osu.cse3341.syntaxtree;

import edu.osu.cse3341.tokenizer.Tokenizer;
import edu.osu.cse3341.util.InterpreterUtil;
import edu.osu.cse3341.util.VariableMemoryPool;

public class Decl implements Parsable, PrettyPrintable {
	private VariableMemoryPool memPool = null;
	private IdList idList = null;
	
	public Decl(final VariableMemoryPool memPool) {
		this.memPool = memPool;
	}
	@Override
	public void Parse(Tokenizer tokenizer) {
		InterpreterUtil.checkTokenAndSkip("int", 4, tokenizer);
		idList = new IdList(memPool);
		idList.Parse(tokenizer);
		InterpreterUtil.checkTokenAndSkip(";", 12, tokenizer);
	}

	@Override
	public void ContextSensitiveCheck() {
		idList.AllocateIds();
		idList.ContextSensitiveCheck();
	}
	
	@Override
	public void prettyPrint(int offset) {
		InterpreterUtil.printSpace(offset);
		System.out.print("int ");
		idList.prettyPrint(0);
		System.out.println(";");
	}

}
