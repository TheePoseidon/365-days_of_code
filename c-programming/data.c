#include <stdio.h>
int main()
{
    // declaring variables
    int student_id = 20;
    float gpa = 3.5;
    char grade = 'A';
    double TGPA = 3.755;
    long population = 1000000;

    // printing the variables
    printf("Student ID: %d\n", student_id);
    printf("GPA: %.2f\n", gpa);
    printf("Grade: %c\n", grade);
    printf("TGPA: %.3lf\n", TGPA);
    printf("Population: %ld\n", population);
}