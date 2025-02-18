from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
import sqlite3

app = FastAPI()

# Define a Pydantic model for SMS
class SMS(BaseModel):
    id: int
    message: str
    transaction_type: str
    timestamp: str
    status: str

# Connect to the database
def get_db_connection():
    conn = sqlite3.connect('sms_data.db')  # Adjust to your actual DB
    conn.row_factory = sqlite3.Row
    return conn

# Fetch all SMS data
@app.get("/sms", response_model=List[SMS])
def get_sms_data(transaction_type: Optional[str] = None):
    conn = get_db_connection()
    query = "SELECT * FROM sms_data"
    if transaction_type:
        query += " WHERE transaction_type = ?"
        sms_data = conn.execute(query, (transaction_type,)).fetchall()
    else:
        sms_data = conn.execute(query).fetchall()
    conn.close()
    return [dict(row) for row in sms_data]

# Get SMS summary
@app.get("/sms/summary")
def get_sms_summary():
    conn = get_db_connection()
    query = "SELECT transaction_type, COUNT(*) AS count FROM sms_data GROUP BY transaction_type"
    summary = conn.execute(query).fetchall()
    conn.close()
    return {"summary": [dict(row) for row in summary]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
