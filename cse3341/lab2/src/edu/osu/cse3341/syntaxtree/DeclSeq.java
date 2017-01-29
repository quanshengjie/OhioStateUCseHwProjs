package edu.osu.cse3341.syntaxtree;

import edu.osu.cse3341.tokenizer.Tokenizer;
import edu.osu.cse3341.util.InterpreterUtil;
import edu.osu.cse3341.util.VariableMemoryPool;

public class DeclSeq implements Parsable, PrettyPrintable {
	private VariableMemoryPool memPool = null;
	private Decl decl = null;
	private DeclSeq declSeq = null;
	
	public DeclSeq(final VariableMemoryPool memPool) {
		this.memPool = memPool;
	}
	
	@Override
	public void Parse(Tokenizer tokenizer) {
		InterpreterUtil.checkToken("int", 4, tokenizer);
		decl = new Decl(memPool);
		decl.Parse(tokenizer);
		if(tokenizer.getToken() == 4) {
			declSeq = new DeclSeq(memPool);
			declSeq.Parse(tokenizer);
		}
	}
	
	@Override
	public void ContextSensitiveCheck() {
		decl.ContextSensitiveCheck();
		if(declSeq != null) {
			declSeq.ContextSensitiveCheck();
		}
	}

	@Override
	public void prettyPrint(int offset) {
		decl.prettyPrint(offset);
		if(declSeq != null) {
			declSeq.prettyPrint(offset);
		}
	}
}
