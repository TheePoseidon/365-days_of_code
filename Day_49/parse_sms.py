import sqlite3
import xml.etree.ElementTree as ET

# xml file
xml_file = "modified_sms_v2.xml"
tree = ET.parse(xml_file)
root = tree.getroot()

# SQlite DB
conn = sqlite3.connect("momo_transactions.db")
cursor = conn.cursor()

# Tables
cursor.execute("""
    CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        transaction_type TEXT,
        amount INTEGER,
        currency TEXT,
        date TEXT,
        sender TEXT,
        receiver TEXT,
        message TEXT
    )
""")
conn.commit()

# Extraction of transcation details
def extract_transactions():
    transactions = []
    for sms in root.findall(".//sms"):
        message = sms.get("body")
        
        # Data extraction
        transaction_type = "Unknown"
        amount = 0
        currency = "RWF"
        date = sms.get("date")
        sender = sms.get("address")
        receiver = "User" 
        
        # Transaction categories
        if "received" in message.lower():
            transaction_type = "Incoming Money"
        elif "sent to" in message.lower():
            transaction_type = "Transfer to Mobile Number"
        elif "payment" in message.lower():
            transaction_type = "Payment to Code Holders"
        elif "deposit" in message.lower():
            transaction_type = "Bank Deposit"
        elif "airtime" in message.lower():
            transaction_type = "Airtime"
        elif "bundle" in message.lower():
            transaction_type = "Bundles and Packs"
        elif "withdrawn" in message.lower():
            transaction_type = "Withdrawal from Agent"

        # For amount
        words = message.split()
        for i, word in enumerate(words):
            if word.replace(",", "").isdigit():
                amount = int(word.replace(",", ""))
                break
        
        transactions.append((transaction_type, amount, currency, date, sender, receiver, message))
    
    return transactions

# Tansactions to DB
transactions = extract_transactions()
cursor.executemany("INSERT INTO transactions (transaction_type, amount, currency, date, sender, receiver, message) VALUES (?, ?, ?, ?, ?, ?, ?)", transactions)
conn.commit()

print(f"{len(transactions)} transactions inserted into the database.")

# End of connection
conn.close()
