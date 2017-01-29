/*
 * Name: Shengjie Quan
 * Date: Feb/01/2015
 * Class: CSE 2421, TU/TR 4:10PM
 * ID: 0x05194c445
 */

// This structure describe the link lisk 
// structure of immense integer
typedef struct digit
{
  int number; // the digit
  struct digit *next; // point to the next digit
  struct digit *prv; // point to the previous digit
} DIGIT, *LPDIGIT;

//This structure describe the integer
typedef struct immense_int_t
{
  DIGIT number; // link list of the integer
  LPDIGIT preTail; // tail->next is the tail(last digit) of the integer
  LPDIGIT head; // head is the head(first digit) of the integer
} IMMENSEINT, *LPIMMENSEINT;
