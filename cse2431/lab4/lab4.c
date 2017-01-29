/* 
 * Professor Doreen Close
 * 9:35 W/F
 * Lab #4
 *
 * Name: 
 *       Shengjie Quan  quan.48@osu.edu
 *       Huizhong Zhao  zhao.1151@osu.edu
 *
 * To compile and run:
 *       > gcc -o1 -Wall -o lab4 lab4.c -lpthread
 *       > lab4 threadNumber 
 *    Note: threadNumber is a non-zero integer indicating number of tread lines
 */

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <sys/time.h>
#include <pthread.h>

#define N   2400
#define M   2000 
#define P   500

/* 
 * RANGE is used to divide matrix into small portions.
 * low and high are indexes of an element in the array
 */
typedef struct
{
    int low;
    int high;
}RANGE;

int a[N][M]  = {{0}};     /* Matrix A */
int b[M][P]  = {{0}};     /* Matrix B */
int c1[N][P] = {{0}};     /* Matrix C1 */
int c[N][P]  = {{0}};     /* Matrix C */
pthread_mutex_t c_mutex;  /* Mutex protecting C when writting */

/* 
 * Generate matrix A so that a[i][j] = j-i+2 
 */
void InitA()
{
    int i=0, j=0;
    for(i=0; i<N; i++)
    {
        for(j=0; j<M; j++)
        {
            a[i][j] = j-i+2;
        }
    }
}

/* 
 * Generate matrix B so that b[i][j] = i-j+1 
 */
void InitB()
{
    int i=0, j=0;
    for(i=0; i<M; i++)
    {
        for(j=0; j<P; j++)
        {
            b[i][j] = i-j+1;
        }
    }
}

/* 
 * Calculte A*B and store in C1 using algorithm provided in handout.
 */
void CalculateReference()
{
    int i=0, j=0, k=0;
    for(i=0; i<N; i++)
    {
        for(j=0; j<P; j++)
        {
            c[i][j] = 0;
            for(k=0; k<M; k++)
            {
                c1[i][j] += a[i][k]*b[k][j];
            }
        }
    }
}

/*
 * The thread that calculate elements in c1 sepecified in range. 
 * A, B are read only here.
 */
void* CalculatePartialMartrix(void *range)
{
    RANGE localRange = *(RANGE*) range;
    int low  = localRange.low;
    int high = localRange.high; 
    int column = 0;
    int row = 0;
    int index = 0;
    int k = 0;
    int resultTmp = 0;

    for(index = low; index <=high; index++)
    {
        row = index / P;
        column = index % P;
        resultTmp = 0;
        for(k=0; k<M; k++)
        {
            resultTmp += a[row][k]*b[k][column];
        }
        pthread_mutex_lock(&c_mutex);
        c[row][column] = resultTmp;
        pthread_mutex_unlock(&c_mutex);
    }
    return 0;
}

/*
 * Generate the range of elements in the matric c[n][p] array that being taken 
 * by a specific thread.
 * Each thread except the last one should take equal number of elements and
 * update their values based on the algorithm.
 * The last thread should take care of all rest elements.
 */
void GenerateRange(int threadNum, RANGE ** ptr_pRange)
{
    int range = N*P / threadNum;
    int i = 0;
    // allocate memory spaces
    (*ptr_pRange) = malloc(sizeof(RANGE) * threadNum);

    for(i=0; i<threadNum; i++)
    {
        // start point of each portion
        (*ptr_pRange)[i].low = i*range;
        // end point of each portion
        (*ptr_pRange)[i].high = (i+1)*range - 1;
    }
    // last thread get the rest of all elements
    (*ptr_pRange)[threadNum-1].high = N*P - 1;
}

/*
 * Destroy range pointer and free memory.
 */
void DestoryRange(RANGE **ptr_pRange)
{
    free(*ptr_pRange);
    (*ptr_pRange) = NULL;
}

/*
 * Check C against C1 calculated using traditional way
 * Return 1 if all match otherwise 0
 */
int CheckCorrectness()
{
    int i=0, j=0;
    for(i=0; i<N; i++)
    {
        for(j=0; j<P; j++)
        {
            if(c1[i][j] != c[i][j])
            {
                printf("wrong pos : %d %d\n", i, j);
                return 0;
            }
        }
    }
    return 1;
}

/* PrintCheckingElements is used to check 20 elements specifically 
 * between two matrices.
 * Print each element seperatly
 */
void PrintCheckingElements(){

   printf("\n\nComparing 20 elements of matrix c1 from matrix c...\n");
   int column[20];
   int row[20];
   int m=0;    
   int largestBetweenNAndP;
   int index;
   
   if(N>=P)
   {
      largestBetweenNAndP=N;
   }
   else
   {
      largestBetweenNAndP=P;
   }
   
   //Initialize columns and rows
   for(index=0;index<20; index++)
   {
      unsigned int seed;
      int temp=rand_r(&seed)%largestBetweenNAndP;
      column[index]=temp;
   }
   for(index=0;index<20; index++)
   {
      unsigned int seed;
      int temp=rand_r(&seed)%largestBetweenNAndP;
      row[index]=temp;
   }  
   
   // Print output elements
   for(m=0;m<20;m++)
   {
      printf("c[%d][%d]: %d \t",column[m], row[m], c[column[m]][row[m]]);
      printf("c1[%d][%d]: %d \n",column[m], row[m], c1[column[m]][row[m]]);
   }
   printf("\n");
}

int main(int argc, char *argv[])
{
    int threadNum = 0;
    RANGE *rangeList = NULL;
    int iCurrentThreadNum = 1;
    int i = 0;
    int success = 1;
    struct timeval startTime, endTime;
    double secDiff = 0.0;
    pthread_t *thr = NULL;
    if(argc != 2)
    {
        printf("Invalid arguments number. There should be only one. \n");
        return -1;
    }
    threadNum = atoi(argv[1]);
    if(threadNum == 0)
    {
        printf("Invalid thread number. Should be greater than 0.\n");
        return -2;
    }
    if(threadNum > M*P)
    {
        printf("Too many threads, truncated to %d\n", M*P);
        threadNum = M*P;
    }

    InitA();
    InitB();
    printf("Calculating reference matrix C1...\n");
    CalculateReference();

    printf("Threads\tSeconds\n");
    thr = malloc(sizeof(pthread_t) * threadNum);
    
    for(iCurrentThreadNum = 1; iCurrentThreadNum <= threadNum; iCurrentThreadNum++)
    {
        GenerateRange(iCurrentThreadNum, &rangeList);
        
        /* Create jobs */
        gettimeofday(&startTime, NULL);
        pthread_mutex_init(&c_mutex, NULL);
        
        for(i=0; i<iCurrentThreadNum; i++)
        {
            // Create a new thread
            success = pthread_create(&(thr[i]), NULL, 
                          CalculatePartialMartrix, (void*) &(rangeList[i]));
            if(success != 0)
            {
                printf("Cound not create thread %d!\n", i);
                return -3;
            }
        }

        /* Wait for jobs */
        for(i=0; i<iCurrentThreadNum; i++)
        {
            pthread_join(thr[i], NULL);
        }
        gettimeofday(&endTime, NULL);
        secDiff = (double)((endTime.tv_sec * 1000000 + endTime.tv_usec)
                       - (startTime.tv_sec * 1000000 + startTime.tv_usec))/1000000.0;
        printf("%d\t%.3lf\n", iCurrentThreadNum, secDiff);
        
        
        /* Print statement to check output elements */
        PrintCheckingElements();
        
        /* Print out message */
        if(iCurrentThreadNum >=2)
        {
            if(CheckCorrectness())
            {
               printf("No error\n");
            }
            else
            {
               printf("Error\n");
            }
        }
        printf("\n");
        
        /* Reset environment */
        DestoryRange(&rangeList);
        pthread_mutex_destroy(&c_mutex);
    }
    free(thr);
    return 0;
}
