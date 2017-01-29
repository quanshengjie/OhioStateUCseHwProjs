package edu.osu.cse3341.util;

public interface VariableMemoryPool {
	void allocateVariableSpace(String identifier) throws RuntimeException;
	boolean exsistVariable(String identifier) throws RuntimeException;
	Integer setVariableValue(String identifier, Integer value) throws RuntimeException;
	Integer getVariableValue(String identifier) throws RuntimeException;
}
