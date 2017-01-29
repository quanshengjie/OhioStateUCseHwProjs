Name: Yubin He, Shengjie Quan, Zilong Xu
Lab 3 is written in java. 
TrainLogReg.java is for problem 1 training.
TestLogReg.java is for problem 2 testing.
Accuracy.java is for problem 3 checking the accuracy.
logRegModel is the trained model file (ignore logRegModel.parallel and logRegModel.simple, they are just model created for fun).

The submission contains two script files. compile.sh is for compiling all
  6 codes. cleanUp.sh is for removing all compile binaries.

The procedure is as follow:
1.  Navigating to the project root directory(where all scripts (.sh) files are)

2. Assigning permission to scripts
    chmod +xrw cleanUp.sh
    chmod +xrw compile.sh

3. Compiling
    ./compile.sh

4. Run Train

java edu.QSJ.LogReg.TrainLogReg trainingFeature.dat trainingLabel.dat logRegModel 785 500

5. Run Test

java edu.QSJ.LogReg.TestLogReg logRegModel testFeature.dat predLabelFile 785

6. Run Accuracy

java edu.QSJ.LogReg.Accuracy predLabelFile trueLabelFile.dat
