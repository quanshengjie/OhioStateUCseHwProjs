%.o: %.c
	gcc -g -c -o $@ $<

all: lab2

lab2.o: lab2.c

lab2: lab2.o
	gcc -o lab2 lab2.o

clean:
	rm -f *.o lab2
