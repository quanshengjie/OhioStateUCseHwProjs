package edu.QSJ.LogReg;

import java.util.ArrayList;
import java.util.List;

public class VectorN
{
	private List<Float> coordinates;
	private int dimenstion;
	
	public VectorN(List<Float> coo)
	{
		this.dimenstion = coo.size();
		if(coo instanceof ArrayList)
		{
			this.coordinates = coo;
		}
		else
		{
			this.coordinates = new ArrayList<>(coo);
		}
	}
	
	public int D()
	{
		return this.dimenstion;
	}
	
	public List<Float> getCoor()
	{
		return this.coordinates;
	}
	
	public static Float Dot(VectorN a, VectorN b)
	{
		Float result = 0F;
		if(a.dimenstion != b.dimenstion)
		{
			throw new IllegalArgumentException("a, b must have same dimension");
		}
		for(int i=0; i<a.coordinates.size(); i++)
		{
			result += a.coordinates.get(i) * b.coordinates.get(i);
		}
		return result;
	}
	
	/**
	 * @param a
	 * @param scalar
	 * a = scalar * a
	 */
	public static void Scale(VectorN a, Float scalar)
	{
		for(int i=0; i<a.coordinates.size(); i++)
		{
			Float result = a.coordinates.get(i) * scalar;
			a.coordinates.set(i, result);
		}
	}
	
	/**
	 * @param a
	 * @param b
	 * @param scalar
	 * a = a + scalar * b
	 */
	public static void ScaleCombine(VectorN a, VectorN b, Float scalar)
	{
		for(int i=0; i<a.coordinates.size(); i++)
		{
			Float result = a.coordinates.get(i) + scalar * b.coordinates.get(i);
			a.coordinates.set(i, result);
		}
	}
	
	public VectorN clone()
	{
		VectorN cloned= new VectorN(this.coordinates);
		return cloned;
	}
}
