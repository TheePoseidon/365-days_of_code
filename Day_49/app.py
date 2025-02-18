from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from models import db, Transaction

app = Flask(__name__)

# SQlite DB configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///momo_transactions.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

# DB tables
with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return jsonify({"message": "MoMo API is running!"})

# Access all transactions
@app.route("/transactions", methods=["GET"])
def get_transactions():
    transactions = Transaction.query.all()
    result = [{"id": t.id, "type": t.transaction_type, "amount": t.amount, "date": t.date} for t in transactions]
    return jsonify(result)

# Transaction acquired by ID
@app.route("/transaction/<int:id>", methods=["GET"])
def get_transaction(id):
    transaction = Transaction.query.get(id)
    if transaction:
        return jsonify({"id": transaction.id, "type": transaction.transaction_type, "amount": transaction.amount, "date": transaction.date})
    return jsonify({"error": "Transaction not found"}), 404

# New transaction element
@app.route("/transaction", methods=["POST"])
def add_transaction():
    data = request.json
    new_transaction = Transaction(
        transaction_type=data["transaction_type"],
        amount=data["amount"],
        date=data["date"],
        sender=data.get("sender"),
        receiver=data.get("receiver")
    )
    db.session.add(new_transaction)
    db.session.commit()
    return jsonify({"message": "Transaction added successfully!"}), 201

if __name__ == "__main__":
    app.run(debug=True)
