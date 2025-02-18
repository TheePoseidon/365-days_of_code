import sqlite3
conn = sqlite3.connect("momo_transactions.db")
cursor = conn.cursor()
cursor.execute("SELECT * FROM transactions LIMIT 5;")
print(cursor.fetchall())
conn.close()