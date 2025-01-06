# Open file in append mode
with open("greetings.txt", "a") as file:
    file.write("Good morning!\n")
    file.write("Good afternoon!\n")
    file.write("Good evening!\n")
    file.write("Good night!\n")

print("Greetings have been appended to the file.")