package edu.osu.cse3341.util;

import edu.osu.cse3341.tokenizer.Tokenizer;

public final class InterpreterUtil {
	public static final int INDENT_SIZE = 4;
	
	public static void printSpace(int count) {
		for(int i=0; i<count; i++) {
			System.out.print(" ");
		}
	}
	
	public static void checkTokenAndSkip(String expStr, int expNum, Tokenizer tokenizer) {
		checkToken(expStr, expNum, tokenizer);
		tokenizer.skipToken();
	}
	
	public static void checkToken(String expStr, int expNum, Tokenizer tokenizer) {
		int curToken = tokenizer.getToken();
		if(curToken != expNum) {
			throw new RuntimeException("Expecting \"" + expStr + "\" but get token # \"" + curToken + "\".");
		}
	}
}
