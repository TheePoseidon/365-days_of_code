from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional
import sqlite3

app = FastAPI()
class SMS(BaseModel):
    id: int
    message: str
    transaction_type: str
    timestamp: str
    status: str

# Database connection
def get_db_connection():
    conn = sqlite3.connect('sms_data.db')
    conn.row_factory = sqlite3.Row
    return conn

# Get sms data with pagination
@app.get("/sms", response_model=List[SMS])
def get_sms_data(
    transaction_type: Optional[str] = None,
    start_date: Optional[str] = Query(None, description="Start date (YYYY-MM-DD)"),
    end_date: Optional[str] = Query(None, description="End date (YYYY-MM-DD)"),
    limit: int = 10,
    offset: int = 0
):
    conn = get_db_connection()
    query = "SELECT * FROM sms_data WHERE 1=1"
    params = []

    if transaction_type:
        query += " AND transaction_type = ?"
        params.append(transaction_type)

    if start_date and end_date:
        query += " AND timestamp BETWEEN ? AND ?"
        params.extend([start_date, end_date])

    query += " LIMIT ? OFFSET ?"
    params.extend([limit, offset])

    sms_data = conn.execute(query, params).fetchall()
    conn.close()
    return [dict(row) for row in sms_data]

# sms by id
@app.get("/sms/{sms_id}", response_model=SMS)
def get_sms_by_id(sms_id: int):
    conn = get_db_connection()
    sms_data = conn.execute("SELECT * FROM sms_data WHERE id = ?", (sms_id,)).fetchone()
    conn.close()

    if sms_data is None:
        raise HTTPException(status_code=404, detail="SMS not found")

    return dict(sms_data)

# sms summary
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

