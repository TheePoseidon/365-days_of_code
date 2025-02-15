import sqlite3

DB_NAME = "sms_transactions.db"

def fetch_transactions(limit=10):
    """Fetches the latest transactions from the database."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute('''
        SELECT id, sender, message, timestamp, category 
        FROM transactions 
        ORDER BY timestamp DESC 
        LIMIT ?
    ''', (limit,))

    transactions = cursor.fetchall()
    conn.close()
    
    return transactions

if __name__ == "__main__":
    transactions = fetch_transactions(10) 
    
    print("📌 Latest Transactions:")
    for tx in transactions:
        print(f"ID: {tx[0]}, Sender: {tx[1]}, Category: {tx[4]}")
        print(f"Message: {tx[2]}")
        print(f"Timestamp: {tx[3]}\n")
