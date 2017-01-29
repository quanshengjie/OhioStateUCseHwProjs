package edu.osu.cse3341.tokenizer;

import java.util.regex.Pattern;

public class TokenInfo {
	private Pattern regex;
	private String regexStr;

	public TokenInfo(String token, boolean escaped) {
		if(!escaped) {
			this.regexStr = Pattern.quote(token);
		} else {
			this.regexStr = token;
		}
		this.regex = Pattern.compile("^(" + this.regexStr + "){1}");
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((regex == null) ? 0 : regex.hashCode());
		result = prime * result
				+ ((regexStr == null) ? 0 : regexStr.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TokenInfo other = (TokenInfo) obj;
		if (regexStr == null) {
			if (other.regexStr != null)
				return false;
		} else if (!regexStr.equals(other.regexStr))
			return false;
		return true;
	}

	public Pattern getRegex() {
		return regex;
	}
}
