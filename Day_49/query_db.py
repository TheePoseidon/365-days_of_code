import sqlite3

# Connect to the database
db_path = "momo_transactions.db"  
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# A query for the database
try:
    cursor.execute("SELECT * FROM transactions LIMIT 5;")  
    rows = cursor.fetchall()

    print("Sample Transactions:")
    for row in rows:
        print(row)
except sqlite3.Error as e:
    print("SQLite error:", e)

# End of connection
conn.close()
