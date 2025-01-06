# Handling exceptions while reading and writing to a file
try:
    with open("greetings.txt", "r") as file:
        content = file.read()
        print("File content read successfully!")
        print(content)

except FileNotFoundError:
    print("Error: The file does not exist.")
except PermissionError:
    print("Error: You do not have permission to read the file.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")

