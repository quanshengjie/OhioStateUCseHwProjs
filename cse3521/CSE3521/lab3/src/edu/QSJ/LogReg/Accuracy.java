package edu.QSJ.LogReg;

import java.io.File;
import java.io.FileNotFoundException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public final class Accuracy {

	public static void main(String[] args) throws FileNotFoundException {
		if(args.length != 2)
        {
        	throw new IllegalArgumentException("Wrong number of argument.");
        }

		String predLabelFilename = args[0];
		String trueLabelFilename = args[1];
		
		int total = 0;
		int accurate = 0;
		
		int preCount = 0;
		int trueCount = 0;
		
		List<Integer> wrongLine = new ArrayList<>();
		Scanner pre_scanner = new Scanner(new File(predLabelFilename));
		Scanner true_scanner = new Scanner(new File(trueLabelFilename));
		while(pre_scanner.hasNextInt() || true_scanner.hasNextInt())
		{
			String preVal = "";
			String trueVal = "";
			total++;
			if(pre_scanner.hasNextInt())
			{
				preVal = "" + pre_scanner.nextInt();
				preCount++;
			}
			
			if(true_scanner.hasNextInt())
			{
				trueVal = "" + true_scanner.nextInt();
				trueCount++;
			}
			
			if(preVal.equals(trueVal))
			{
				accurate++;
			}
			else
			{
				wrongLine.add(total);
			}
			
		}
		true_scanner.close();
		pre_scanner.close();
		System.out.println("The following line(s) are wrong: ");
		for(Integer line : wrongLine)
		{
			System.out.println("Line: " + line);
		}
		System.out.println();
		System.out.println("Total: " + total + " Accurate: " + accurate);
		System.out.println("Accuracy: " + new DecimalFormat("##.####").format((double)accurate * 100.0 / (double)total) + "%");
		if(preCount != trueCount)
		{
			System.out.println("Warning: The number of predicted value is different from the number of true value given");
		}
	}

}
