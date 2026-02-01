from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime, date
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
transactions_db: List[dict] = []
streak_db: dict = {
    "current_streak": 0,
    "best_streak": 0,
    "last_quest_date": None
}
user_profile: dict = {
    "name": None,
    "initial_balance": None
}

# Pydantic models
class Transaction(BaseModel):
    amount: float
    transaction_type: str  # "income" or "expense"
    comments: str = ""
    spent_on: str = ""

class TransactionResponse(BaseModel):
    id: int
    amount: float
    transaction_type: str
    date: str
    time: str
    comments: str
    spent_on: str
    balance: float

class UserProfile(BaseModel):
    name: str
    initial_balance: float

# API Endpoints
@app.post("/api/transactions", response_model=TransactionResponse)
async def add_transaction(transaction: Transaction):
    """Add a transaction (income or expense)"""
    now = datetime.now()
    date = now.strftime("%Y-%m-%d")
    time = now.strftime("%H:%M:%S")
    
    # Calculate amount based on type
    amount_value = transaction.amount if transaction.transaction_type == "income" else -transaction.amount
    
    # Calculate balance (starting from initial balance)
    initial = user_profile.get("initial_balance", 0)
    balance = initial + sum(t.get("signed_amount", 0) for t in transactions_db) + amount_value
    
    new_transaction = {
        "id": len(transactions_db) + 1,
        "amount": transaction.amount,
        "signed_amount": amount_value,
        "transaction_type": transaction.transaction_type,
        "date": date,
        "time": time,
        "comments": transaction.comments,
        "spent_on": transaction.spent_on,
        "balance": balance
    }
    
    transactions_db.append(new_transaction)
    return TransactionResponse(
        id=new_transaction["id"],
        amount=new_transaction["amount"],
        transaction_type=new_transaction["transaction_type"],
        date=new_transaction["date"],
        time=new_transaction["time"],
        comments=new_transaction["comments"],
        spent_on=new_transaction["spent_on"],
        balance=new_transaction["balance"]
    )

@app.get("/api/transactions", response_model=list)
async def get_all_transactions():
    """Fetch all transactions"""
    if not transactions_db:
        return []
    
    result = []
    initial = user_profile.get("initial_balance", 0)
    balance = initial
    for transaction in transactions_db:
        balance += transaction.get("signed_amount", 0)
        result.append({
            "id": transaction["id"],
            "amount": transaction["amount"],
            "transaction_type": transaction["transaction_type"],
            "date": transaction["date"],
            "time": transaction["time"],
            "comments": transaction["comments"],
            "spent_on": transaction.get("spent_on", ""),
            "balance": balance
        })
    
    return result

@app.get("/api/transactions/summary")
async def get_transactions_summary():
    """Get balance summary"""
    initial = user_profile.get("initial_balance", 0)
    
    if not transactions_db:
        return {"balance": initial, "income": 0, "expenses": 0, "transaction_count": 0}
    
    balance = initial + sum(t.get("signed_amount", 0) for t in transactions_db)
    income = sum(t["amount"] for t in transactions_db if t["transaction_type"] == "income")
    expenses = sum(t["amount"] for t in transactions_db if t["transaction_type"] == "expense")
    
    return {
        "balance": balance,
        "income": income,
        "expenses": expenses,
        "transaction_count": len(transactions_db)
    }

@app.get("/api/profile")
async def get_profile():
    """Get user profile"""
    return {
        "name": user_profile.get("name"),
        "initial_balance": user_profile.get("initial_balance"),
        "is_setup": user_profile.get("name") is not None
    }

@app.post("/api/profile")
async def create_profile(profile: UserProfile):
    """Create user profile (first time setup)"""
    if user_profile.get("name") is not None:
        raise HTTPException(status_code=400, detail="Profile already exists")
    
    user_profile["name"] = profile.name
    user_profile["initial_balance"] = profile.initial_balance
    
    return {
        "name": user_profile["name"],
        "initial_balance": user_profile["initial_balance"],
        "message": "Profile created successfully"
    }

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "Stash API is running!"}

@app.get("/api/streak")
async def get_streak():
    """Get current and best streak"""
    return {
        "current_streak": streak_db["current_streak"],
        "best_streak": streak_db["best_streak"]
    }

@app.post("/api/streak/answer")
async def answer_quest():
    """Mark that a quest was answered today"""
    print("🔥 Answer quest endpoint called!")
    today = date.today().isoformat()
    print(f"Today's date: {today}")
    print(f"Last quest date: {streak_db['last_quest_date']}")
    
    # Check if already answered today
    if streak_db["last_quest_date"] == today:
        print("Already answered today, returning current streak")
        return {
            "current_streak": streak_db["current_streak"],
            "best_streak": streak_db["best_streak"],
            "message": "Already answered a quest today"
        }
    
    # Check if it's a consecutive day
    if streak_db["last_quest_date"]:
        last_date = date.fromisoformat(streak_db["last_quest_date"])
        current_date = date.today()
        days_diff = (current_date - last_date).days
        print(f"Days difference: {days_diff}")
        
        if days_diff == 1:
            # Consecutive day, increment streak
            streak_db["current_streak"] += 1
            print(f"Consecutive day! New streak: {streak_db['current_streak']}")
        elif days_diff > 1:
            # Streak broken, reset
            streak_db["current_streak"] = 1
            print(f"Streak broken! Reset to 1")
    else:
        # First time
        streak_db["current_streak"] = 1
        print("First time! Set streak to 1")
    
    # Update last quest date
    streak_db["last_quest_date"] = today
    print(f"Updated last quest date to: {today}")
    
    # Update best streak if needed
    if streak_db["current_streak"] > streak_db["best_streak"]:
        streak_db["best_streak"] = streak_db["current_streak"]
        print(f"New best streak: {streak_db['best_streak']}")
    
    return {
        "current_streak": streak_db["current_streak"],
        "best_streak": streak_db["best_streak"],
        "message": "Quest recorded!"
    }
    
    # Update best streak if needed
    if streak_db["current_streak"] > streak_db["best_streak"]:
        streak_db["best_streak"] = streak_db["current_streak"]
    
    return {
        "current_streak": streak_db["current_streak"],
        "best_streak": streak_db["best_streak"],
        "message": "Quest recorded!"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
 
