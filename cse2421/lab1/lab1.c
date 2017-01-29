/*
 * NAME: Shengjie Quan
 * DATE: Jan/18/2015
 * CLASS: CSE 2421, T/R 4:10PM
 * ID: 0x05194c45
 */
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#define TRUE  1
#define FALSE 0

typedef int BOOL;

/*
 * is_prime Function
 *   Author: Shengjie Quan
 *   Purpose: Determine whether the non-negative
 *            integer passed in is prime or not.
 *   Argument: 
 *            ulIn: A non-negative integer.
 *   Output:  If ulIn is prime, will return TRUE(1).
 *            If not prime, will return FALSE(0).
 */
BOOL is_prime(unsigned int ulIn)
{
  unsigned long ulUpperBound = ulIn - 1;
  BOOL result = TRUE;
  unsigned long index = 0;
  if(ulIn == 0 || ulIn == 1)
  {
    // 0, 1 are not prime
    result = FALSE;
  }
  else if(ulIn == 2)
  {
    // 2 is prime
    result = TRUE;
  }
  else
  {
    // try to divide usIn by all number in (1, ulIn)
    for(index = 2; index <= ulUpperBound; index++)
    {
      if(ulIn % index == 0)
      {
	// ulIn is divisible by a integer in (1, ulIn)
	// so not a prime
	result = FALSE;
	break;
      }
    }
  }

  return result;
}

/*
 * Main Function
 *   Author: Shengjie Quan
 *   Purpose: Determine whether the non-negative
 *            integer entered by user is prime or
 *            not. Exit when detect 0.
 *   Input: A non-negative integer.
 *   Output:  If the number is prime, will print 
 *            "prime". If not prime, will print 
 *            "not prime".
 */
int main()
{
  unsigned long ulNumInput = 0;
  BOOL result = TRUE;
  while(TRUE)
  {
    scanf("%zu", &ulNumInput); //Read user input
    if(ulNumInput == 0)
    {
      break;
    }

    result = is_prime(ulNumInput); // make decision
    
    if(result == TRUE) // print result
    {
      printf("prime\n");
    }
    else
    {
      printf("not prime\n");
    }
  }
  return EXIT_SUCCESS;
}
