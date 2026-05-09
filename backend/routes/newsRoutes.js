import express from 'express';
import { getTopNews, searchNews } from '../controllers/newsController.js';

const router = express.Router();

// Route to get top/trending news
router.get('/top', getTopNews);

// Route to search for news
router.get('/search', searchNews);

export default router;
