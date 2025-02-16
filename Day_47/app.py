from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

def fetch_transactions():
    conn = sqlite3.connect("sms_transactions.db")
    cursor = conn.cursor()
    cursor.execute("SELECT id, sender, message, category, timestamp FROM transactions")
    data = [{"id": row[0], "sender": row[1], "message": row[2], "category": row[3], "timestamp": row[4]} for row in cursor.fetchall()]
    conn.close()
    return data

@app.route("/transactions", methods=["GET"])
def get_transactions():
    return jsonify(fetch_transactions())

if __name__ == "__main__":
    app.run(debug=True)
