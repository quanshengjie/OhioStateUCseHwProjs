package edu.osu.cse3341.syntaxtree;

import java.util.Scanner;

import edu.osu.cse3341.tokenizer.Tokenizer;
import edu.osu.cse3341.util.VariableMemoryPool;

public class Stmt implements Parsable, PrettyPrintable {
	private VariableMemoryPool memPool = null;
	private Assign assign = null;
	private If ifStmt = null;
	private Loop loop = null;
	private In in = null;
	private Out out = null;
	private enum TYPE {
		ASSIGN,
		IF,
		LOOP,
		IN,
		OUT
	};
	private TYPE type;
	
	public Stmt(final VariableMemoryPool memPool) {
		this.memPool = memPool;
	}
	
	@Override
	public void Parse(Tokenizer tokenizer) {
		int curtoken = tokenizer.getToken();
		if(curtoken == 5) {
			type = TYPE.IF;
			ifStmt = new If(memPool);
			ifStmt.Parse(tokenizer);
		} else if(curtoken == 8) {
			type = TYPE.LOOP;
			loop = new Loop(memPool);
			loop.Parse(tokenizer);
		} else if(curtoken == 10) {
			type = TYPE.IN;
			in = new In(memPool);
			in.Parse(tokenizer);
		} else if(curtoken == 11) {
			type = TYPE.OUT;
			out = new Out(memPool);
			out.Parse(tokenizer);
		} else if(curtoken == 32) {
			type = TYPE.ASSIGN;
			assign = new Assign(memPool);
			assign.Parse(tokenizer);
		} else {
			throw new RuntimeException("Expecting a statment but get token # \"" + tokenizer.getToken() + "\".");
		}
	}

	@Override
	public void ContextSensitiveCheck() {
		switch(type) {
			case ASSIGN:
			{
				assign.ContextSensitiveCheck();
				break;
			}
			case IF:
			{
				ifStmt.ContextSensitiveCheck();
				break;
			}
			case LOOP:
			{
				loop.ContextSensitiveCheck();
				break;
			}
			case IN:
			{
				in.ContextSensitiveCheck();
				break;
			}
			case OUT:
			{
				out.ContextSensitiveCheck();
				break;
			}
			default:
			{
				throw new RuntimeException("The statment is not of the type expected.");
			}
		}
	}
	
	@Override
	public void prettyPrint(int offset) {
		switch(type) {
			case ASSIGN:
			{
				assign.prettyPrint(offset);
				break;
			}
			case IF:
			{
				ifStmt.prettyPrint(offset);
				break;
			}
			case LOOP:
			{
				loop.prettyPrint(offset);
				break;
			}
			case IN:
			{
				in.prettyPrint(offset);
				break;
			}
			case OUT:
			{
				out.prettyPrint(offset);
				break;
			}
			default:
			{
				throw new RuntimeException("The statment is not of the type expected.");
			}
		}
	}
	
	public void execute(Scanner inputData) {
		switch(type) {
			case ASSIGN:
			{
				assign.execute(inputData);
				break;
			}
			case IF:
			{
				ifStmt.execute(inputData);
				break;
			}
			case LOOP:
			{
				loop.execute(inputData);
				break;
			}
			case IN:
			{
				in.execute(inputData);
				break;
			}
			case OUT:
			{
				out.execute(inputData);
				break;
			}
			default:
			{
				throw new RuntimeException("The statment is not of the type expected.");
			}
		}
	}
}
