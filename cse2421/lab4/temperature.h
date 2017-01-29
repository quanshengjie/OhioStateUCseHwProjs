/*
 * Name: Shengjie Quan
 * Date: Feb/16/2015
 * Class: CSE 2421, TU/TR 4:10PM
 * ID: 0x05194c445
 */

// the struct holding the data in the matrix that we will be processing
typedef struct spacial_data
{
    double temperature_in_celsius;
    double density_in_kg_per_m2;
} *LPDATA, DATA;

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
 *         a integer, 0 if succeed, otherwise fail code
 */
int temp_add(LPDATA data, double arg1, double arg2);

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
int temp_multiply(LPDATA data, double arg1, double arg2);

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
int temp_square_root(LPDATA data, double arg1, double arg2);

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
int temp_square(LPDATA data, double arg1, double arg2);
