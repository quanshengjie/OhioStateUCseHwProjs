/*
 * Name: Shengjie Quan
 * Date: Feb/16/2015
 * Class: CSE 2421, TU/TR 4:10PM
 * ID: 0x05194c445
 */

#include <math.h>
#include <stdlib.h>
#include <assert.h>
#include "temperature.h"

#define ZERO_ALLOWANCE 0.0000001

/*
 * temp_add
 * Purpose:
 *         Manipulate temperature data by adding arg1 and density
 *         by adding arg2. Temperature comes from data.
 * Argument data:
 *         The pointer to a DATA going to be manipulated
 *          arg1:
 *         The integer adds to temperature
 *          arg2:
 *         The integer adds to density
 * Require:
 *         data /= null
 * Return:
 *         a integer, 0 if succeed, otherwise fail 
 */
int temp_add(LPDATA data, double arg1, double arg2)
{
  int result = 0;
  // test data, require to be not NULL
  assert(data != NULL);
  if(data == NULL)
  {
    result = -1;
  }

  // manipulate data
  data->temperature_in_celsius += arg1;
  data->density_in_kg_per_m2 += arg2;
  
  return result;
}

/*
 * temp_multiply
 * Purpose:
 *         Manipulate temperature data by multipling arg1 and density
 *         by multipling arg2. Temperature comes from data.
 * Argument data:
 *         The pointer to a DATA going to be manipulated
 *          arg1:
 *         The integer adds to temperature
 *          arg2:
 *         The integer adds to density
 * Require:
 *         data /= null
 * Return:
 *         a integer, 0 if succeed, otherwise fail code
 */
int temp_multiply(LPDATA data, double arg1, double arg2)
{
  int result = 0;
  // test data, require to be not NULL
  assert(data != NULL);
  if(data == NULL)
  {
    result = -1;
  }

  // manipulate data
  data->temperature_in_celsius *= arg1;
  data->density_in_kg_per_m2 *= arg2;
  
  return result;
}

/*
 * temp_square_root
 * Purpose:
 *         Manipulate temperature data by take square root if arg1 /= 0
 *         and density by take square root arg2 /= 0.
 *          Temperature comes from data.
 * Argument data:
 *         The pointer to a DATA going to be manipulated
 *          arg1:
 *         The integer adds to temperature
 *          arg2:
 *         The integer adds to density
 * Require:
 *         data /= null
 * Return:
 *         a integer, 0 if succeed, otherwise fail code
 */
int temp_square_root(LPDATA data, double arg1, double arg2)
{
  int result = 0;
  // test data, require to be not NULL
  assert(data != NULL);
  if(data == NULL)
  {
    result = -1;
  }

  // manipulate data
  if(!(-1*ZERO_ALLOWANCE < arg1 && arg1 < ZERO_ALLOWANCE))
  {
    data->temperature_in_celsius = sqrt(data->temperature_in_celsius);
  }
  if(!(-1*ZERO_ALLOWANCE < arg2 && arg2 < ZERO_ALLOWANCE))
  {
    data->density_in_kg_per_m2 = sqrt(data->density_in_kg_per_m2);
  }

  return result;
}

/*
 * temp_square
 * Purpose:
 *         Manipulate temperature data by take square if arg1 /= 0
 *         and density by take root arg2 /= 0.
 *          Temperature comes from data.
 * Argument data:
 *         The pointer to a DATA going to be manipulated
 *          arg1:
 *         The integer adds to temperature
 *          arg2:
 *         The integer adds to density
 * Require:
 *         data /= null
 * Return:
 *         a integer, 0 if succeed, otherwise fail code
 */
int temp_square(LPDATA data, double arg1, double arg2)
{
  int result = 0;
  // test data, require to be not NULL
  assert(data != NULL);
  if(data == NULL)
  {
    result = -1;
  }

  // manipulate data
  if(!(-1*ZERO_ALLOWANCE < arg1 && arg1 < ZERO_ALLOWANCE))
  {
    data->temperature_in_celsius *= data->temperature_in_celsius;
  }
  if(!(-1*ZERO_ALLOWANCE < arg2 && arg2 < ZERO_ALLOWANCE))
  {
    data->density_in_kg_per_m2 *= data->density_in_kg_per_m2;
  }
  
  return result;
}
