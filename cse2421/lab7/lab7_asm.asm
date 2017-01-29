; 
; Name: Shengjie Quan
; DATE: Mar/26/2015
; CLASS: CSE2421, TU/TR 4:10PM
; ID: 0x05194c45
;
; export the symbol "main"
global main
; indicate that printf will be an extern that will have to be resolved at link time
extern printf
extern atoi

; the read-only data segment
section .rodata
; note, must place the ascii value of \n (0xa) as a byte after our format string instead of making format string "%d\n"
format_string_1 db "(%d, %d): %d",0xa,0

; the read-write data segment
section .data
; initialize the static variable some_static_int to 0
some_static_int dd 0
; switch jump table
table:
dd target_0
dd target_1
dd target_2
dd target_3

; libc (which we linked to) has already established the stack for us, so there
; isn't anything more to do but implement main

; the code (text) segment
section .text
; in complex_function
  complex_function:
  push ebp
  mov ebp, esp
  ; reserve space for four int local variables (temp1, temp2, temp3, retval)
  sub esp, 0x10
  ; temp1 = arg1 - 7
  mov eax, dword [ebp+0x8]
  sub eax, 7 ; arg1-7
  mov dword [ebp-0x4], eax
  ; temp2 = arg2
  mov ecx, dword [ebp+0xc]
  mov dword [ebp-0x8], ecx
  ; temp3 = arg1 * arg2 same as arg2 * arg1
  imul ecx, dword [ebp+0x8]
  mov dword [ebp-0xc], ecx
  ; retval = temp1
  mov dword [ebp-0x10], eax
  
  ; if temp2<0
  mov eax, dword [ebp-0x8] ; cache temp2 to eax
  cmp eax, 0
  mov eax, dword [ebp-0x10] ; cache retval
  jge else
  add eax, 17
  jmp end_if
else:
  sub eax, 13
end_if:
  mov dword [ebp-0x10], eax ; update value of retval
  mov eax, [ebp+0x8] ; cache arg1
  cmp eax, 0
  jl _default
  cmp eax, 3
  jg _default
  jmp [table+eax*4]    
  
target_0:
  mov eax,dword [ebp-0x10] ; cache retval
  mov ecx, dword [ebp-0x8] ; cache temp2
  ; retval = retval + temp2 + some_static_int + 4
  add eax, ecx
  add eax, [some_static_int]
  add eax, 4
  mov dword [ebp-0x10], eax ; store result back to retval
target_1:
  mov eax,dword [ebp-0x10] ; cache retval
  mov ecx, dword [ebp-0x8] ; cache temp2
  ; retval = retval - temp2 + 5
  sub eax, ecx
  add eax, 5 
  mov dword [ebp-0x10], eax ; store result back to retval
  jmp done
target_2:
  mov eax,dword [ebp-0x10] ; cache retval
  ; retval = retval - 13 - some_static_int
  sub eax, 13
  sub eax, [some_static_int]
  mov dword [ebp-0x10], eax ; store result back to retval
  jmp done
target_3:
  mov eax,dword [ebp-0x10] ; cache retval
  mov ecx, dword [ebp-0x8] ; cache temp2
  mov edx, dword [ebp-0xc] ; cache temp3
  ; retval = retval + (temp3 * 7) - temp2
  imul edx, 7 ; edx = temp * 7 
  add eax, edx
  sub eax, ecx
  mov dword [ebp-0x10], eax ; store result back to retval
_default:
  mov eax,dword [ebp-0x10] ; cache retval
  inc eax
  mov dword [ebp-0x10], eax ; store result back to retval
  jmp done
done:
  mov eax, [some_static_int] ; cache some_static_int
  mov ecx, dword [ebp+0x8] ; cache arg1
  mov edx, dword [ebp-0x10] ; cache retval
  ; some_static_int = some_static_int - arg1 + retval
  sub eax, ecx
  add eax, edx
  mov [some_static_int], eax ; store result back to some_static_int
  ; prepare for return value (copy retval into eax)
  mov eax, dword [ebp-0x10]
  leave
  ret

; the 'main' function
main:
  ; set up the main function's stack frame
  push ebp
  mov ebp, esp
  ; set aside space for main's four local variables (int outer_limit, 
  ;						     int inner_limit,
  ;						     int counter1,
  ;						     int counter2)
  sub esp, 0x10

  ; implement int outer_limit = atoi(argv[1])
  ; set aside room for the one parameter on the stack for the first call to atoi
  sub esp, 0x4
  ; the array argv will be found in the location of the first argument placed on the stack for this function to consume
  mov ecx, [ebp+0xc]
  ; the first argument to the executable, a pointer to a character assumed to represent a legal integer, can be found 4 bytes offset from where eax points
  ; the second argument to the executable, a pointer to a character assumed to represent a legal integer, can be found 8 bytes offset from where eax points
  ; move the first argument onto the stack in preparation for calling atoi
  mov eax, [ecx+4]
  mov [esp], eax
  call atoi
  ; restore the stack to its original state
  add esp, 0x4
  ; eax has our integer value of outer_limit that we can now store
  mov [ebp-0x4], eax

  ; implement int inner_limit = atoi(argv[2]) just as above, but adjusted for the other offset
  sub esp, 0x4
  mov ecx, [ebp+0xc]
  mov eax, [ecx+8]
  mov [esp], eax
  call atoi
  add esp, 0x4
  mov [ebp-0x8], eax
 
  ; counter1 = 0
  mov dword [ebp-0xc], 0x00000000
outer_loop_begin:  
  ; counter1 < outer_limit
  mov eax, dword [ebp-0xc] ;counter1
  mov ecx, dword [ebp-0x4] ;outer_limit 
  cmp eax, ecx
  jge outer_loop_end

  ; inner loop
  mov dword [ebp-0x10], 0x00000002
inner_loop_begin:
  ; counter2 > inner_limit
  mov ebx, dword [ebp-0x10] ;counter2
  mov edi, dword [ebp-0x8]  ;inner_limit
  cmp ebx, edi
  jle inner_loop_end

  ; save eax, ecx to stack
  push eax
  push ecx

  ; call complex function
  ; prepare argument2, counter2
  push ebx
  ; prepare argument1, counter1
  push eax 
  call complex_function
  ; restore stack
  add esp, 0x8
  mov edx, eax ; save return value to edx
  ; restore eax, ecx from stack
  pop ecx
  pop eax
 
  ; save eax, ecx to stack
  push eax
  push ecx
  ; prepare calling printf
  push edx ; argument3, complex_function return value
  push ebx ; argument2, counter2
  push eax ; argument1, counter1
  ; move the address of the format string into edx and place it onto the proper place on the stack for the second call to printf
  mov edx, format_string_1
  sub esp, 0x4
  mov [esp], edx
  ; call printf
  call printf
  ; restore stack
  add esp, 0x10
  ; restore eax, ecx from stack
  pop ecx
  pop eax

  ; counter2--
  dec ebx
  mov dword [ebp-0x10], ebx
  jmp inner_loop_begin
inner_loop_end:
  
  ; counter1++
  inc eax
  mov dword [ebp-0xc], eax
  jmp outer_loop_begin
outer_loop_end:  
  ; set eax to zero to return success to the caller of main()
  xor eax, eax
  ; we didn't need to do any callee-saves because we only used caller saves registers eax, edx, ecx, so nothing to restore
  ; restore the stack frame for the caller
  leave
  ; and return
  ret
