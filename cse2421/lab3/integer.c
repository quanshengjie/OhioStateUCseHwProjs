/*
 * Name: Shengjie Quan
 * Date: Feb/01/2015
 * Class: CSE 2421, TU/TR 4:10PM
 * ID: 0x05194c445
 */

#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <string.h>
#include "integer.h"

#define NDEBUG //disable debug mode


LPIMMENSEINT number1 = NULL; // the first operation number
LPIMMENSEINT number2 = NULL; // the second operation number
LPIMMENSEINT result = NULL; // thne result of the operation


/*
 * create_immense_int_from_string
 * Purpose:
 *         Create a IMMENSEINT structure out of a string
 * Argument ch:
 *         The pointer to the head of the string from which
 *         the IMMENSEINT is created from
 * Require:
 *         ch is a string of non-negative interger with no 
 *         leading zero(exclude number 0) and |ch| > 0
 * Return:
 *         The pointer to the created IMMENSEINT structure
 */
LPIMMENSEINT create_immense_int_from_string(char ch[])
{
  assert(strlen(ch) > 0);
  // assign menory
  LPDIGIT current = NULL;
  int index = 0;
  LPIMMENSEINT lpImInt = malloc(sizeof(IMMENSEINT));
  assert(lpImInt != NULL);
  // create tail
  lpImInt->preTail = &(lpImInt->number);
  // create link list
  current = lpImInt->preTail;
  index = strlen(ch) - 1;
  while(index >= 0)
  {
    current->next = malloc(sizeof(DIGIT));
    assert(current->next != NULL);
    current->next->prv = current;
    current = current->next;
    current->number = ch[index] - '0'; // convert char to number
    index--;
  }
  lpImInt->head = current;
  
  return lpImInt;
}

/*
 * free_immense_int
 * Purpose:
 *         Dellocate a IMMENSEINT structure sepecified by lpInt
 * Argument lpInt:
 *         The pointer to the IMMENSEINT structure which
 *         the function will deallocate
 * Require:
 *         lpInt /= NULL
 * Return:
 *         (none)
 */
void free_immense_int(LPIMMENSEINT lpInt)
{
  assert(lpInt != NULL);
  LPDIGIT current = lpInt->head;
  LPDIGIT prvious = current->prv;
  while(current != lpInt->preTail)
  {
    // dellocate the link list
    current->next = NULL;
    current->prv = NULL;
    free(current);
    current = prvious;
    prvious = current->prv;
  }
  current->next = NULL;
  current->prv = NULL;
  current = NULL;
  prvious =NULL;
  lpInt->preTail = NULL;
  lpInt->head = NULL;
  // dellocate the immense integer structure
  free(lpInt); 
}

/*
 * print_immense_int
 * Purpose:
 *         Print a IMMENSEINT structure sepecified by lpInt
 *         to the output string
 * Argument lpInt:
 *         The pointer to the IMMENSEINT structure which
 *         the function will print
 * Require:
 *         lpInt /= NULL
 * Return:
 *         (none)
 */
void print_immense_int(LPIMMENSEINT lpInt)
{
  assert(lpInt != NULL);
  LPDIGIT current = lpInt->head;
  while(current != lpInt->preTail)
  {
    printf("%d", current->number);
    current = current->prv;
  }
  putchar('\n');
}

/*
 * add
 * Purpose:
 *         Add two IMMENSEINT number(lpNumber1 and lpNumber2) 
 *         together and return a new IMMENSEINT number 
 *         storing the result
 * Argument lpNumber1:
 *         The pointer to the first IMMENSEINT number
 *          lpNumber2:
 *         The pointer to the second IMMENSEINT number
 * Require:
 *         lpNumber1 /= NULL lpNumber2 /= NULL
 * Return:
 *         the result of addition as a new IMMENSEINT number
 */
LPIMMENSEINT add(LPIMMENSEINT lpNumber1, LPIMMENSEINT lpNumber2)
{
  LPIMMENSEINT result = NULL;
  int carrier = 0;
  LPDIGIT current = NULL;
  LPDIGIT num1Current = NULL;
  LPDIGIT num2Current = NULL;
  int num1 = 0, num2 = 0;
  
  assert(lpNumber1 != NULL);
  assert(lpNumber2 != NULL);
  result = malloc(sizeof(IMMENSEINT));
  assert(result != NULL);
  // create tail
  result->preTail = &(result->number);
  // create link list
  current = result->preTail;
  num1Current = lpNumber1->preTail;
  num2Current = lpNumber2->preTail;
  while(num1Current != lpNumber1->head || num2Current != lpNumber2->head)
  {
    current->next = malloc(sizeof(DIGIT));
    assert(current->next != NULL);
    current->next->prv = current;
    current = current->next;

    // extract digit from number1, number1 move forward
    if(num1Current != lpNumber1->head)
    {
      num1 = num1Current->next->number;
      num1Current = num1Current->next;
    }
    else
    {
      num1 = 0;
    }
    // extract digit from number2, number2 move forward
    if(num2Current != lpNumber2->head)
    {
      num2 = num2Current->next->number;
      num2Current = num2Current->next;
    }
    else
    {
      num2 = 0;
    }
    current->number = (num1+num2+carrier) % 10;
    carrier = (num1+num2+carrier) / 10;
  }
  if(carrier != 0)
  {
    current->next = malloc(sizeof(DIGIT));
    assert(current->next != NULL);
    current->next->prv = current;
    current = current->next;
    // two interger addition, carrier must be between 0 to 9
    current->number = carrier;
  }
  result->head = current;
  
  return result;
}

/*
 * sub
 * Purpose:
 *         Subtract lpNumber2 from lpNumber2 and return 
 *         a new IMMENSEINT number storing the result
 * Argument lpNumber1:
 *         The pointer to the first IMMENSEINT number
 *          lpNumber2:
 *         The pointer to the second IMMENSEINT number
 * Require:
 *         lpNumber1 /= NULL & lpNumber2 /= NULL
 *         lpNumber1 >= lpNumber2
 * Return:
 *         the result of substraction as a new IMMENSEINT number
 */
LPIMMENSEINT sub(LPIMMENSEINT lpNumber1, LPIMMENSEINT lpNumber2)
{
  LPIMMENSEINT result = NULL;
  int borrow = 0;
  LPDIGIT current = NULL;
  LPDIGIT prvious = NULL;
  LPDIGIT num1Current = NULL;
  LPDIGIT num2Current = NULL;
  int num1 = 0, num2 = 0;
  
  assert(lpNumber1 != NULL);
  assert(lpNumber2 != NULL);
  result = malloc(sizeof(IMMENSEINT));
  assert(result != NULL);
  // create tail
  result->preTail = &(result->number);
  // create link list
  current = result->preTail;
  num1Current = lpNumber1->preTail;
  num2Current = lpNumber2->preTail;
  while(num1Current != lpNumber1->head || num2Current != lpNumber2->head)
  {
    current->next = malloc(sizeof(DIGIT));
    assert(current->next != NULL);
    current->next->prv = current;
    current = current->next;

    // extract digit from number1, number1 move forward
    if(num1Current != lpNumber1->head)
    {
      num1 = num1Current->next->number;
      num1Current = num1Current->next;
    }
    else
    {
      num1 = 0;
    }
    // extract digit from number2, number2 move forward
    if(num2Current != lpNumber2->head)
    {
      num2 = num2Current->next->number;
      num2Current = num2Current->next;
    }
    else
    {
      num2 = 0;
    }

    if(num1-borrow >= num2)
    {
      current->number = num1-borrow-num2;
      borrow = 0;
    }
    else
    {
      num1 += 10;
      current->number = num1-borrow-num2;
      borrow = 1;
    }
  }
  while(current->number == 0 && current != result->preTail->next)
  {
    prvious = current;
    current = current->prv;
    free(prvious);
  }
  result->head = current;
  
  return result;
}


/*
 * Main Function
 * Purpose:
 *         Control the application. The application will read
 *         three lines of user input. The fist line is a non-negative
 *         integer. The second line is a non-negative integer. The
 *         Third line is a sign of operation (+/-). The application 
 *         will perform the sepecified operation to the two integer.
 *         Both input integer should be at least a digit long but has
 *         no limitation on their upper bound. If perform subtraction,
 *         The first integer must be greater or equal to the second one.
 * Argument 
 *         (none)
 * Return:
 *         always EXIT_SUCCESS
 */
int main(void)
{
  char *str = NULL;
  char charIn = '\0';
  int size = 1;

  // prepare space for str
  str = calloc(1, sizeof(char));
  assert(str != NULL);
  while((charIn = getchar()) != '\n') // read in user input
  {
    // continue if not inputing \n
    str[size-1] = charIn;
    // request one more extra space for str
    size++;
    str = realloc(str, size*sizeof(char));
    assert(str != NULL);
  }
  str[size-1] = '\0'; // append string ending
  number1 = create_immense_int_from_string(str); // convert from string

  // now the second number
  // preparing for input
  free(str);
  str = calloc(1, sizeof(char));
  assert(str != NULL);
  size = 1;
  charIn = '\0';

  while((charIn = getchar()) != '\n') // read in user input
  {
    // continue if not inputing \n
    str[size-1] = charIn;
    // request one more extra space for str
    size++;
    str = realloc(str, size*sizeof(char));
    assert(str != NULL);
  }
  str[size-1] = '\0'; // append string ending
  number2 = create_immense_int_from_string(str); // convert from string
  free(str);
  charIn = getchar();
  if(charIn == '+')
  {
    // addition
    result = add(number1, number2);
  }
  else if(charIn == '-')
  {
    // subtraction
    result = sub(number1, number2);
  }
  
  
  print_immense_int(result);
  free_immense_int(number1);
  free_immense_int(number2);
  free_immense_int(result);
  return EXIT_SUCCESS;
}
