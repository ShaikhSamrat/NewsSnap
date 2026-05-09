# NewsSnap - Quick Start Guide

## Step-by-Step Setup

### 1. Install Node.js
Download from: https://nodejs.org/
Choose the LTS version (recommended)

### 2. Get API Key
1. Visit: https://gnews.io
2. Create a free account
3. Get your API key from the dashboard

### 3. Setup Backend

```bash
cd backend
npm install
```

Open `backend/.env` and replace:
```
GNEWS_API_KEY=your_actual_key_here
```

Run backend:
```bash
npm run dev
```

You should see: `Server is running on http://localhost:5000`

### 4. Setup Frontend (new terminal)

```bash
cd frontend
npm install
npm run dev
```

You should see: `Port 5173` with the local URL

### 5. Open Website

Go to: http://localhost:5173

## Features to Test

1. **Homepage**: Should show latest news automatically
2. **Search**: Type a keyword and click Search
3. **Back Button**: Click to return to homepage
4. **Read More**: Click to open article in new tab
5. **Mobile**: Resize browser to test responsive design

## Common Issues

### Port Already in Use
- Backend: Change PORT in `.env`
- Frontend: Vite will auto-increment port

### No API Key
- Error will show in browser console
- Update `.env` with real key from gnews.io

### CORS Error
- Make sure backend is running first
- Check that API URLs match in `frontend/src/api/api.js`

## Build for Production

### Backend
No build needed, just run with Node.js

### Frontend
```bash
cd frontend
npm run build
```

Creates `dist/` folder for deployment

## Stopping the Servers

- Press `Ctrl + C` in terminal to stop

Enjoy NewsSnap!
