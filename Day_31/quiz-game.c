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
    printf("1. What is the size of an int in C (on most systems)?\n");
    printf("   1) 2 bytes\n   2) 4 bytes\n   3) 8 bytes\n   4) 16 bytes\n");
    printf("Enter your answer (1-4): ");
    scanf("%d", &answer);
    if (answer == 2) {
        printf("✅ Correct!\n");
        score++;
    } else {
        printf("❌ Wrong! The correct answer is 2) 4 bytes.\n");
    }

    // Question 2
    printf("\n2. Which of these is used to declare a constant in C?\n");
    printf("   1) #define\n   2) const\n   3) static\n   4) Both 1 and 2\n");
    printf("Enter your answer (1-4): ");
    scanf("%d", &answer);
    if (answer == 4) {
        printf("✅ Correct!\n");
        score++;
    } else {
        printf("❌ Wrong! The correct answer is 4) Both 1 and 2.\n");
    }

    // Question 3
    printf("\n3. What will printf(\"%%d\", 10) output?\n");
    printf("   1) 10\n   2) %d\n   3) %%d\n   4) Error\n");
    printf("Enter your answer (1-4): ");
    scanf("%d", &answer);
    if (answer == 1) {
        printf("✅ Correct!\n");
        score++;
    } else {
        printf("❌ Wrong! The correct answer is 1) 10.\n");
    }

    // Display final score
    printf("\n🎯 You got %d out of 3 correct!\n", score);
    if (score == 3) {
        printf("🏆 Excellent! You are a C master!\n");
    } else if (score == 2) {
        printf("👍 Good job! Keep practicing.\n");
    } else {
        printf("📚 Keep learning! You'll get better!\n");
    }
    return 0;
}