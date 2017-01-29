package edu.QSJ.LogReg;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public final class TestLogReg {

	private static List<VectorN> feature = new ArrayList<>();
	
	public static void main(String[] args) throws IOException {
		if(args.length != 4)
        {
        	throw new IllegalArgumentException("Wrong number of argument.");
        }

        int D;
        try
        {
        	D = Integer.parseInt(args[3]);
        }
        catch (Exception e)
        {
        	System.out.println("Dimension parameter is wrong");
        	e.printStackTrace();
        	return;
        }
        
        String modelFilename = args[0];
        String featureFilename = args[1];
        String predLabelFilename = args[2];
        
        List<Float> modelRaw = new ArrayList<>(D);
        VectorN w;
        System.out.println("Reading model file: " + modelFilename + "......");
        Scanner scanner = new Scanner(new File(modelFilename));
        for(int i=0; i<D; i++)
        {
        	if(scanner.hasNextFloat())
    		{
        		Float modelCoo = (float)scanner.nextFloat();
        		modelRaw.add(modelCoo);
    		}
    		else
    		{
    			scanner.close();
    			throw new FileNotFoundException("Model file is correpted.");
    		}
        }
        scanner.close();
        w = new VectorN(modelRaw);
        
        System.out.println("Reading feature file: " + featureFilename + "......");
        scanner = new Scanner(new File(featureFilename));
        int i = 0;
        while(scanner.hasNextInt())
        {
        	List<Float> sample = new ArrayList<>();
        	for(int j=0; j<D; j++)
        	{
        		if(scanner.hasNextInt())
        		{
        			Float pixel = (float) scanner.nextInt();
        	        sample.add(pixel);
        		}
        		else
        		{
        			scanner.close();
        			throw new FileNotFoundException("Feature file is correpted.");
        		}
        	}
        	feature.add(new VectorN(sample));
        	
        	if(i % 128 == 0)
        	{
        		System.out.println("Reading feature file: " + featureFilename + " " + i + " features read.");
        	}
        	i++;
        }
        scanner.close();
        
        System.out.println("Predicting......");
        List<Integer> prediction = new ArrayList<>(feature.size());
        i = 0;
        for(VectorN vec : feature)
        {
        	float score = VectorN.Dot(w, vec);
        	if(score > 0)
        	{
        		prediction.add(1);
        	}
        	else
        	{
        		prediction.add(0);
        	}
        	if(i % 128 == 0)
        	{
        		System.out.println("Predicting......" + i + " predicted.");
        	}
        	i++;
        }
        
        System.out.println("Writing to file: " + predLabelFilename + "......");
        Writer wr = new FileWriter(predLabelFilename);
        for(Integer pre : prediction)
        {
        	wr.write(pre + "\n");
        }
        wr.close(); 
        System.out.println("Writing to file: " + predLabelFilename + " done.");
	}

}
