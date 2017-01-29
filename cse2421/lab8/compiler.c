/*
 * Name: Shengjie Quan
 * Date: Apr/16/2015
 * Class: CSE 2421, TU/TR 4:10PM
 * ID: 0x05194c445
 */
#include <stdio.h>
#include <stdlib.h>

/*
 * print_head will print out the beginning part of an asm program
 * This includes section set up, global variable declaration and 
 * start point set up.
 * Argument: none
 * Return: none
 */
void print_head(void)
{
	printf("USE32\n");
    printf("section .data\n");
    // data_ptr is substitude with esi register
	printf("data_str times 0x1500000 db 0\n");
	printf("section .text\n");
	printf("global _start\n");
	printf("_start:\n");
    printf("xor esi, esi\n"); // clear esi so that data_ptr
                              // pointing to zero at beginning
    printf("mov ah, [data_str+esi]\n");
}

/*
 * print_foot will print out the ending part of an asm program
 * This includes proper terminating the program write_byte and 
 * read_byte function declaration.
 * Argument: none
 * Return: none
 */
void print_foot(void)
{
	printf("mov eax, 1 ; exit\n");
	printf("mov ebx, 0\n");
	printf("int 0x80\n");
	printf("read_byte:\n");
	printf("push ebp\n");
	printf("mov ebp, esp\n");
	printf("push ebx\n");
	printf("sub esp, 1\n");
	printf("mov eax, 3\n");
	printf("mov ebx, 0\n");
	printf("mov edx, 1\n");
	printf("mov ecx, esp\n");
	printf("int 0x80\n");
	printf("xor eax, eax\n");
	printf("mov al, byte [esp]\n");
	printf("add esp, 1\n");
	printf("pop ebx\n");
	printf("leave\n");
	printf("ret\n");
	printf("write_byte:\n");
	printf("push ebp\n");
	printf("mov ebp, esp\n");
	printf("push ebx\n");
	printf("mov eax, 4\n");
	printf("mov ebx, 1\n");
	printf("lea ecx, [ebp+0x8]\n");
	printf("mov edx, 1\n");
	printf("int 0x80\n");
	printf("pop ebx\n");
	printf("leave\n");
	printf("ret\n");
}

/*
 * processing_pedning_instruction will print out one asm command
 * corresponding to sucssecive <>+- instructions
 * Argument: instr
 *           the instruction to be processed, instr other than <>+-
 *           will be ignored 
 *           count
 *           the times instr repeat
 * Return: none
 */
void processing_pending_instruction(char instr, unsigned int count)
{
    // esi is data_ptr
    // ah is data cache, should also updata data_str when update ah
    switch(instr)
    {
    case '<':
        {
            if(count == 1)
            {
                printf("dec esi\n");
            }
            else
            {
                printf("sub esi, %d\n", count);
            }
            printf("mov ah, [data_str+esi]\n");
            break;
        }
    case '>':
        {
            if(count == 1)
            {
                printf("inc esi\n");
            }
            else
            {
                printf("add esi, %d\n", count);
            }
            printf("mov ah, [data_str+esi]\n");
            break;
        } 
    case '+':
        {
            if(count == 1)
            {
                printf("inc ah\n");
            }
            else
            {
                printf("add ah, %d\n", count);
            }
            printf("mov [data_str+esi], ah\n");
            break;
        }
    case '-':
        {
            if(count == 1)
            {
                printf("dec ah\n");
            }
            else
            {
                printf("sub ah, %d\n", count);
            }
            printf("mov [data_str+esi], ah\n");
            break;
        }

    }
}

/*
 * processing_instruction will print out the asm command correspond
 * to the instr specified by instr.  
 * Argument: instr
 *           the instruction to be processed 
 * Return: none
 */
void processing_instruction(char instr)
{
    // esi is data_ptr
    // ah is data cache, should also updata data_str when update ah
    static int label_stack[200000] = {0}; // label stack
    static int label_ptr= 0;  // the ptr of label used for jmp
    static int label_counter = 0;
    static char pending_instr = '\0'; // cache sucssesive <>+- instr and
    static unsigned int pending_counter = 0;// print one add/sub command
	switch(instr)
	{
	case '.':
		{
            if(pending_counter != 0)
            {
                // sucssesive instr end, print them out
                processing_pending_instruction(pending_instr,
                                               pending_counter);
                pending_instr = '\0'; // clear stored instruction
                pending_counter = 0;
            }
            // set cdecl and call write_byte
            printf("push eax\n");
            printf("sub esp, 0x4\n");
            printf("mov [esp], ah\n");
            printf("call write_byte\n");
            printf("add esp, 0x4\n");
            printf("pop eax\n");
            break;
		}
    case ',':
        {
            if(pending_counter != 0)
            {
                // sucssesive instr end, print them out
                processing_pending_instruction(pending_instr,
                                               pending_counter);
                pending_instr = '\0'; // clear stored instruction
                pending_counter = 0;
            }
            // set cdecl and call read_byte
            printf("push eax\n");
            printf("call read_byte\n");
            printf("mov bl, al\n");
            printf("pop eax\n");
            printf("mov ah, bl\n");
            printf("mov [data_str+esi], ah\n");
            break;
        }    
    case '[':
        {
            if(pending_counter != 0)
            {
                // sucssesive instr end, print them out
                processing_pending_instruction(pending_instr,
                                               pending_counter);
                pending_instr = '\0'; // clear stored instruction
                pending_counter = 0;
            }
            // read data and determine jump or not
            label_stack[label_ptr] = label_counter++; // reserve two
            label_stack[label_ptr+1] = label_counter++; // new labels
            printf("cmp ah, 0\n");
            printf("je label_%x\n", label_stack[label_ptr]); // jmp to ]
            printf("label_%x:\n", label_stack[label_ptr+1]); // for ] back
            label_ptr += 2;
            break;
        }    
    case ']':
        {   
            if(pending_counter != 0)
            {
                // sucssesive instr end, print them out
                processing_pending_instruction(pending_instr,
                                               pending_counter);
                pending_instr = '\0'; // clear stored instruction
                pending_counter = 0;
            }
            // read data and determine jump back or not
            printf("cmp ah, 0\n");
            printf("jne label_%x\n", label_stack[--label_ptr]);
            printf("label_%x:\n", label_stack[--label_ptr]);
            break;
        }    
    default:
        {
            if(instr == '<' || instr == '>' ||
               instr == '+' || instr == '-' )
            {
                // increment data pointer
                if(pending_instr != instr)
                {
                    // sucssesive instr end, print them out
                    processing_pending_instruction(pending_instr,
                                                   pending_counter);
                    // start to store new sequence of instr
                    pending_instr = instr;
                    pending_counter = 1;
                }
                else
                {
                    // sucssesive instr countinue, increment the counter
                    // of times it appear
                    pending_counter++;
                }
            }
        }    
	}
}

int main()
{
    char instr_cache = '\0'; // cache the instr read in
    print_head();
    instr_cache = getchar();
    while(instr_cache != '#')
    {
        // read in one instr at a time and process it
        processing_instruction(instr_cache);
        instr_cache = getchar();
    }
	print_foot();
	return EXIT_SUCCESS;
}
