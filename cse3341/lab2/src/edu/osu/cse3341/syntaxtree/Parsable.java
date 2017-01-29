package edu.osu.cse3341.syntaxtree;

import edu.osu.cse3341.tokenizer.Tokenizer;

public interface Parsable {
	void Parse(Tokenizer tokenizer);
	void ContextSensitiveCheck();
}
