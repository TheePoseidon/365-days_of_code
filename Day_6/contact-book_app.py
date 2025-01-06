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

# Function to save contacts to the file
def save_contacts(contacts):
    with open(CONTACTS_FILE, "w") as file:
        for contact in contacts:
            file.write(",".join(contact) + "\n")

# Function to add a new contact
def add_contact(contacts):
    name = input("Enter the contact's name: ")
    phone = input("Enter the contact's phone number: ")
    email = input("Enter the contact's email: ")
    contacts.append([name, phone, email])
    print("Contact added successfully!")

# Function to view all contacts
def view_contacts(contacts):
    if not contacts:
        print("No contacts found!")
        return
    print("\nContacts List:")
    for contact in contacts:
        print(f"Name: {contact[0]}, Phone: {contact[1]}, Email: {contact[2]}")
    print()