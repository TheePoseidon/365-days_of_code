#include <stdio.h>


int add(int a, int b);
int subtract(int a, int b);
int multiply(int a, int b);

int main() {
    int num1, num2;
    char operator;

    printf("Enter calculation (e.g. 5 + 3): ");
    scanf("%d %c %d", &num1, &operator, &num2);

    if (operator == '+') {
        printf("Result = %d\n", add(num1, num2));
    } 
    else if (operator == '-') {
        printf("Result = %d\n", subtract(num1, num2));
    } 
    else if (operator == '*') {
        printf("Result = %d\n", multiply(num1, num2));
    } 
    else {
        printf("Invalid operator!\n");
    }

    return 0;
}


int add(int a, int b) {
    return a + b;
}

int subtract(int a, int b) {
    return a - b;
}

int multiply(int a, int b) {
    return a * b;
}

