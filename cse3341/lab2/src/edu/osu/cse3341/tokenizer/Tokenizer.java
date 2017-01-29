package edu.osu.cse3341.tokenizer;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.regex.Matcher;

public class Tokenizer {
	public static final Integer EOF_NUMBER = 33;
	private ArrayList<TokenInfo> reservedWords = new ArrayList<TokenInfo>();
	private ArrayList<TokenInfo> specialSymbols = new ArrayList<TokenInfo>();
	private ArrayList<TokenInfo> integers = new ArrayList<TokenInfo>();
	private ArrayList<TokenInfo> identifiers = new ArrayList<TokenInfo>();
	private HashMap<TokenInfo, Integer> wordsToNumMap = new HashMap<TokenInfo, Integer>();
	private String program;
	private boolean isPreviousTokenSpecialSymbols = true;
	private boolean isPreviousTokenFollowBySpace = false;
	private int curTokenNumber;
	private String curTokenStr;
	
	public Tokenizer(String program) {
		initTokens();
		this.program = program.trim();
		removeAndCacheHeadToken();
	}
	
	public int getToken()  throws RuntimeException {
		assert this.program != null : "Already pass the end of the program!";
		return curTokenNumber;
	}
	
	public int skipToken()  throws RuntimeException {
		assert this.program != null : "Already pass the end of the program!";
		if(curTokenNumber == EOF_NUMBER) {
			this.program = null;
		} else {
			removeAndCacheHeadToken();
		}
		return curTokenNumber;
	}
	
	public int intVal() {
		assert curTokenNumber == 31 : "The current token is not an integer!";
		return Integer.parseInt(curTokenStr);
	}
	
	public String idName() {
		assert curTokenNumber == 32 : "The current token is not a identifier!";
		return curTokenStr;
	}
	
	private void removeAndCacheHeadToken() throws RuntimeException {
		if(this.program.equals("")) {
			curTokenNumber = EOF_NUMBER;
			curTokenStr = "EOF";
		} else {
			TokenInfo info = null;
			info = retriveHeadTokenInfoIfValid();
			Matcher matcher = info.getRegex().matcher(this.program);
			if(matcher.find()) {
				curTokenNumber = wordsToNumMap.get(info);
				curTokenStr = matcher.group();
				this.program = matcher.replaceFirst("").trim();
			} else {
				throw new RuntimeException("Tokenizer cannot read the next token.");
			}
		}
	}
	
	private TokenInfo retriveHeadTokenInfoIfValid() {
		TokenInfo info = null;
		boolean found = false;
		int followingCharStart = 0;
		String head = program.split("\\s", 2)[0];
		for(int i=0; i<reservedWords.size() && !found; i++) {
			info = reservedWords.get(i);
			Matcher matcher = info.getRegex().matcher(this.program);
			if(matcher.find()) {
				if(!isPreviousTokenSpecialSymbols && !isPreviousTokenFollowBySpace) {
					throw new RuntimeException("\"" + curTokenStr + head + "\" is not a valid token");
				}
				followingCharStart = matcher.end();
				found = true;
				isPreviousTokenSpecialSymbols = false;
			}
		}
		for(int i=0; i<integers.size() && !found; i++) {
			info = integers.get(i);
			Matcher matcher = info.getRegex().matcher(this.program);
			if(matcher.find()) {
				if(!isPreviousTokenSpecialSymbols && !isPreviousTokenFollowBySpace) {
					throw new RuntimeException("\"" + curTokenStr + head + "\" is not a valid token");
				}
				followingCharStart = matcher.end();
				found = true;
				isPreviousTokenSpecialSymbols = false;
			}
		}
		for(int i=0; i<identifiers.size() && !found; i++) {
			info = identifiers.get(i);
			Matcher matcher = info.getRegex().matcher(this.program);
			if(matcher.find()) {
				if(!isPreviousTokenSpecialSymbols && !isPreviousTokenFollowBySpace) {
					throw new RuntimeException("\"" + curTokenStr + head + "\" is not a valid token");
				}
				followingCharStart = matcher.end();
				found = true;
				isPreviousTokenSpecialSymbols = false;
			}
		}
		for(int i=0; i<specialSymbols.size() && !found; i++) {
			info = specialSymbols.get(i);
			Matcher matcher = info.getRegex().matcher(this.program);
			if(matcher.find()) {
				followingCharStart = matcher.end();
				found = true;
				isPreviousTokenSpecialSymbols = true;
			}
		}
		if(!found) {
			throw new RuntimeException("\"" + head + "\" is not a valid token");
		}
		if(followingCharStart < program.length() && 
		   program.substring(followingCharStart, followingCharStart+1).matches("\\s")) {
			isPreviousTokenFollowBySpace = true;
		}
		return info;
	}
	
	private void addAToken(String token, int number, boolean escaped, ArrayList<TokenInfo> type) {
		TokenInfo tokenInfo = new TokenInfo(token, escaped);
		type.add(tokenInfo);
		wordsToNumMap.put(tokenInfo, number);
	}
	
	private void initTokens() {
		// Reserved words
		addAToken("program", 1, false, reservedWords);
		addAToken("begin", 2, false, reservedWords);
		addAToken("end", 3, false, reservedWords);
		addAToken("int", 4, false, reservedWords);
		addAToken("if", 5, false, reservedWords);
		addAToken("then", 6, false, reservedWords);
		addAToken("else", 7, false, reservedWords);
		addAToken("while", 8, false, reservedWords);
		addAToken("loop", 9, false, reservedWords);
		addAToken("read", 10, false, reservedWords);
		addAToken("write", 11, false, reservedWords);
		
		// Special symbols
		addAToken("!=", 25, false, specialSymbols);
		addAToken("==", 26, false, specialSymbols);
		addAToken("<=", 29, false, specialSymbols);
		addAToken(">=", 30, false, specialSymbols);
		addAToken(";", 12, false, specialSymbols);
		addAToken(",", 13, false, specialSymbols);
		addAToken("=", 14, false, specialSymbols);
		addAToken("!", 15, false, specialSymbols);
		addAToken("[", 16, false, specialSymbols);
		addAToken("]", 17, false, specialSymbols);
		addAToken("&&", 18, false, specialSymbols);
		addAToken("||", 19, false, specialSymbols);
		addAToken("(", 20, false, specialSymbols);
		addAToken(")", 21, false, specialSymbols);
		addAToken("+", 22, false, specialSymbols);
		addAToken("-", 23, false, specialSymbols);
		addAToken("*", 24, false, specialSymbols);
		addAToken("<", 27, false, specialSymbols);
		addAToken(">", 28, false, specialSymbols);
		
		// Integers
		addAToken("[0-9]+", 31, true, integers);
		
		// Identifiers
		addAToken("[A-Z]+[0-9]*", 32, true, identifiers);
	}
}
