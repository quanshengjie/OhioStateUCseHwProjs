/*
 * Author:    Shengjie Quan
 * Email:     quan.48@osu.edu
 * Section:   WF 9:35
 * Professor: Doreen P Close
 */

#include <stdio.h>
#include <time.h>
#include <stdlib.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>

#define BUFFER_SIZE         4
#define EMPTY_FLAG          -100
#define SUCCESS             0
#define FAILED              -1
#define THREAD_SLEEP_FACTOR 5

typedef int BUFFER_ITEM;

BUFFER_ITEM buffer[BUFFER_SIZE];
int start = -1;
int end   = -1;
int sleepTime = 0;
int rand_seed = 1;
pthread_mutex_t mutex;
sem_t full;
sem_t empty;

/*
 * Insert the item into buffer which is implemented 
 * as a circular array. Return SUCCESS if success
 * otherwise return FAILED.
 */
int insert_item(BUFFER_ITEM item)
{
    int result = FAILED;
    int insertLocation = (end+1) % BUFFER_SIZE;

    if(buffer[insertLocation] == EMPTY_FLAG)
    {
        buffer[insertLocation] = item;
        end = insertLocation;
        result = SUCCESS;
        printf("---> Producer produce %d\n", item);
    }

    return result;
}

/*
 * Remove an item from buffer which is implemented 
 * as a circular array. Return SUCCESS if success
 * otherwise return FAILED. Removed item is stored
 * in item, the pointer passed in.
 */
int remove_item(BUFFER_ITEM *item)
{
    int result = FAILED;
    int removeLocation = (start+1) % BUFFER_SIZE;

    if(buffer[removeLocation] != EMPTY_FLAG)
    {
        *item = buffer[removeLocation];
        buffer[removeLocation] = EMPTY_FLAG;
        start = removeLocation;
        result = SUCCESS;
        printf("<--- Consumer consume %d\n", *item);
    }

    return result;
}

/*
 * Init all item in the buffer to EMPTY_FLAG
 */
void init_buffer()
{
    int i=0;
    for(i=0; i<BUFFER_SIZE; i++)
    {
        buffer[i] = EMPTY_FLAG;
    }
}

/*
 * The producer thread
 */
void* producer(void *producerId)
{
    BUFFER_ITEM product;
    int id = *((int*) producerId);
    int time;
    int local_rand_seed = rand_seed + id;
    do
    {
        time = rand_r(&local_rand_seed) % (sleepTime / THREAD_SLEEP_FACTOR);
        printf("producer %d sleeps for %d\n", id, time);
        sleep(time);
        product = rand_r(&rand_seed);
        sem_wait(&empty);
        pthread_mutex_lock(&mutex);

        if(insert_item(product) != SUCCESS)
        {
            printf("Producer %d failed to insert %d.\n", id, product);
        }

        pthread_mutex_unlock(&mutex);
        sem_post(&full);
    } while(1);
}

/*
 * The consumer thread
 */
void* consumer(void *consumerId)
{
    BUFFER_ITEM goods;
    int id = *((int*) consumerId);
    int time;
    int local_rand_seed = rand_seed + id;
    do
    {  
        time = rand_r(&local_rand_seed) % (sleepTime / THREAD_SLEEP_FACTOR);
        printf("consumer %d sleeps for %d\n", id, time);
        sleep(time);
        sem_wait(&full);
        pthread_mutex_lock(&mutex);

        if(remove_item(&goods) != SUCCESS)
        {
            printf("    Consumer %d failed to consumer an item.\n", id);
        }

        pthread_mutex_unlock(&mutex);
        sem_post(&empty);
    } while(1);
}

int main(int argc, char **argv)
{
    int i=0;
    int *numberSequence;
    int producerNum = 0;
    int consumerNum = 0;
    pthread_t thr;
    int success;

    if(argc != 4)
    {
        printf("Invalid arguments number.\n");
        return -1;
    }
    sleepTime = atoi(argv[1]);
    if(sleepTime <= 0)
    {
        printf("The first argument is invalid.\n");
        printf("Should set a time period greater than 0\n");
        return -1;
    }
    producerNum = atoi(argv[2]);
    consumerNum = atoi(argv[3]);
    numberSequence = malloc(sizeof(int) * 
                   (consumerNum > producerNum ? consumerNum : producerNum));
    init_buffer();
    rand_seed = time(0);
    pthread_mutex_init(&mutex, NULL);
    sem_init(&full, 0, 0);
    sem_init(&empty, 0, BUFFER_SIZE);

    for(i=1; i<=producerNum; i++)
    {
        numberSequence[i-1] = i;
        pthread_create(&thr, NULL, &producer, (void*) &numberSequence[i-1]);
        if(success != 0)
        {
            printf("Cannot create producer: %d!\n", i);
            return -1;
        }
    }
    for(i=1; i<=consumerNum; i++)
    {
        numberSequence[i-1] = i;
        pthread_create(&thr, NULL, &consumer, (void*) &numberSequence[i-1]);
        if(success != 0)
        {
            printf("Cannot create consumer: %d!\n", i);
            return -1;
        }
    }

    sleep(sleepTime);
    pthread_mutex_destroy(&mutex);

    return 0;
}
