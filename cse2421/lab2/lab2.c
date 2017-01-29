/*
 * NAME:	Shengjie Quan
 * DATE:	Jan/25/2015
 * CLASS:	CSE 2421, T R 4:10PM
 * ID:		0x05194c45
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TRUE 1
#define FALSE 0

typedef int BOOL;

// properties for Restaurants
int iNumOfRest = 0;
char strRestName[21][52] = {'\0'};

// properties for People
int iNumOfPeople = 0;
char strPeopleName[101][27] = {'\0'};
int iVote[101][5] = {0}; // store vote data

// properties for voting progress
int iRestVoteCount[21] = {0};
BOOL bEliminated[21] = {FALSE};
// which vote of a person is counted
int iConsideredVotePosition[101] = {[0 ... 100] = 1};
int iCountTotal = 0;

/*
 * eliminate
 *   Author: Shengjie Quan
 *   Purpose: to get a list of restaurant eliminated in
 *            this round and set statue of the resturant
 *            to eliminated (in bEliminated[])
 *   Arugment: lengthOfList
 *              return length of returning list
 *   Return: a list of int storing index of eliminated 
 *           restaurant in this round length of list =
 *           lengthOfList
 */
int* eliminate(int *lengthOfList)
{
  int minVote = 100000; // a very big num
  int listLengthTmp = 0; // will return to lengthOfList
  int *returnList = (int*)malloc(101*sizeof(int));
  int index = 0;

  for(index = 1; index <= iNumOfRest; index++)
  {
    if(!bEliminated[index] && iRestVoteCount[index] < minVote)
    {
      minVote = iRestVoteCount[index];
    }
  }
  
  for(index = 1; index <= iNumOfRest; index++)
  {
    if(!bEliminated[index] && iRestVoteCount[index] == minVote)
    {
      listLengthTmp++;
      returnList[listLengthTmp] = index;
      bEliminated[index] = TRUE;
    }
  }

  *lengthOfList = listLengthTmp;
  return returnList;
}

/*
 * determined
 *   Author: Shengjie Quan
 *   Purpose: to see whether the vote got result or not
 *            (a restaurant get more than 50% of vote)
 *   Arugment: None
 *   Return: the index of the restaurant or -1 (no winner)
 */
int determined(void)
{
  int result = -1;
  int index = 0;
  for(index = 1; index <= iNumOfRest; index++)
  {
    if(iRestVoteCount[index]*2 > iCountTotal)
    {
      // whether vote to a restaurant surpas 50%, yes
      result = index;
      break;
    }
  }
  return result;
}

/*
 * vote_process
 *   Author: Shengjie Quan
 *   Purpose: run a cycle of vote
 *   Arugment: None
 *   Return: the index of restaurant win or 
 *           -1 (something goes wrong)
 */
int vote_process(void)
{
  int winner = -1;
  int index = 0;
  int index_2 = 0;
  int *listOfEliminate = NULL;
  int lengthOfEliminated = 0;
  for(index = 1; index <= iNumOfPeople; index++)
  {
    iRestVoteCount[iVote[index][1]]++; // top favoriate
    iCountTotal++;
    iRestVoteCount[iVote[index][4]]--; // least favoriate
  }
  winner = determined(); // some restaurant win or not
  while(winner == -1)
  {
    // no restaurant win
    listOfEliminate = eliminate(&lengthOfEliminated);
    for(index = 1; index <= lengthOfEliminated; index++)
    {
      // go over eliminated list
      for(index_2 = 1; index_2 <= iNumOfPeople; index_2++)
      {
	// go over list of people to see whether (s)he vote to
	// eliminated restaurant or not
	if(1<=iConsideredVotePosition[index_2] || 
	      iConsideredVotePosition[index_2]<=3)
	{
	  // (s)he's vote still count
	  if(iVote[index_2][iConsideredVotePosition[index_2]] == 
	     listOfEliminate[index])
	  {
	    // (s)he chose eliminated restaurant
	    iConsideredVotePosition[index_2]++; // next favoriate
	    if(1<=iConsideredVotePosition[index_2] || 
	          iConsideredVotePosition[index_2]<=3)
	    {
	      // new vote still count
	      // revote
	      if(!bEliminated[iVote[index_2]
			     [iConsideredVotePosition[index_2]]])
	      {
		iRestVoteCount[iVote[index_2]
			      [iConsideredVotePosition[index_2]]]++;
	      }
	      else
	      {
		// (s)he chose eliminated restaurant
		iConsideredVotePosition[index_2]++; // next favoriate
		if(1<=iConsideredVotePosition[index_2] || 
		      iConsideredVotePosition[index_2]<=3)
		{
		  // new vote still count
		  // revote
		  if(!bEliminated[iVote[index_2]
				[iConsideredVotePosition[index_2]]])
		  {
		    iRestVoteCount[iVote[index_2]
				  [iConsideredVotePosition[index_2]]]++;
		  }
		  else
		  {
		    // no more other choice
		    iConsideredVotePosition[index_2]++;
		    // lose a vote
		    iCountTotal--;
		  }
		}
		else
		{
		  // lose a +1
		  iCountTotal--;
		}
		
	      }
	    }
	    else
	    {
	      // lose a +1
	      iCountTotal--;
	    }
	  }
	}
      }
    }
    winner = determined();
    free(listOfEliminate);
    listOfEliminate = NULL;
  }

  return winner;
}

/*
 * Main Function
 *   Author: Shengjie Quan
 *   Purpose: Control the program of a 
 *            restaurant voting system
 *   Arugment: None
 *   Return: always 0
 */
int main(void)
{
  FILE *fpIn = fopen("input_1", "r");
  FILE *fpOut = fopen("output_1", "w");
  int index = 0;
  int winner = -1;
  int counter = 0; // used to count 
  
  // grab info of restaurants
  fscanf(fpIn, "%d", &iNumOfRest);
  for(index = 0; index <= iNumOfRest; index++)
  {
    fgets(strRestName[index], 52, fpIn);
    // printf("%s", strRestName[index]);
  } 
  // printf("%s", strRestName[iNumOfRest]);

  // grab info of people
  fscanf(fpIn, "%d", &iNumOfPeople);
  // printf("%d\n", iNumOfPeople);
  for(index = 1; index <= iNumOfPeople; index++)
  {
    fscanf(fpIn, "%s %d %d %d %d", &strPeopleName[index],
	   &iVote[index][1], &iVote[index][2], &iVote[index][3],
	   &iVote[index][4]);
    // printf("%s\n", strPeopleName[index]);
  }

  // simulate voting
  winner = vote_process();
  //printf("%s\n", strRestName[winner]);
  
  // print out
  fprintf(fpOut, "%s", strRestName[winner]);
  fprintf(fpOut, "Happy:\n");
  counter = 0;
  for(index = 1; index <= iNumOfPeople; index++)
  {
    // happle people
    if(iVote[index][1] == winner ||
       iVote[index][2] == winner ||
       iVote[index][3] == winner)
    {
      counter++; // count num of people fall in happe
      fprintf(fpOut, "%s\n", strPeopleName[index]);
    }
  }
  if(counter == 0)
  {
    // no one happy
    fprintf(fpOut, "none\n");
  }
  counter = 0; // reset counter
  fprintf(fpOut, "Sad:\n");
  for(index = 1; index <= iNumOfPeople; index++)
  {
    // sad people
    if(iVote[index][4] == winner)
    {
      counter++; // count num of people fall in sad
      fprintf(fpOut, "%s\n", strPeopleName[index]);
    }
  }
  if(counter == 0)
  {
    // no one sad
    fprintf(fpOut, "none\n");
  }
  fclose(fpOut);
  fclose(fpIn);
  return EXIT_SUCCESS;
}
