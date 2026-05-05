#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Student {
    int id;
    char name[50];
    float gpa;
};

int main() {
    int n;
    printf("Enter number of studnts: ");
    scanf("%d", &n);

    struct Student *students = (struct Student *)malloc(n * sizeof(struct Student));


    for (int i = 0; i < n; i++) {
        printf("\nEnter details for student %d:\n", i + 1);
        printf("ID: ");
        scanf("%d", &students[i].id);
        printf("Name: ");
        scanf(" %[^\n]", students[i].name);
        printf("GPA: ");
        scanf("%f", &students[i].gpa);
    }


    printf("\n--- Student Records ---\n");
    for (int i = 0; i < n; i++) {
        printf("ID: %d, Name: %s, GPA: %.2f\n", students[i].id, students[i].name, students[i].gpa);
    }


    free(students);

    return 0;
}
