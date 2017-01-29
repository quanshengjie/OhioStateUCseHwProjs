/*
 * Author:    Shengjie Quan
 * Email:     quan.48@osu.edu
 * Section:   WF 9:35
 * Professor: Doreen P Close
 */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <time.h>

#define MAXLINE 80 /* 80 chars per line, per command, should be enough. */
#define INIT_HISTORY_NUM 12 /* 12 is the initial history number */

typedef struct history_llist
{
    char command[MAXLINE];
    char *args[MAXLINE/2+1];
    int bkgrnd;
    int  index;
    time_t rawtime;
    struct history_llist *next;
    struct history_llist *prev;
} HLLIST, *PTR_HLLIST;

/** The setup() routine reads in the next command line string storing it in the input buffer.
The line is separated into distinct tokens using whitespace as delimiters.  Setup also 
modifies the args parameter so that it holds points to the null-terminated strings which 
are the tokens in the most recent user command line as well as a NULL pointer, indicating the
end of the argument list, which comes after the string pointers that have been assigned to
args. ***/

void setup(char inBuffer[], char *args[],int *bkgrnd)
{
    int length,  /* #  characters in the command line */
        start,   /* Beginning of next command parameter           */
        i,       /* Index for inBuffer arrray          */
        j;       /* Where to place the next parameter into args[] */

    /* Read what the user enters */
    length = read(STDIN_FILENO, inBuffer, MAXLINE);  

    start = -1;
    j = 0;

    if (length == 0)
        exit(0);            /* Cntrl-d was entered, end of user command stream */

    if (length < 0){
        perror("error reading command");
	exit(-1);           /* Terminate with error code of -1 */
    }
    
    /* Examine every character in the input buffer */
    for (i = 0; i < length; i++) {
 
        switch (inBuffer[i]){
        case ' ':
        case '\t' :          /* Argument separators */

            if(start != -1){
                args[j] = &inBuffer[start];    /* Set up pointer */
                j++;
            }

            inBuffer[i] = '\0'; /* Add a null char; make a C string */
            start = -1;
            break;

        case '\n':             /* Final char examined */
            if (start != -1){
                args[j] = &inBuffer[start];     
                j++;
            }

            inBuffer[i] = '\0';
            args[j] = NULL; /* No more arguments to this command */
            break;

        case '&':
            *bkgrnd = 1;
            inBuffer[i] = '\0';
            break;
            
        default :             /* Some other character */
            if (start == -1)
                start = i;
	}
 
    }    
    args[j] = NULL; /* Just in case the input line was > 80 */
} 

/*
 * This function initialize the link list storing history
 * A dummy node is added at the beginning so that adding
 * the first record of history will be painless.
 * The dummy node stores nothing. All actual data begin from
 * head->next
 */
void InitHistoryLinkList(PTR_HLLIST *head, PTR_HLLIST *tail)
{
    PTR_HLLIST dummy = malloc(sizeof(HLLIST));
    dummy->next = NULL;
    dummy->prev = NULL;
    dummy->index = 0;
    dummy->bkgrnd = 0;
    *head = dummy;
    *tail = dummy;
}

/*
 * This method create one piece of record of history and append it
 * to the end of the history link list.
 */
void AddHistoryToEnd(PTR_HLLIST *head, PTR_HLLIST *tail, char *command, char *args[], int bkgrnd)
{
    int i = 0;
    PTR_HLLIST node = malloc(sizeof(HLLIST));
    strncpy(node->command, command, MAXLINE);
    for(i=0; i<MAXLINE/2+1; i++)
    {
        if(args[i] != NULL)
        {
            node->args[i] = malloc(strlen(args[i])+1*sizeof(char));
            strncpy(node->args[i], args[i], strlen(args[i])+1*sizeof(char));
        }
        else
        {
            node->args[i] = args[i];
            i = MAXLINE/2+1; /* terminate the loop */
        }
    }
    node->index = (*tail)->index + 1;
    node->bkgrnd = bkgrnd;
    time(&(node->rawtime));
    node->prev = *tail;
    node->next = NULL;
    (*tail)->next = node;
    *tail = node; 
}

/*
 * This function judges whether two pieces of history record
 * are the same in terms of command and arguments. The function
 * return 1 if they are the same otherwise if they are not the 
 * same.
 */
int isSameHistoryNode(PTR_HLLIST one, PTR_HLLIST other)
{
    int reVal = 1;
    int i;
    if(strcmp(one->command, other->command) != 0 || 
                        one->bkgrnd != other->bkgrnd)
    {
        reVal = 0;
    }
    else
    {
        for(i=0; i<MAXLINE/2+1; i++)
        {
            if(one->args[i] == NULL || other->args[i] == NULL)
            {
                if(one->args[i] != other->args[i])
                {
                    reVal = 0;
                }
                i = MAXLINE/2+1;
            }
            else
            {
                if(strcmp(one->args[i], other->args[i]) != 0)
                {
                    reVal = 0;
                    i=MAXLINE/2+1;
                }
            }
        }
    }
    return reVal;
}

/*
 * This method check all history record from head to the node 
 * immediately before tail and remove all nodes that isSameHistoryNode
 * as the tail. The link list structure is preserved.
 */
void removeDuplicateHistory(PTR_HLLIST head, PTR_HLLIST tail)
{
    PTR_HLLIST current = head;
    PTR_HLLIST attachTo = NULL;
    PTR_HLLIST toDelete = NULL;
    while(current->next != tail)
    {
        if(isSameHistoryNode(current->next, tail))
        {
            /* remove current->next */ 
            toDelete = current->next;
            attachTo = current->next->next;
            current->next = attachTo;
            attachTo->prev = current;
            free(toDelete);
            toDelete = NULL;
        }
        else
        {
            current = current->next;
        }
    }
}

/*
 * print the command along with its arguments stored in node
 * in the console format
 */
void echoHistoryCommand(PTR_HLLIST node)
{
    int i;
    for(i=0; node->args[i] != NULL; i++)
    {
       printf("%s ", node->args[i]);
    }
    if(node->bkgrnd)
    {
        printf("&");
    }
    printf("\n");
}

/*
 * This method print the most recent history record in a formatted
 * manner. Length is sepecified by historyNum.
 */
void printHistoryRecords(PTR_HLLIST head, PTR_HLLIST tail, int historyNum)
{
    int i=0;
    PTR_HLLIST begin = tail;
    struct tm *timeInfo;
    for(i=1; i<= historyNum; i++)
    {
        begin = begin->prev;
        if(begin == head)
        {
            i = historyNum; /* terminate the loop */
        }
    }
    while(begin->next != NULL)
    {
        timeInfo = localtime(&(begin->next->rawtime));
        printf("%6d\t%02d:%02d:%02d   ", begin->next->index, timeInfo->tm_hour
                                                       , timeInfo->tm_min
                                                       , timeInfo->tm_sec);
        echoHistoryCommand(begin->next);

        begin = begin->next;
    }

}

/*
 * This method set inBuffer and args and bkgrnd according to the history
 * record stored in node in order to be excuted.
 */
void setHistoryNode(PTR_HLLIST node, char inBuffer[], char *args[], int *bkgrnd)
{
    strncpy(inBuffer, node->command, MAXLINE);
    int i=0;
    for(i=0; i<MAXLINE/2+1; i++)
    {
        if(node->args[i] != NULL)
        {
            args[i] = node->args[i];
        }
        else
        {
            args[i] = NULL;
            i = MAXLINE/2+1; /* terminate the loop */
        }
    }
    *bkgrnd = node->bkgrnd;
}

/*
 * This function return the node in the history link list bounded
 * by head and tail. The return node has index sepecified in index.
 * The function perform search from tail up to head with depth no
 * more than historyNum.
 */
PTR_HLLIST searchHistoryByIndex(int index, PTR_HLLIST head, PTR_HLLIST tail,
                                                             int historyNum)
{
    PTR_HLLIST reVal = NULL;
    PTR_HLLIST current = tail;
    if(!(index < 1 || index > tail->index))
    {
        while(current != head && historyNum > 0)
        {
            if(current->index == index)
            {
                reVal = current;
                break;
            }
            current = current->prev;
            historyNum--;
        }
    }
    return reVal;
}

/*
 * This function return the node in the history link list bounded
 * by head and tail. The return node has command with prefix sepecified
 * in prefix[]. The function perform search from tail up to head
 * with depth no more than historyNum.
 */
PTR_HLLIST searchHistoryByPrefix(char prefix[], PTR_HLLIST head,
                                    PTR_HLLIST tail, int historyNum)
{
    PTR_HLLIST reVal = NULL;
    PTR_HLLIST current = tail;
    if(prefix)
    {
        while(current != head && historyNum > 0)
        {
            char *prefixHead = strstr(current->command, prefix);
            if(prefixHead == current->command)
            {
                reVal = current;
                break;
            }
            current = current->prev;
            historyNum--;
        }
    }
    return reVal;
}

void resizeHistoryList(PTR_HLLIST head, PTR_HLLIST tail, int historyNum)
{
    int i=0;
    PTR_HLLIST begin = tail;
    PTR_HLLIST deleteBegin = NULL;
    PTR_HLLIST toDelete = NULL;
    for(i=1; i<= historyNum-1 && begin != head; i++)
    {
        begin = begin->prev;
    }
    if(begin != head && begin != head->next)
    {
        deleteBegin = begin->prev;
        head->next = begin;
        begin->prev = head;
        while(deleteBegin != head)
        {
            toDelete = deleteBegin;
            deleteBegin = deleteBegin->prev;
            free(toDelete);
        }
    }
}

int main(void)
{
    char inBuffer[MAXLINE]; /* Input buffer  to hold the command entered */
    char *args[MAXLINE/2+1];/* Command line arguments */
    int bkgrnd;             /* Equals 1 if a command is followed by '&', else 0 */
    pid_t pid;
    int status;
    PTR_HLLIST ptr_historyHead;
    PTR_HLLIST ptr_historyTail;
    int historyNum = INIT_HISTORY_NUM;

    InitHistoryLinkList(&ptr_historyHead, &ptr_historyTail);

    while (1){            /* Program terminates normally inside setup */

	    bkgrnd = 0;

	    printf("SysIIShell--> ");  /* Shell prompt */
        fflush(0);

        setup(inBuffer, args, &bkgrnd);       /* Get next command */
        
        if(strcmp(inBuffer, "") == 0)
        {
            continue;
        }
        else if(strcmp(inBuffer, "sethistory") == 0)
        {
            int size = 0;
            if(args[1])
            {
                size = atoi(args[1]);
            }
            if(size >= 1)
            {
                resizeHistoryList(ptr_historyHead, ptr_historyTail, historyNum);
                historyNum = size;
                resizeHistoryList(ptr_historyHead, ptr_historyTail, size);
            }
            else
            {
                printf("Invalid history size.\n");
            }
            continue;
        }
        else if(strcmp(inBuffer, "rr") == 0)
        {
            PTR_HLLIST history = searchHistoryByIndex(ptr_historyTail->index,
                               ptr_historyHead, ptr_historyTail, historyNum);
            if(history)
            {
                echoHistoryCommand(history);
                setHistoryNode(history, inBuffer, args, &bkgrnd);
            }
            else
            {
                printf("No recent history!\n");
                continue;
            }
        }
        else if(strcmp(inBuffer, "r") == 0)
        {
            int hisIndex = 0;
            if(args[1] != NULL)
            {
                hisIndex = atoi(args[1]);
            } 
            else
            {
                printf("Syntax Error: Must include history number.\n");
                continue;
            }
            if(hisIndex < 0)
            {
                printf("Invalid history number; Must be an integer greater then zero.\n");
                continue;
            }
            /* try search by index */
            PTR_HLLIST history = searchHistoryByIndex(hisIndex,
                                ptr_historyHead, ptr_historyTail, historyNum);
            if(!history)
            {
                if(hisIndex > 0)
                {
                    printf("History number %d doesn't exist.\n", hisIndex);
                    continue;
                }
                /* no index found, try search by prefix */
                history = searchHistoryByPrefix(args[1], 
                           ptr_historyHead, ptr_historyTail, historyNum);
            }
            if(history)
            {
                echoHistoryCommand(history);
                setHistoryNode(history, inBuffer, args, &bkgrnd);
            }
            else
            {
                printf("History not found.\n");
                continue;
            }
        }
	    AddHistoryToEnd(&ptr_historyHead, &ptr_historyTail, inBuffer, args, bkgrnd);
        removeDuplicateHistory(ptr_historyHead, ptr_historyTail);
        pid = fork();
        if(pid == 0)
        {
            /* child process */
            if(strcmp(inBuffer, "history")==0 || strcmp(inBuffer, "h")==0)
            {
                printHistoryRecords(ptr_historyHead, ptr_historyTail, historyNum);
            }
            else
            {
                status = execvp(inBuffer, args);
                if(status == -1)
                {
                    printf("%s\n", strerror(errno));
                }
            }
            break;
        }
        else
        {
            /* parent process */
            if(!bkgrnd)
            {
                waitpid(pid, &status, 0);
                
            }
        }
    }
}
