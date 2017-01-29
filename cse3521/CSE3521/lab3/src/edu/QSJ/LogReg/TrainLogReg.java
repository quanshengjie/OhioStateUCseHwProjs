package edu.QSJ.LogReg;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.concurrent.atomic.AtomicInteger;

public final class TrainLogReg {

	private static List<VectorN> sampleX;
	private static List<Float> labelY;
	private static AtomicInteger parallelFinishedCount = new AtomicInteger(0);
	private static List<VectorN> parallelWPool;
	
    private TrainLogReg() {
    }
    
    private static VectorN generateZero()
    {
    	if(sampleX.size() <= 0)
    	{
    		throw new IllegalArgumentException("SampleX has not been inited yet.");
    	}
    	int D = sampleX.get(0).D();
    	List<Float> zero = new ArrayList<>(D);
    	for(int i=0; i<D; i++)
    	{
    		zero.add(0.0F);
    	}
    	return new VectorN(zero);
    }
    
    private static class SDGRoutine extends Thread
    {
    	private Thread t;
    	private int low;
    	private int high;
    	private int Niter;
    	private int myId;
    	SDGRoutine(int low, int high, int Niter, int id)
    	{
    		this.low = low;
    		this.high = high;
    		this.Niter = Niter;
    		this.myId = id;
    	}
    	
    	public void run()
    	{
    		Float c = 1E-6F;
        	int t = 0;
        	VectorN w = generateZero();
        	for(int iteration = 0; iteration < Niter; iteration++)
        	{
        		for(int i=low; i<high; i++)
            	{
            		t++;
            		Float wx;
            		VectorN dL;
            		synchronized(sampleX)
                	{
            			VectorN sample = sampleX.get(i);
            			wx = (float) VectorN.Dot(w, sample);
            			dL = sample.clone();
                	}
            		Float y;
            		synchronized(labelY)
                	{
            			y = labelY.get(i);
                	}
            		Float factor = (float) (-y * Math.exp(-y*wx) / (1 + Math.exp(-y*wx)));
            		
            		VectorN.Scale(dL, factor);
            		VectorN.ScaleCombine(w, dL, -c/(float)t);
            		
            		parallelFinishedCount.incrementAndGet();
            	}
        	}
        	synchronized(parallelWPool)
        	{
        		parallelWPool.set(this.myId, w);
        	}
    	}
    	
    	public void start ()
    	{
			if (t == null)
			{
				t = new Thread (this);
				t.start ();
			}
    	}
    }
    
    private static VectorN ParallelSGD(int Niter)
    {
    	System.out.println("Staring the Parallel SGD Implementation");
    	long start = System.nanoTime();
    	int processors = Runtime.getRuntime().availableProcessors();
    	parallelWPool = new ArrayList<>(processors);
    	for(int i=0; i<processors; i++)
    	{
    		parallelWPool.add(generateZero());
    	}
    	VectorN parallelW = generateZero();
    	Thread threadPool[] = new Thread[processors];
    	int N = sampleX.size();
    	int partition = N / processors;
    	for(int i=0; i<processors; i++)
    	{
    		Thread thread;
    		if(i != processors-1)
    		{
    			thread = new SDGRoutine(i * partition, (i+1) * partition, Niter, i);
    		}
    		else
    		{
    			thread = new SDGRoutine(i * partition, N, Niter, i);
    		}
    		threadPool[i] = thread;
    	}
    	for(int i=0; i<processors; i++)
    	{
    		threadPool[i].start();
    		
    	}
    	
    	long lastEndTime = start;
    	do
    	{
    		for(int i=0; i<processors; i++)
    		{
    			try {
    				threadPool[i].join(500);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
    		}
    		int thisTimeFinished = parallelFinishedCount.get();
    		int total = N*Niter;
    		long end = System.nanoTime();
    		if(end - lastEndTime > 500000000)
    		{
    			lastEndTime = end;
    			double rate = (double)(thisTimeFinished) / ((end - start) / 1000000000.0);
    			System.out.println("Finished: " + (thisTimeFinished) + " Remain " + (N*Niter - thisTimeFinished) + " Rate " + (int)rate + " samples/sec" +
    								" Remaining time " + (int)((N*Niter - thisTimeFinished) / rate) + " sec");
    		}
    	}while(parallelFinishedCount.get() < N*Niter);
    	long end = System.nanoTime();
    	int thisTimeFinished = parallelFinishedCount.get();
		double rate = (double)(thisTimeFinished) / ((end - start) / 1000000000.0);
		System.out.println("Finished: " + (thisTimeFinished) + " Remain " + (N*Niter - thisTimeFinished) + " Rate " + (int)rate + " samples/sec" +
							" Remaining time " + (int)((N*Niter - thisTimeFinished) / rate) + " sec");
    	for(int i=0; i<processors; i++)
    	{
    		VectorN.ScaleCombine(parallelW, parallelWPool.get(i), 1.0F/(float)processors);
    	}
    	return parallelW;
    }
    
    private static VectorN SimpleSGD(int Niter)
    {
    	System.out.println("Staring the Simple SGD Implementation");
    	long start = System.nanoTime();
    	Float c = 1E-6F;
    	int t = 0;
    	VectorN w = generateZero();
    	int N = sampleX.size();
    	for(int iteration = 0; iteration < Niter; iteration++)
    	{
    		for(int i=0; i<N; i++)
        	{
        		t++;
        		VectorN sample = sampleX.get(i);
        		Float wx = (float) VectorN.Dot(w, sample);
        		Float y = labelY.get(i);
        		Float factor = (float) (-y * Math.exp(-y*wx) / (1 + Math.exp(-y*wx)));
        		VectorN dL = sample.clone();
        		VectorN.Scale(dL, factor);
        		VectorN.ScaleCombine(w, dL, -c/(float)t);
        		
        		if((i+iteration*N) % 10000 == 0 && (i+iteration*N) > 0)
        		{
        			long end = System.nanoTime();
        			double rate = (double)(i+iteration*N) / ((end - start) / 1000000000.0);
        			System.out.println("Finished: " + (i+iteration*N) + " Remain " + (N*Niter - (i+iteration*N)) + " Rate " + (int)rate + " samples/sec" +
        								" Remaining time " + (int)((N*Niter - (i+iteration*N)) / rate) + " sec");
        		}
        	}
    	}
    	
    	long end = System.nanoTime();
		double rate = (double)(N*Niter) / ((end - start) / (10E9));
		System.out.println("Finished all at rate " + (int)rate + " samples/sec.");
		
    	return w;
    }
    
    private static VectorN LogReg(int Niter)
    {
    	return SimpleSGD(Niter);
    }
    
    public static void main(String[] args) throws IOException {
        if(args.length != 5)
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
        
        int Niter;
        try
        {
        	Niter = Integer.parseInt(args[4]);
        }
        catch (Exception e)
        {
        	System.out.println("N parameter is wrong");
        	e.printStackTrace();
        	return;
        }
        
        String featureFilename = args[0];
        String labelFilename = args[1];
        String modelFilename = args[2];
        sampleX = new ArrayList<>();
        labelY = new ArrayList<>();
        
        System.out.println("Reading feature file: " + featureFilename + "......");
        Scanner scanner = new Scanner(new File(featureFilename));
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
        	sampleX.add(new VectorN(sample));
        	
        	if(i % 128 == 0)
        	{
        		System.out.println("Reading feature file: " + featureFilename + " " + i + " features read.");
        	}
        	i++;
        }
        scanner.close();
        
        System.out.println("Reading label file: " + labelFilename + "......");
        scanner = new Scanner(new File(labelFilename));
        
        i=0;
        while(scanner.hasNextInt())
        {
        	if(scanner.hasNextInt())
    		{
        		int label = scanner.nextInt();
        		if(label == 1)
        		{
        			labelY.add(1.0F);
        		}
        		else
        		{
        			labelY.add(-1.0F);
        		}
    	        
    		}
    		else
    		{
    			scanner.close();
    			throw new FileNotFoundException("Label file is correpted.");
    		}
        	if(i % 128 == 0)
        	{
        		System.out.println("Reading label file: " + labelFilename + " " + i + " labels read.");
        	}
        	i++;
        }
        scanner.close();
        
        VectorN w = LogReg(Niter);
        List<Float> coordinates = w.getCoor();
        
        Writer wr = new FileWriter(modelFilename);
        for(Float coor : coordinates)
        {
        	wr.write(coor + " ");
        }
        wr.close();
    }
}
