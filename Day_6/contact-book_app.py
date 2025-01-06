import os

# File to store contact data
CONTACTS_FILE = "contacts.txt"

# Function to loads contacts from the file
def load_contacts():
    if not os.path.exists(CONTACTS_FILE):
        return []
    with open(CONTACTS_FILE, "r") as file:
        contacts = [line.strip().split(",") for line in file]
    return contacts