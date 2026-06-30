#include <stdio.h>

// Function prototypes
// double add(double a, double b) { return a + b; }
// double subtract(double a, double b) { return a - b; }
// double multiply(double a, double b) { return a * b; }
// double divide(double a, double b) {
//     if (b == 0) {
//             printf("Error: Division by zero!\n");
//                     return 0;
//                         }
//                             return a / b;
//                             }
//
//                             int main() {
//                                 double num1, num2, result;
//                                     int choice;
//
//                                         // Array of function pointers
//                                             double (*operations[4])(double, double) = {add, subtract, multiply, divide};
//
//                                                 printf("=== Simple Calculator ===\n");
//                                                     printf("Enter first number: ");
//                                                         scanf("%lf", &num1);
//                                                             
//                                                                 printf("Enter second number: ");
//                                                                     scanf("%lf", &num2);
//
//                                                                         printf("\nChoose operation:\n");
//                                                                             printf("0 - Addition\n");
//                                                                                 printf("1 - Subtraction\n");
//                                                                                     printf("2 - Multiplication\n");
//                                                                                         printf("3 - Division\n");
//                                                                                             printf("Enter your choice (0-3): ");
//                                                                                                 scanf("%d", &choice);
//
//                                                                                                     if (choice >= 0 && choice <= 3) {
//                                                                                                             result = operations[choice](num1, num2);
//                                                                                                                     printf("\nResult = %.2f\n", result);
//                                                                                                                         } else {
//                                                                                                                                 printf("Invalid choice!\n");
//                                                                                                                                     }
//
//                                                                                                                                         return 0;
//                                                                                                                                         }
