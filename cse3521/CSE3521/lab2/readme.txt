Name: Yubin He, Shengjie Quan, Zilong Xu
Lab2 is written in Jave. There are two files, HMinMax.java and minimax.java
HminMax.java is for problem 2, the H-Minimax one.
minimax.java is for problem 1, the Minimax one.
The submission contains four script files. compile.sh is for compiling all 
codes. cleanUp.sh is for removing all compile binaries. runMiniMax.sh is 
for running the Minimax program for problem 1 after the program is compiled. 
runHMiniMax.sh is for running the HMinimax program for problem 2 after the 
program is compiled.

The procedure is as follow:
1. Navigating to the project root directory(where all scripts (.sh) files are)

2. Assigning permission to scripts
    chmod +xrw cleanUp.sh
    chmod +xrw compile.sh
    chmod +xrw runHMiniMax.sh
    chmod +xrw runMiniMax.sh

3. Compiling
    ./compile.sh

4. Run Minimax program
    ./runMiniMax.sh

5. Run HMinimax program
    ./runHMiniMax.sh

6. Clean up all binaries
    ./cleanUp.sh
