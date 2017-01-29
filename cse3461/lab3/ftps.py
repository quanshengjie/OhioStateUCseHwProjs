#!/usr/bin/env python
# import system module
import sys
import os
from socket import *

# check the legitimacy of the running arguments
if len(sys.argv) != 2:
    print("Wrong argument number")
    exit()

try:
    serverPort = int(sys.argv[1])
except ValueError:
    print("Oops! Doesn't seems like a correct port!\n")
    exit()

# create a tcp socket on the port    
serverSocket = socket(AF_INET,SOCK_DGRAM)
serverSocket.bind(("", serverPort))

print("The server is up!\n")

dirct = "recv/"
chunkSize = 1000
fileLenSize = 4
fileNameSize = 20

# begin to process requests
while True:

    # parse file information
    chunk0, addr = serverSocket.recvfrom(chunkSize)
    fileLength = int.from_bytes(chunk0[0:fileLenSize], byteorder=sys.byteorder)
    fileName = chunk0[fileLenSize:fileNameSize+fileLenSize].decode().strip()
    print("Processing file: "+fileName+" of size " + str(fileLength))
    
    # calculate how many more chunks expect
    iterateTotal = (fileLength - (fileLenSize+fileNameSize) - 1) / chunkSize
    # retrive and write all bytes of the file
    if not os.path.exists(dirct):
        os.makedirs(dirct)
    fileOut = open(dirct + fileName, "wb")
    fileOut.write(chunk0[fileNameSize+fileLenSize:len(chunk0)])
    for i in range(0, int(iterateTotal)):
        chunk1, addr = serverSocket.recvfrom(chunkSize)
        if (i+1) % 100 == 0:
            print("Received chunk up tp: " + str(i+1))
        fileOut.write(chunk1)
    
    fileOut.close()
    print("File " +fileName+ " received.")