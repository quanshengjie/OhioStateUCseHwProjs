package edu.osu.cse3341.syntaxtree;

import java.util.Scanner;

import edu.osu.cse3341.tokenizer.Tokenizer;
import edu.osu.cse3341.util.InterpreterUtil;
import edu.osu.cse3341.util.VariableMemoryPool;

public class IdList implements Parsable, PrettyPrintable {
	private VariableMemoryPool memPool = null;
	private Id id = null;
	private IdList idList = null;
	
	public IdList(final VariableMemoryPool memPool) {
		this.memPool = memPool;
	}
	
	@Override
	public void Parse(Tokenizer tokenizer) {
		InterpreterUtil.checkToken("identifier", 32, tokenizer);
		id = new Id(memPool);
		id.Parse(tokenizer);
		if(tokenizer.getToken() == 13) {
			InterpreterUtil.checkTokenAndSkip(",", 13, tokenizer);
			if(tokenizer.getToken() != 32) {
				throw new RuntimeException("Expecting a identifier but get token # \""+ tokenizer.getToken() + "\"");
			}
			idList = new IdList(memPool);
			idList.Parse(tokenizer);
		}
	}

	@Override
	public void ContextSensitiveCheck() {
		if(!memPool.exsistVariable(id.getIdName())) {
			throw new RuntimeException("Variable \"" + id.getIdName() + "\"has not been declared.");
		}
		if(idList != null) {
			idList.ContextSensitiveCheck();
		}
	}
	
	public void AllocateIds() {
		memPool.allocateVariableSpace(id.getIdName());
		if(idList != null) {
			idList.AllocateIds();
		}
	}

	@Override
	public void prettyPrint(int offset) {
		InterpreterUtil.printSpace(offset);
		id.prettyPrint(0);
		if(idList != null) {
			System.out.print(", ");
			idList.prettyPrint(0);
		}
	}
	
	public void readInIds(Scanner inputData) {
		int val = inputData.nextInt();
		id.setIdVal(val);
		if(idList != null) {
			idList.readInIds(inputData);
		}
	}
	
	public void writeOutIds() {
		System.out.println(id.getIdName() + " = " + id.getIdVal());
		if(idList != null) {
			idList.writeOutIds();
		}
	}
}
