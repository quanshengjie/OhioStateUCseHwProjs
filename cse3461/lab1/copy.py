#!/usr/bin/env python
# import system module
import sys
import os

# check the legitimacy of the running arguments
if len(sys.argv) != 2:
    print("Wrong argument number")
    exit()

dirct = "recv/"
size = 1000

# open input file and output file for reading and writing
fileIn = open(sys.argv[1], "rb")
if not os.path.exists(dirct):
    os.makedirs(dirct)
fileOut = open(dirct + sys.argv[1], "wb")

# read bytes from input and then write it to output
byte = fileIn.read(size)
fileOut.write(byte)
while byte:
    byte = fileIn.read(size)
    fileOut.write(byte)

# close both file
fileIn.close()
fileOut.close()
