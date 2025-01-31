#include <stdio.h>

int main() {
    int score = 0;
    char answer;

    printf("What is the capital of France?\n");
    printf("A. Paris\n");
    printf("B. London\n");
    printf("C. Berlin\n");
    printf("D. Madrid\n");
    scanf(" %c", &answer);

    if (answer == 'A') {
        printf("Correct!\n");
        score++;
    } else {
        printf("Incorrect!\n");
    }

    printf("What is the capital of Japan?\n");
    printf("A. Tokyo\n");
    printf("B. Beijing\n");
    printf("C. Seoul\n");
    printf("D. Bangkok\n");
    scanf(" %c", &answer);

    if (answer == 'A') {
        printf("Correct!\n");
        score++;
    } else {
        printf("Incorrect!\n");
    }

    printf("What is the capital of Italy?\n");
    printf("A. Rome\n");
    printf("B. Paris\n");
    printf("C. Madrid\n");
    printf("D. Berlin\n");
    scanf(" %c", &answer);

    if (answer == 'A') {
        printf("Correct!\n");
        score++;
    } else {
        printf("Incorrect!\n");
    }

    printf("Your score is %d/3\n", score);

    return 0;
}