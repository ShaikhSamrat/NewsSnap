# Setup Guide

## Prerequisites

- Node.js v14+
- MongoDB (local or Atlas)
- GNews API key → [gnews.io](https://gnews.io)

## 1. Clone & Install

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

## 2. Configure Environment

Create `backend/.env`:
GNEWS_API_KEY=your_key_here
PORT=5000
MONGODB_URI=mongodb://localhost:27017/newssnap
## 3. Run

```bash
# Terminal 1 - Backend
cd backend && npm run dev
# → http://localhost:5000

# Terminal 2 - Frontend
cd frontend && npm run dev
# → http://localhost:5173
```

## Common Issues

| Problem | Fix |
|---|---|
| No news showing | Check GNEWS_API_KEY in `.env` |
| MongoDB error | Make sure MongoDB is running locally |
| CORS error | Ensure backend is running before frontend |
| Port in use | Change `PORT` in `.env` |