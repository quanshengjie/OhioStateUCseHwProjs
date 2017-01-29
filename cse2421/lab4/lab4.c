/*
 * Name: Shengjie Quan
 * Date: Feb/16/2015
 * Class: CSE 2421, TU/TR 4:10PM
 * ID: 0x05194c445
 */

#include <stdio.h>
#include <stdlib.h>
#include <assert.h>

//#define NDEBUG

#include "temperature.h"

#define ADD      0
#define MUL      1
#define SQRT     2
#define SQRE     3

// temperature manipulation function pointer type redefine
typedef int (*LPTEMPERATUREFUNCTION)(LPDATA data, double arg1, double arg2);

// store dimension of the matrix
int x_dimension = 0;
int y_dimension = 0;
int z_dimension = 0;

// store the 3 dimensionalmatrix in DATA
DATA ***matrix = NULL;

// temperature manipulate function array
LPTEMPERATUREFUNCTION manipulation[4] = {NULL};

/*
 * init
 * Purpose:
 *         allocate memory for matrix on the heap, init temperature
 *         manipulation function array so that they are pointing to 
 *         correct function.
 * Argument: none
 * Require:
 *          x_dimension is set and
 *          y_dimension is set and
 *          z_dimension is set
 * Return: 0 if success, failure code if fail
 */
int init(void)
{
  int result = 0;
  int index_out = 0, index_in = 0;
  
  // allocate space for matrix
  matrix = malloc(x_dimension * sizeof(DATA **));
  assert(matrix);
  if(!matrix)
  {
    result = -1;
  }
  for(index_out = 0; index_out < x_dimension; index_out++)
  {
    matrix[index_out] = malloc(y_dimension * sizeof(DATA *));
    assert(matrix[index_out]);
    if(!matrix[index_out])
    {
      result = -2;
    }
    for(index_in = 0; index_in < y_dimension; index_in++)
    {
      matrix[index_out][index_in] = malloc(z_dimension * sizeof(DATA));
    }
  }

  // init manipulation function array
  manipulation[ADD] = temp_add;
  manipulation[MUL] = temp_multiply;
  manipulation[SQRT] = temp_square_root;
  manipulation[SQRE] = temp_square;
  return result;
}

/*
 * finifh
 * Purpose:
 *         deallocate memory of matrix on the heap.
 * Argument: none
 * Require:
 *          x_dimension is set and
 *          y_dimension is set and
 *          z_dimension is set and 
 *          matrix is allocated on heap
 * Return: none
 */
void finish(void)
{
  int index_out = 0, index_in = 0;
  for(index_out = 0; index_out < x_dimension; index_out++)
  {
    for(index_in = 0; index_in < y_dimension; index_in++)
    {
      free(matrix[index_out][index_in]);
    }
    free(matrix[index_out]);
  }
  free(matrix);
}

/*
 * matrix_manipulation
 * Purpose:
 *         perform manipulation function in the function array
 *         sepecified by instr to all elements of the matrix
 * Argument: instr
 *           The subscript of function invoked stored in the 
 *           function array
 *           arg1
 *           arg1 required by manipulation functions
 *           arg2
 *           arg2 required by the manipulation functons
 * Require:
 *          x_dimension is set and
 *          y_dimension is set and
 *          z_dimension is set and
 *          manipulation[] is initialized
 * Return: 0 if success, failure code from manipulation functions
 *         if fail
 */
int matrix_manipulation(int instr, double arg1, double arg2)
{
  int result = 0;
  int i_out = 0, i_mid = 0, i_in = 0;
  for(i_out = 0; i_out < x_dimension; i_out++)
  {
    for(i_mid = 0; i_mid < y_dimension; i_mid++)
    {
      for(i_in = 0; i_in < z_dimension; i_in++)
      {
	result = manipulation[instr](&(matrix[i_out][i_mid][i_in])
                              , arg1, arg2);
	assert(result == 0);
	if(result != 0)
	{
	  return result;
	}
      }
    }
  }
  
  return result;
}

/*
 * Main Function
 * Purpose:
 *         Read in from standard input, a weather data matrix
 *         and manipulate it's data according to instruction 
 *         and output result into standard output.
 * Argument: none
 * Require:
 *         input is valid
 * Return:
 *         EXIT_SUCCESS if run success or fail code if meet problem 
 */
int main(void)
{
  int result = EXIT_SUCCESS;
  int i_in = 0, i_mid = 0, i_out = 0;
  
  int instr = 0;
  double arg1 = 0.0;
  double arg2 = 0.0;
  
  // read in dimesnion
  scanf("%d %d %d", &x_dimension, &y_dimension, &z_dimension);
  // prepare matrix and function pointer array
  assert((result = init()) == 0);
  if(result != 0)
  {
    return result;
  }

  // read in matrix
  for(i_out = 0; i_out < x_dimension; i_out++)
  {
    for(i_mid = 0; i_mid < y_dimension; i_mid++)
    {
      for(i_in = 0; i_in < z_dimension; i_in++)
      {
	scanf("%lf %lf", &(matrix[i_out][i_mid][i_in].temperature_in_celsius),
	                 &(matrix[i_out][i_mid][i_in].density_in_kg_per_m2));
	//printf("%lf %lf", matrix[i_out][i_mid][i_in].temperature_in_celsius,
	//               matrix[i_out][i_mid][i_in].density_in_kg_per_m2);
      }
    }
  }

  // read in manipulation instructions
  while(scanf("%d %lf %lf", &instr, &arg1, &arg2) == 3) // expext to fill 3
  {
    assert((result = matrix_manipulation(instr, arg1, arg2)) == 0);
    if(result != 0)
    {
      return result;
    }
  }

  // print result of manipulation
  for(i_out = 0; i_out < x_dimension; i_out++)
  {
    for(i_mid = 0; i_mid < y_dimension; i_mid++)
    {
      for(i_in = 0; i_in < z_dimension; i_in++)
      {
	printf("%lf %lf\n", matrix[i_out][i_mid][i_in].temperature_in_celsius,
	                  matrix[i_out][i_mid][i_in].density_in_kg_per_m2);
      }
    }
  }

  // clean up
  finish();

  return result;
}

