#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main() {
    pid_t pid = fork();

    if (pid == 0) {
        // Child process
        printf("Child: Hello from child! PID = %d\n", getpid());
    } 
    else if (pid > 0) {
        // Parent process
        printf("Parent: Child PID = %d, My PID = %d\n", pid, getpid());
        wait(NULL); // Wait for the child to complete
    } 
    else {
        // Fork failed
        perror("fork failed");
    }

    return 0;
}
