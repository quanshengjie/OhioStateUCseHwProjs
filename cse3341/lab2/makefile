all:
	find -name "*.java" > sources.txt
	javac -d . -classpath . @sources.txt
clean:
	rm sources.txt
	rm -rf edu
