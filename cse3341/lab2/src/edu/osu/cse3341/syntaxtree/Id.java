package edu.osu.cse3341.syntaxtree;

import edu.osu.cse3341.tokenizer.Tokenizer;
import edu.osu.cse3341.util.InterpreterUtil;
import edu.osu.cse3341.util.VariableMemoryPool;

public class Id implements Parsable, PrettyPrintable {
	private VariableMemoryPool memPool = null;
	private String IdName = null;
	
	
	public Id(final VariableMemoryPool memPool) {
		this.memPool = memPool;
	}

	@Override
	public void Parse(Tokenizer tokenizer) {
		InterpreterUtil.checkToken("identifier", 32, tokenizer);
		IdName = tokenizer.idName();
		tokenizer.skipToken();
	}

	@Override
	public void ContextSensitiveCheck() {
		
	}
	
	@Override
	public void prettyPrint(int offset) {
		InterpreterUtil.printSpace(offset);
		System.out.print(IdName);
	}
	
	public String getIdName() {
		return IdName;
	}
	
	public int getIdVal() {
		return memPool.getVariableValue(IdName);
	}
	
	public void setIdVal(int value) {
		memPool.setVariableValue(IdName, value);
	}
}
