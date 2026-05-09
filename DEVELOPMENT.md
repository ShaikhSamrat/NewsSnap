# Development Guide

## How to Run the Project

### Terminal 1 - Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs on: http://localhost:5000

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

## Understanding the Code

### Frontend Flow

1. **App.jsx** → Main component, renders Home page
2. **Home.jsx** → 
   - Loads top news on page load (useEffect)
   - Has two separate functions:
     - `fetchTopNews()` → Gets trending news
     - `handleSearch()` → Gets search results
3. **SearchBar.jsx** → Form for user input
4. **NewsList.jsx** → Displays articles (handles loading, error, empty states)
5. **NewsCard.jsx** → Single article card
6. **api/api.js** → Makes calls to backend

### Backend Flow

1. **server.js** → Express app setup with CORS
2. **routes/newsRoutes.js** → Defines two endpoints:
   - GET /api/news/top
   - GET /api/news/search?q=
3. **controllers/newsController.js** → Handles requests, calls services
4. **services/gnewsService.js** → Makes actual API calls to GNews

## Key Files Explained

### Frontend/src/pages/Home.jsx
- **fetchTopNews()**: Fetches trending news, sets state
- **handleSearch()**: Takes search query, fetches from search endpoint
- **handleBackToHome()**: Clears search, loads home feed again
- Two completely separate data flows (NO mixing)

### Backend/services/gnewsService.js
- **getTopNewsFromGNews()**: Calls GNews API with "top" endpoint
- **searchNewsFromGNews(query)**: Calls GNews API with search query
- Both use same API key but different endpoints

## Styling

### App.css Organization
- General styles (margin, font, box-sizing)
- Header styles (gradient background)
- Search bar styles (sticky positioning)
- News card styles (hover effects, animations)
- Loading/Error/No results styles
- Responsive breakpoints (768px, 480px)

## Adding Features

### Add a News Category Filter
1. Add button in Home.jsx
2. Create new controller in newsController.js
3. Create new service function in gnewsService.js
4. Add new route in newsRoutes.js

### Change Styling
Edit App.css - all styles are well-organized by section

### Change API Results Count
In gnewsService.js, change `max: 20` to your preferred number

## Common Workflows

### To add logging
Add console.log() in controllers or services

### To handle new error types
Add try-catch in controllers and return proper status codes

### To debug frontend
- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab to see API calls

## Testing

1. Test home page loads automatically
2. Test search returns results
3. Test back button works
4. Test clicking read more opens article
5. Test error handling (turn off backend, search should show error)
6. Test loading state (might be too fast to see normally)

## Performance Tips

- Images are cached by browser
- Results are limited to 20 per request (good balance)
- No infinite scrolling (keeps it simple for learning)
- Axios handles connection pooling automatically

## Deployment Ideas

### Backend (Heroku, Railway, Render)
1. Create account on hosting platform
2. Deploy backend
3. Update frontend API_BASE_URL to hosted backend

### Frontend (Vercel, Netlify, GitHub Pages)
1. Build: `npm run build`
2. Deploy dist/ folder
3. Make sure backend API is accessible

Enjoy learning MERN!
