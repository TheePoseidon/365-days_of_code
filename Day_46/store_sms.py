import sqlite3
from parse_sms import parse_xml  

DB_NAME = "sms_transactions.db"

def create_database():
    """Creates the transactions table if it doesn't exist."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sender TEXT,
            message TEXT,
            timestamp TEXT,
            amount TEXT,
            category TEXT
        )
    ''')
    
    conn.commit()
    conn.close()

def insert_transactions(transactions):
    """Inserts parsed SMS transactions into the database."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    for tx in transactions:
        cursor.execute('''
            INSERT INTO transactions (sender, message, timestamp, amount, category)
            VALUES (?, ?, ?, ?, ?)
        ''', (tx["sender"], tx["message"], tx["timestamp"], tx["amount"], tx["category"]))
    
    conn.commit()
    conn.close()

if __name__ == "__main__":
    create_database()
    
    file_path = "modified_sms_v2.xml" 
    transactions = parse_xml(file_path)
    
    insert_transactions(transactions)
    print(f"✅ Successfully inserted {len(transactions)} transactions into the database.")
