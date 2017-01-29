package edu.osu.cse3341.util;

import java.util.HashMap;

public class VariableMemoryPoolHashMapImpl implements VariableMemoryPool {
	private HashMap<String, Integer> memPool = null;
	
	public VariableMemoryPoolHashMapImpl() {
		memPool = new HashMap<>();
	}

	@Override
	public void allocateVariableSpace(String identifier) throws RuntimeException {
		if(exsistVariable(identifier)) {
			throw new RuntimeException("Variable \"" + identifier + "\" already exsit.");
		}
		memPool.put(identifier, null);
	}

	@Override
	public boolean exsistVariable(String identifier) throws RuntimeException {
		if(memPool == null) {
			throw new RuntimeException("Variable Memory Pool not initialized.");
		}
		return memPool.containsKey(identifier);
	}

	@Override
	public Integer setVariableValue(String identifier, Integer value) {
		if(!exsistVariable(identifier)) {
			throw new RuntimeException("Variable \"" + identifier + "\"has not been declared.");
		}
		if(value == null) {
			throw new RuntimeException(value + " is not a legal value for variable \"" + identifier + "\".");
		}
		return memPool.put(identifier, value);
	}

	@Override
	public Integer getVariableValue(String identifier) {
		if(!exsistVariable(identifier)) {
			throw new RuntimeException("Variable \"" + identifier + "\"has not been declared.");
		}
		Integer value = memPool.get(identifier);
		if(value == null) {
			throw new RuntimeException("Variable \"" + identifier + "\"has not been initialized.");
		}
		return value;
	}
}
