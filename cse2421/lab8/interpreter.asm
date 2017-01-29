;
;Name: Shengjie Quan
;Date: Apr/16/2015
;Class: CSE 2421, TU/TR 4:10PM
;ID: 0x05194c445
;

USE32
section .data
instr_ptr dd 0x00000000	; the instruction pointer
data_ptr dd 0x00000000	; the data pointer
program_str times 0x1500000 db 0 ; 15mb of program string array
data_str times 0x1500000 db 0	;15mb of data string array
 
section .text
global _start
_start:

xor edi, edi ; zero edi and use as index when reading the program
read_start:
call read_byte
cmp al, '#' ; terminate reading process if read in #
je read_end
mov [program_str+edi], al ; store the instruction to the string
inc edi
jmp read_start	; repeat the process
read_end:

mov edi, [instr_ptr]	; cache the instruction pointer
mov esi, [data_ptr]	; cache the data pointer
exe_start:
mov al, [program_str+edi] ; cache the instruction
mov ah, [data_str+esi]	  ; cache the data
cmp al, 0
je exe_end	; when get '\0', terminate execution

cmp al, '>'
jne left_arrow
inc esi 	; increment data pointer
jmp exe_one_done
left_arrow:
cmp al, '<'
jne plus
dec esi		; decrement data pointer
jmp exe_one_done
plus:
cmp al, '+'
jne minus
inc ah		; increment data
mov [data_str+esi], ah ; store modified data back to memory
jmp exe_one_done
minus:
cmp al, '-'
jne dot
dec ah		; decrement data
mov [data_str+esi], ah ; store modified data back to memory
jmp exe_one_done
dot:
cmp al, '.'
jne period
push eax
sub esp, 0x4
mov [esp], ah
call write_byte	; output the data
add esp, 0x4
pop eax
jmp exe_one_done
period:
cmp al, ','
jne left_b
push eax
call read_byte	; read in one byte
mov bl, al
pop eax
mov ah, bl	; updata data cache
mov [data_str+esi], ah ; store modified data back to memory
jmp exe_one_done
left_b:
cmp al, '['
jne right_b
cmp ah, 0
jne exe_one_done
;if is zero
mov ecx, 1	; use ecx to count how many [ and ] passed
left_b_find_r_start:
inc edi
cmp BYTE [program_str+edi], '['
jne if_right
inc ecx
if_right:
cmp BYTE [program_str+edi], ']'
jne left_b_find_r_start
dec ecx
cmp ecx, 0
jne left_b_find_r_start
jmp exe_one_done
right_b:
cmp al, ']'
jne exe_one_done
cmp ah, 0
je exe_one_done
;if is not zero
mov ecx, 1	; use ecx to count how many [ and ] passed
right_b_find_l_start:
dec edi
cmp BYTE [program_str+edi], ']'
jne if_left
inc ecx
if_left:
cmp BYTE [program_str+edi], '['
jne right_b_find_l_start
dec ecx
cmp ecx, 0
jne right_b_find_l_start
jmp exe_one_done

exe_one_done:
inc edi		; increment instruction pointer
mov [instr_ptr], edi ; store instruction pointer back to manery
mov [data_ptr], esi  ; store data pointer back to memory
jmp exe_start
exe_end:

mov eax, 1 ; exit
mov ebx, 0
int 0x80
	

read_byte:
	push ebp
	mov ebp, esp

	push ebx ; save ebx
	sub esp, 1 ; resever 1 byte on stack for the returning character
	mov eax, 3 ; sys_read
	mov ebx, 0 ; from stdin
	mov edx, 1 ; read 1 byte
	mov ecx, esp ; save to the space reseved on stack
	int 0x80   ; make sys call
	xor eax, eax ; clear eax
	mov al, byte [esp] ; only use lowest byte of eax
	add esp, 1
	pop ebx ; restore ebx
	
	leave
	ret
	

write_byte:
	push ebp
	mov ebp, esp
	
	push ebx ; save ebx
	mov eax, 4 ; sys_write
	mov ebx, 1 ; to stdout
 	lea ecx, [ebp+0x8] ; the first parameter
	mov edx, 1 ; 1 byte
	int 0x80
	pop ebx ; restore ebx

	leave
	ret
