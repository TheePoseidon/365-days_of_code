from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    transaction_type = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(10), nullable=False, default="RWF")
    date = db.Column(db.String(50), nullable=False)
    sender = db.Column(db.String(100), nullable=True)
    receiver = db.Column(db.String(100), nullable=True)
    
    def __repr__(self):
        return f"<Transaction {self.id}: {self.transaction_type} - {self.amount} {self.currency}>"
