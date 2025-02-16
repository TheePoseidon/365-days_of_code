from flask import Flask, jsonify, request
import sqlite3

app = Flask(__name__)

DB_NAME = "sms_transactions.db"

def fetch_transactions(category=None, search=None, page=1, limit=10):
    """Fetch transactions with optional filtering, searching, and pagination."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    query = "SELECT id, sender, message, timestamp, amount, category FROM transactions WHERE 1=1"
    params = []

    if category:
        query += " AND category = ?"
        params.append(category)
    
    if search:
        query += " AND (sender LIKE ? OR message LIKE ?)"
        params.extend([f"%{search}%", f"%{search}%"])
    
    query += " ORDER BY timestamp DESC LIMIT ? OFFSET ?"
    params.extend([limit, (page - 1) * limit])

    cursor.execute(query, params)
    transactions = cursor.fetchall()
    conn.close()

    return [{"id": row[0], "sender": row[1], "message": row[2], "timestamp": row[3], "amount": row[4], "category": row[5]} for row in transactions]

@app.route("/transactions", methods=["GET"])
def get_transactions():
    """API Endpoint: Fetch transactions with filters."""
    category = request.args.get("category")
    search = request.args.get("search")
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))

    data = fetch_transactions(category, search, page, limit)
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
