#include <stdio.h>

// Function declarations
// float add(float a, float b);
// float subtract(float a, float b);
// float multiply(float a, float b);
//
// int main() {
//     float num1, num2, result;
//         char op, equal;
//
//             // User input
//                 printf("Enter first number: ");
//                     scanf("%f", &num1);
//
//                         printf("Enter operator (+, -, *): ");
//                             scanf(" %c", &op);
//
//                                 printf("Enter second number: ");
//                                     scanf("%f", &num2);
//
//                                         // Perform calculation using functions
//                                             if (op == '+') {
//                                                     result = add(num1, num2);
//                                                         }
//                                                             else if (op == '-') {
//                                                                     result = subtract(num1, num2);
//                                                                         }
//                                                                             else if (op == '*') {
//                                                                                     result = multiply(num1, num2);
//                                                                                         }
//                                                                                             else {
//                                                                                                     printf("Invalid operator!\n");
//                                                                                                             return 1;
//                                                                                                                 }
//
//                                                                                                                     // Ask for equal sign
//                                                                                                                         printf("Enter '=' to see the result: ");
//                                                                                                                             scanf(" %c", &equal);
//
//                                                                                                                                 if (equal == '=') {
//                                                                                                                                         printf("Result = %.2f\n", result);
//                                                                                                                                             }
//                                                                                                                                                 else {
//                                                                                                                                                         printf("You did not enter '='\n");
//                                                                                                                                                             }
//
//                                                                                                                                                                 return 0;
//                                                                                                                                                                 }
//
//                                                                                                                                                                 // Function definitions
//                                                                                                                                                                 float add(float a, float b) {
//                                                                                                                                                                     return a + b;
//                                                                                                                                                                     }
//
//                                                                                                                                                                     float subtract(float a, float b) {
//                                                                                                                                                                         return a - b;
//                                                                                                                                                                         }
//
//                                                                                                                                                                         float multiply(float a, float b) {
//                                                                                                                                                                             return a * b;
//                                                                                                                                                                             }
