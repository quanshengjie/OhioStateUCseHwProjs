package edu.osu.cse3341.syntaxtree;

import edu.osu.cse3341.tokenizer.Tokenizer;
import edu.osu.cse3341.util.InterpreterUtil;
import edu.osu.cse3341.util.VariableMemoryPool;

public class Exp implements Parsable, PrettyPrintable {
	private VariableMemoryPool memPool = null;
	private Fac fac = null;
	private Exp exp = null;
	private enum SIGN {
		PLUS,
		MINUS
	};
	private SIGN sign;
	
	public Exp(final VariableMemoryPool memPool) {
		this.memPool = memPool;
	}
	@Override
	public void Parse(Tokenizer tokenizer) {
		if(tokenizer.getToken() != 32 && tokenizer.getToken() != 31 && 
				tokenizer.getToken() != 20) {
			throw new RuntimeException("Expecting a expression but get token # \"" + tokenizer.getToken() + "\".");
		}
		fac = new Fac(memPool);
		fac.Parse(tokenizer);
		if(tokenizer.getToken() == 22) {
			InterpreterUtil.checkTokenAndSkip("+", 22, tokenizer);
			exp = new Exp(memPool);
			sign = SIGN.PLUS;
			exp.Parse(tokenizer);
		} else if(tokenizer.getToken() == 23) {
			InterpreterUtil.checkTokenAndSkip("-", 23, tokenizer);
			exp = new Exp(memPool);
			sign = SIGN.MINUS;
			exp.Parse(tokenizer);
		}
	}

	@Override
	public void ContextSensitiveCheck() {
		fac.ContextSensitiveCheck();
		if(exp != null) {
			exp.ContextSensitiveCheck();
		}
	}
	
	@Override
	public void prettyPrint(int offset) {
		fac.prettyPrint(offset);
		if(exp != null) {
			if(sign == SIGN.PLUS) {
				System.out.print(" + ");
			} else if(sign == SIGN.MINUS) {
				System.out.print(" - ");
			} else {
				throw new RuntimeException("The sign in the expression is not within expected range.");
			}
			exp.prettyPrint(0);
		}
	}
	
	public int evaluate() {
		int ret = fac.evaluate();
		if(exp != null) {
			if(sign == SIGN.PLUS) {
				ret += exp.evaluate();
			} else if(sign == SIGN.MINUS) {
				ret -= exp.evaluate();
			} else {
				throw new RuntimeException("The sign in the expression is not within expected range.");
			}
		}
		return ret;
	}
}
