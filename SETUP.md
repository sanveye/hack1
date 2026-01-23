# Stash - Finance & Budgeting Application

A pocket money savings tracker for kids built with React/TypeScript frontend and Python FastAPI backend.

## Project Structure

```
hack1/
├── backend/          # Python FastAPI backend
│   ├── main.py      # Main FastAPI application
│   └── requirements.txt
├── frontend/        # React TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── SavingsForm.tsx
│   │   │   ├── SavingsList.tsx
│   │   │   └── SavingsSummary.tsx
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── types.ts
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Features

- 💾 Save money with date, time, and comments
- 📊 View all savings transactions
- 📈 Track total savings amount
- 🎯 See transaction count
- 🎨 Beautiful, responsive UI

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a Python virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the backend server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## API Endpoints

### POST /api/savings
Save a new transaction
```json
{
  "amount": 10.50,
  "comments": "Birthday gift"
}
```

Response:
```json
{
  "id": 1,
  "amount": 10.50,
  "date": "2024-01-22",
  "time": "14:30:00",
  "comments": "Birthday gift",
  "total_savings": 10.50
}
```

### GET /api/savings
Fetch all savings transactions

Response:
```json
[
  {
    "id": 1,
    "amount": 10.50,
    "date": "2024-01-22",
    "time": "14:30:00",
    "comments": "Birthday gift",
    "total_savings": 10.50
  }
]
```

### GET /api/savings/summary
Get savings summary

Response:
```json
{
  "total_savings": 10.50,
  "number_of_transactions": 1,
  "last_transaction": {...}
}
```

## Technology Stack

- **Frontend**: React 18, TypeScript, CSS3
- **Backend**: Python 3.8+, FastAPI, Uvicorn
- **Database**: In-Memory (Python list)

## Development

Both frontend and backend are configured to run simultaneously:
- Backend API runs on `http://localhost:8000`
- Frontend app runs on `http://localhost:3000`
- Frontend proxies API requests to the backend

## Notes

- The backend uses an in-memory database, so data will be lost when the server restarts
- CORS is enabled for frontend-backend communication
- All transactions are stored with automatic timestamp
