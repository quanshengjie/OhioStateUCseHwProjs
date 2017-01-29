package edu.osu.cse3341;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.InputMismatchException;
import java.util.NoSuchElementException;
import java.util.Scanner;

import edu.osu.cse3341.syntaxtree.Program;
import edu.osu.cse3341.tokenizer.Tokenizer;
import edu.osu.cse3341.util.InterpreterUtil;

public final class Interpreter {
	
	private Interpreter() { }
	
	public static void main(String[] args) {
		if(args.length != 2) {
			System.err.println("Usage: Interpreter <core program filename> <input data>");
			return;
		}
		String program = "";
		
		try {
			BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(new File(args[0]))));
			String line = null;
			while ((line = br.readLine()) != null) {
				program += line + "\n";
			}
			br.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		Tokenizer tokenizer = new Tokenizer(program);
		Program prog = new Program();
		prog.Parse(tokenizer);
		prog.ContextSensitiveCheck();
		System.out.println("******************* Now Print the Porgram *******************");
		System.out.println();
		prog.prettyPrint(0);
		InterpreterUtil.checkTokenAndSkip("EOF", 33, tokenizer);
		System.out.println("******************* Now Excute the Porgram *******************");
		System.out.println();
		File file = new File(args[1]);
		Scanner sc;
		try {
			sc = new Scanner(file);
			prog.execute(sc);
			sc.close();
		} catch (FileNotFoundException e) {
			System.err.println("Error: Input data stream not found.");
			e.printStackTrace();
		} catch (InputMismatchException e) {
			System.err.println("Error: Input data stream contain non-integers");
			e.printStackTrace();
		} catch (NoSuchElementException e) {
			System.err.println("Error: Reading from empty input data stream.");
			e.printStackTrace();
		}
	}
}
