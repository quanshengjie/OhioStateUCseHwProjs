Name:   Shengjie Quan
Email:  quan.48@osu.edu
Lab4

The running method of lab4 is similiar to the previous lab.
For the convenience of grading, some shell scripts were written to help 
running the programs. Below is the procedure (Pelease excute them in their 
numbering order):
1)  Change the working directory to the lab4 folder (where the ftps.py file 
    is)
2)  Assign all scripts the permission to run by using the following cmds:
    chmod +rwx troll_gamma_start.sh
    chmod +rwx troll_beta_start.sh
    chmod +rwx troll
    chmod +rwx start_gamma_server.sh
    chmod +rwx start_beta_client.sh
3)  Start the server on gamma.cse.ohio-state.edu by using the cmd:
    ./start_gamma_server.sh
4)  Start troll on beta using the following cmd:
    ./troll_beta_start.sh <packet-drop-%>
    (e.g. if the package loss rate want to be set to 10% then run the cmd
     ./troll_beta_start.sh 10 )
5)  Start troll on gamma using the following cmd:
    ./troll_gamma_start.sh <packet-drop-%>
    (e.g. if the package loss rate want to be set to 10% then run the cmd 
     ./troll_gamma_start.sh 10 )
6)  Start the client and sepecify the file to transfer by using the cmd:
    ./start_beta_client.sh <local-file-to-transfer>
    (e.g. if the file 1.jpg want to be transfered then run the cmd 
     ./start_beta_client.sh 1.jpg)
The files received by the ftps.py will be stored in recv 
directory at the same location of ftps.py.
