/*
 * Name: Shengjie Quan
 * Class: CSE2431
 * Session: WF 9:35
 */
#include <sys/types.h>
#include <stdio.h>
#include <unistd.h>
#include <string.h>

#define MAX_COUNT 200

void ChildProcess(void);  	/* chile process prototype */
void ParentProcess(void);	/* parent process prototype */

void main()
{

	pid_t pid;
    int num =20;

	pid = fork();

	if (pid == 0)
    {
		ChildProcess();
        printf("Value of num = %d\n", num);
    }
	else
    {
		ParentProcess();
        num += 5;
    }
}

void ChildProcess()
{
	int i;
	pid_t pid;

	pid = getpid();

	for (i = 1; i <= MAX_COUNT; i++)
		printf ("    This line is from child, value =  %d, pid = %d\n", i, pid);
	printf("    ***Child process id done ***\n");
}

void ParentProcess()
{	
	int i;
	pid_t pid;

	pid = getpid();

	for(i=1; i <= MAX_COUNT; i++)
		printf("This line is from parent, value = %d, pid = %d\n", i, pid);
	printf("***Parent is done***\n");
}
