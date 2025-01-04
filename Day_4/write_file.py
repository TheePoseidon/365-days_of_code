# Open a file in writing mode
with open("greetings.txt", "w") as file:
    file.write("Hello, World!\n")
    file.write("Welcome to 365 days of code\n")
    file.write("Happy coding!\n")
    file.write("Good luck!\n")
    file.write("Keep coding!\n")
    file.write("Thank you!\n")

print("Greetings have been written to the file.")