#!/usr/bin/env python
# import system module
import sys
import os
from socket import *
import time

# check the legitimacy of the running arguments
if len(sys.argv) != 4:
    print("Wrong argument number")
    exit()

# get all arguments
try:
    serverIP = sys.argv[1]
except ValueError:
    print("Oops! Doesn't seems like a correct port!\n")
    exit()
serverPort = int(sys.argv[2])
fileName = sys.argv[3]
if not os.path.isfile(fileName):
    print("The file doesn't exist.")
    exit()

# connect the server
clientSocket = socket(AF_INET, SOCK_DGRAM)
clientSocket.bind(("", 38525))

chunkSize = 1000
fileLenSize = 4
fileNameSize = 20
sleepTime = 0.0025

# encoding head information
fileSize = os.path.getsize(fileName)
fileSizeByte = int.to_bytes(fileSize, byteorder=sys.byteorder, length=fileLenSize)
if len(fileName) < fileNameSize :
    fileName += " " * (fileNameSize - len(fileName))
fileNameByte = str.encode(fileName)

print("Sending file " + fileName)

# sending the file
fileIn = open(fileName.strip(), "rb")
chunk = fileSizeByte + fileNameByte
byte = fileIn.read(chunkSize - len(chunk))
chunk += byte
clientSocket.sendto(chunk, (serverIP, serverPort))
chunkCount = 0
while byte:
    time.sleep(sleepTime)
    byte = fileIn.read(chunkSize)
    chunk = byte
    if chunk:
        clientSocket.sendto(chunk, (serverIP, serverPort))
        chunkCount += 1
        if chunkCount % 100 == 0:
            print("Sent chunk up tp: " + str(chunkCount))
# close the file and close the connection
clientSocket.close()
fileIn.close()
print("File " + fileName.strip() + " sent.")
