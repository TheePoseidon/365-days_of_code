import os

# File to store expense data
EXPENSE_FILE = "expenses.txt"

# Function to load expenses from the file
def load_expenses():
    if not os.path.exists(EXPENSE_FILE):
        return []
    with open(EXPENSE_FILE, "r") as file:
        expenses = [line.strip().split(",") for line in file]
    return expenses

# Function to save expenses to the file
def save_expenses(expenses):
    with open(EXPENSE_FILE, "w") as file:
        for expense in expenses:
            file.write(",".join(expense) + "\n")

# Function to add a new expense
def add_expense(expenses):
    date = input("Enter the date (YYYY-MM-DD): ")
    description = input("Enter the description: ")
    amount = input("Enter the amount: ")
    expenses.append([date, description, amount])
    print("Expense added successfully!")

# Function to view all expenses
def view_expenses(expenses):
    print("\nRecorded Expenses:")
    for expense in expenses:
        print(f"Date: {expense[0]}, Description: {expense[1]}, Amount: {expense[2]}")
    print()

# Main program loop
def main():
    expenses = load_expenses()
    while True:
        print("1. Add Expense")
        print("2. View Expenses")
        print("3. Exit")
        choice = input("Choose an option: ")
        if choice == "1":
            add_expense(expenses)
            save_expenses(expenses)
        elif choice == "2":
            view_expenses(expenses)
        elif choice == "3":
            print("Exiting program. Goodbye!")
            break
        else:
            print("Invalid option. Please try again.")

if __name__ == "__main__":
    main()
