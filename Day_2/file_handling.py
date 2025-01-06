# Open a file in write mode
with open("greetings.txt", "w") as file:
    # Write greetings to the file
    file.write("Hello, James! Welcome to coding!\n")
    file.write("Hello, Alice! Welcome to coding!\n")
    file.write("Hello, John! Welcome to coding!\n")

print("Greetings have been written to greetings.txt!")