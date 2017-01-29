#!/usr/bin/env python
# import system module
import sys
import os
from socket import *

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
clientSocket = socket(AF_INET, SOCK_STREAM)
clientSocket.connect((serverIP,serverPort))

chunkSize = 1000
fileLenSize = 4
fileNameSize = 20

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
clientSocket.send(chunk)

while byte:
    byte = fileIn.read(chunkSize)
    chunk = byte
    if chunk:
        clientSocket.send(chunk)
# close the file and close the connection
clientSocket.close()
fileIn.close()
print("File " + fileName.strip() + " sent.")
