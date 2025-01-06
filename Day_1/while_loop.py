# Start the while loop
while True:
    # Ask for user input
    number = int(input("Enter a number: "))

    # Check if number is negative
    if number < 0:
        print("Negative number. Loop has stopped!")
        break
    else:
        print("Positive number")