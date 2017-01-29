package edu.osu.cse3341.syntaxtree;

import edu.osu.cse3341.tokenizer.Tokenizer;
import edu.osu.cse3341.util.InterpreterUtil;
import edu.osu.cse3341.util.VariableMemoryPool;

public class Fac implements Parsable, PrettyPrintable {
	private VariableMemoryPool memPool = null;
	private Op op = null;
	private Fac fac = null;
	
	public Fac(final VariableMemoryPool memPool) {
		this.memPool = memPool;
	}
	@Override
	public void Parse(Tokenizer tokenizer) {
		if(tokenizer.getToken() != 32 && tokenizer.getToken() != 31 && 
				tokenizer.getToken() != 20) {
			throw new RuntimeException("Expecting a factor but get token # \"" + tokenizer.getToken() + "\".");
		}
		op = new Op(memPool);
		op.Parse(tokenizer);
		if(tokenizer.getToken() == 24) {
			InterpreterUtil.checkTokenAndSkip("*", 24, tokenizer);
			if(tokenizer.getToken() != 32 && tokenizer.getToken() != 31 && 
					tokenizer.getToken() != 20) {
				throw new RuntimeException("Expecting a factor but get token # \"" + tokenizer.getToken() + "\".");
			}
			fac = new Fac(memPool);
			fac.Parse(tokenizer);
		}
	}

	@Override
	public void ContextSensitiveCheck() {
		op.ContextSensitiveCheck();
		if(fac != null) {
			fac.ContextSensitiveCheck();
		}
	}
	
	@Override
	public void prettyPrint(int offset) {
		op.prettyPrint(offset);
		if(fac != null) {
			System.out.print(" * ");
			fac.prettyPrint(0);
		}
	}
	
	public int evaluate() {
		int ret = op.evaluate();
		if(fac != null) {
			ret *= fac.evaluate();
		}
		return ret;
	}
}
