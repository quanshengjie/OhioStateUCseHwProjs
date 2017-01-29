#!/usr/bin/env python
# import system module
import sys
import os
from socket import *

# check the legitimacy of the running arguments
if len(sys.argv) != 3:
    print("Wrong argument number")
    exit()

try:
    serverPort = int(sys.argv[1])
    trollPort = int(sys.argv[2])
except ValueError:
    print("Oops! Doesn't seems like correct ports!\n")
    exit()

# create a tcp socket on the port    
serverSocket = socket(AF_INET,SOCK_DGRAM)
serverSocket.bind(("", serverPort))

def sendACK(remoteAddr, port, seqNum):
    ack = b""
    if seqNum == 1:
        ack += b'\x01'
    else:
        ack += b'\x00'
    serverSocket.sendto(ack, (remoteAddr, port))

def sendOldACK(remoteAddr, port, curSeqNumByte):
    if curSeqNumByte == b'\x00':
        sendACK(remoteAddr, port, 1)
    else:
        sendACK(remoteAddr, port, 0)

print("The server is up!\n")

dirct = "recv/"
chunkSize = 1010
dataSize = 1000
fileLenSize = 4
fileNameSize = 20
ipSize = 4
portSize = 2
flagSize = 1
headSize = ipSize + portSize + flagSize + 1

expectChunkNum = 1
expectSeqNum = b'\x00'
fileLength = 0
fileName = ""
iterateTotal = 0
fileOut = None
# begin to process requests
while True:
    if expectChunkNum == 1:
        # parse file length
        chunk1, addr = serverSocket.recvfrom(chunkSize)
        flag = int.from_bytes(chunk1[6:7], byteorder=sys.byteorder)
        seqNum = chunk1[7:8]
        if seqNum != expectSeqNum:
            sendOldACK(gethostbyname(gethostname()), trollPort, expectSeqNum)
            print("Got wrong seqNum " + str(seqNum) + " Expect " + str(expectSeqNum))
            continue
        if flag != expectChunkNum:
            sendACK(gethostbyname(gethostname()), trollPort, expectSeqNum    )
            continue
        fileLength = int.from_bytes(chunk1[headSize:headSize+fileLenSize], byteorder=sys.byteorder)
        expectChunkNum += 1
        if expectSeqNum == b'\x00':
            expectSeqNum = b'\x01'
            sendACK(gethostbyname(gethostname()), trollPort, 0)
        else:
            expectSeqNum = b'\x00'
            sendACK(gethostbyname(gethostname()), trollPort, 1)
    elif expectChunkNum == 2:
        # parse file length
        chunk2, addr = serverSocket.recvfrom(chunkSize)
        flag = int.from_bytes(chunk2[6:7], byteorder=sys.byteorder)
        seqNum = chunk2[7:8]
        if seqNum != expectSeqNum:
            sendOldACK(gethostbyname(gethostname()), trollPort, expectSeqNum)
            print("Got wrong seqNum " + str(seqNum) + " Expect " + str(expectSeqNum))
            continue
        if flag != expectChunkNum:
            sendACK(gethostbyname(gethostname()), trollPort, expectSeqNum    )
            continue
        fileName = chunk2[headSize:headSize+fileNameSize].decode().strip()
        print("Processing file: "+fileName+" of size " + str(fileLength))
        # calculate how many more chunks expect
        iterateTotal = fileLength / dataSize + 1 + 2
        # perpare for writting file
        if not os.path.exists(dirct):
            os.makedirs(dirct)
        fileOut = open(dirct + fileName, "wb")
        expectChunkNum += 1
        if expectSeqNum == b'\x00':
           expectSeqNum = b'\x01'
           sendACK(gethostbyname(gethostname()), trollPort, 0)
        else:
           expectSeqNum = b'\x00'
           sendACK(gethostbyname(gethostname()), trollPort, 1)
    else:
        chunkN, addr = serverSocket.recvfrom(chunkSize)
        flag = int.from_bytes(chunkN[6:7], byteorder=sys.byteorder)
        seqNum = chunkN[7:8]
        if seqNum != expectSeqNum:
           sendOldACK(gethostbyname(gethostname()), trollPort, expectSeqNum)
           print("Got wrong seqNum " + str(seqNum) + " Expect " + str(expectSeqNum))
           continue
        if flag < 3:
           continue
        # retrive and write all bytes of the file
        fileOut.write(chunkN[headSize:len(chunkN)])
        if expectChunkNum % 100 == 0:
            print("Received chunk up tp: " + str(expectChunkNum))
        expectChunkNum += 1
        if expectSeqNum == b'\x00':
            expectSeqNum = b'\x01'
            sendACK(gethostbyname(gethostname()), trollPort, 0)
        else:
            expectSeqNum = b'\x00'
            sendACK(gethostbyname(gethostname()), trollPort, 1)
        if expectChunkNum > iterateTotal:
            fileOut.close()
            expectChunkNum = 1
            expectSeqNum = b'\x00'
            print("File " +fileName+ " received.")
