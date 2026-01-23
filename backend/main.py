from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime
import uvicorn

app = FastAPI(title="Stash - Finance & Budgeting App")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory database
savings_db: List[dict] = []

# Pydantic models
class Saving(BaseModel):
    amount: float
    comments: str = ""

class SavingResponse(BaseModel):
    id: int
    amount: float
    date: str
    time: str
    comments: str
    total_savings: float

# API Endpoints
@app.post("/api/savings", response_model=SavingResponse)
async def save_money(saving: Saving):
    """Save money to the account"""
    now = datetime.now()
    date = now.strftime("%Y-%m-%d")
    time = now.strftime("%H:%M:%S")
    
    # Calculate total savings
    total_savings = sum(s["amount"] for s in savings_db) + saving.amount
    
    new_saving = {
        "id": len(savings_db) + 1,
        "amount": saving.amount,
        "date": date,
        "time": time,
        "comments": saving.comments,
        "total_savings": total_savings
    }
    
    savings_db.append(new_saving)
    return new_saving

@app.get("/api/savings", response_model=List[SavingResponse])
async def get_all_savings():
    """Fetch all savings"""
    # Recalculate total savings for each entry
    if not savings_db:
        return []
    
    result = []
    running_total = 0
    for saving in savings_db:
        running_total += saving["amount"]
        saving_copy = saving.copy()
        saving_copy["total_savings"] = running_total
        result.append(saving_copy)
    
    return result

@app.get("/api/savings/summary")
async def get_savings_summary():
    """Get savings summary"""
    if not savings_db:
        return {"total_savings": 0, "number_of_transactions": 0}
    
    total = sum(s["amount"] for s in savings_db)
    return {
        "total_savings": total,
        "number_of_transactions": len(savings_db),
        "last_transaction": savings_db[-1] if savings_db else None
    }

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "Stash API is running!"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
