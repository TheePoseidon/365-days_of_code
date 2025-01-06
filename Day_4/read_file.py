# Open the file in read mode
with open("greetings.txt", "r") as file:
    # Read and print the contents of the file
    for line in file:
        print(line.strip())