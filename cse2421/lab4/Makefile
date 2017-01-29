all: lab4

lab4: temperature.o lab4.o
	gcc temperature.o lab4.o -g -Wall -lm -o lab4

temperature.o: temperature.c
	gcc -c -g -Wall -lm temperature.c

lab4.o: lab4.c
	gcc -c -g -Wall lab4.c

clean:
	rm -rf *.o
	rm -rf lab4
