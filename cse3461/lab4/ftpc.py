#!/usr/bin/env python
# import system module
import sys
import os
from socket import *
import time
import select

# check the legitimacy of the running arguments
if len(sys.argv) != 5:
    print("Wrong argument number")
    exit()

# get all arguments
try:
    serverIP = sys.argv[1]
except ValueError:
    print("Oops! Doesn't seems like a correct port!\n")
    exit()
serverPort = int(sys.argv[2])
trollPort = int(sys.argv[3])
fileName = sys.argv[4]
if not os.path.isfile(fileName):
    print("The file doesn't exist.")
    exit()

# connect the server
localPort = 38525
clientSocket = socket(AF_INET, SOCK_DGRAM)
clientSocket.bind(("", localPort))

dataSize = 1000
fileLenSize = 4
fileNameSize = 20
ipSize = 4
portSize = 2
flagSize = 1
seqNumSize = 1

def GenerateHead(flag, seqNum):
    head = inet_aton(gethostbyname(gethostname())) 
    head += int.to_bytes(localPort, byteorder=sys.byteorder, length=portSize)
    head += int.to_bytes(flag, byteorder=sys.byteorder, length=flagSize)
    head += seqNum
    return head

# encoding head information
fileSize = os.path.getsize(fileName)
fileSizeByte = int.to_bytes(fileSize, byteorder=sys.byteorder, length=fileLenSize)
if len(fileName) < fileNameSize :
    fileName += " " * (fileNameSize - len(fileName))
fileNameByte = str.encode(fileName)

print("Sending file " + fileName)

def TrasmitChunk(chunk, expectedACKSeq):
    clientSocket.sendto(chunk, (gethostbyname(gethostname()), trollPort))
    read, write, err = select.select([clientSocket], [], [], 0.050)
    received = None
    if len(read) > 0:
        received = str(read[0].recv(1))
    while len(read) <=0 or received != str(expectedACKSeq):
        print("Got wrong ACK seq num " + str(received) + " Expecting " + str(expectedACKSeq) +" Retransmiting...")
        clientSocket.sendto(chunk, (gethostbyname(gethostname()), trollPort))
        read, write, err = select.select([clientSocket], [], [], 0.050)
        received = None
        if len(read) > 0:
            received = str(read[0].recv(1))

# sending first segment
chunk = GenerateHead(1, b'\x00')
chunk += fileSizeByte
TrasmitChunk(chunk, b'\x00')
# sending second segment
chunk = GenerateHead(2, b'\x01')
chunk += fileNameByte
TrasmitChunk(chunk, b'\x01')
# sending the file
fileIn = open(fileName.strip(), "rb")
expectedSeqNum = b'\x00'
chunkCount = 0
byte = "File"
while byte:
    byte = fileIn.read(dataSize)
    chunk = GenerateHead(3, expectedSeqNum)
    chunk += byte
    if byte:
        TrasmitChunk(chunk, expectedSeqNum)
        if expectedSeqNum == b'\x00':
            expectedSeqNum = b'\x01'
        else:
            expectedSeqNum = b'\x00'
        chunkCount += 1
        if chunkCount % 100 == 0:
            print("Sent chunk up tp: " + str(chunkCount))
# close the file and close the connection
clientSocket.close()
fileIn.close()
print("File " + fileName.strip() + " sent.")
