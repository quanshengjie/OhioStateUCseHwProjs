Name:   Shengjie Quan
Email:  quan.48@osu.edu
Lab3

The running method of lab3 is similiar to the previous lab. The following
assumptions are made for the running environment of lab3 ftps.py and 
ftpc.py.
1) Both ftps.py and ftpc.py excuted by python3
2) ftps.py uses port 60329 (In other word, it runs
   by command python3 ftps.py 60329)
3) ftps.py runs on gamma.cse.ohio-state.edu machine
4) gamma.cse.ohio-state.edu machine has IP 164.107.113.20
5) ftpc.py runs using the following command: 
        python3 ftpc.py 164.107.113.18 12503 <filename>
   where 164.107.113.18 is the IP for beta.cse.ohio-state.edu and
   12503 is the port for troll
6) ftpc.py runs on beta.cse.ohio-state.edu machine
7) beta.cse.ohio-state.edu machine has IP of 164.107.113.18
8) troll is runned on beta.cse.ohio-state.edu machine using the following
   command: 
        troll -C 164.107.113.18 -S 164.107.113.20 -a 38525 -b 60329 -r -t -x 0 12503
   (The submission includes a script, troll_start.sh, which allows to start 
    troll with the setting above. Before use the script, the proper 
    premissions should be set for the script using command: 
    chmod +rwx troll_start.sh)

Fulfilling the assumption above, the programs in lab3 should run as 
expected. The files received by the ftps.py will be stored in recv 
directory at the same location of ftps.py.
