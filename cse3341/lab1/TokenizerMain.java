package edu.osu.cse3341;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;

import edu.osu.cse3341.tokenizer.TokenInfo;
import edu.osu.cse3341.tokenizer.Tokenizer;

public final class TokenizerMain {

	
	
	private TokenizerMain() { }
	
	
	
	public static void main(String[] args) {
		if(args.length != 1) {
			System.err.println("Usage: TokenizerMain <core program filename>");
			return;
		}
		String program = "";		 
		try {
			BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(new File(args[0]))));
			String line = null;
			while ((line = br.readLine()) != null) {
				program += line;
			}
			br.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		Tokenizer tokenizer = new Tokenizer(program);
		int curToken = 0;
		do{
			
			curToken = tokenizer.getToken();
			System.out.println(curToken);
			tokenizer.skipToken();
		} while(curToken != Tokenizer.EOF_NUMBER);
	}

}
