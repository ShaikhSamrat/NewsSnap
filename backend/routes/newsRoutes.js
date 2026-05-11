import express from 'express';
import { getTopNews, searchNews } from '../controllers/newsController.js';
import { getBookmarks, saveBookmark, deleteBookmark } from '../controllers/bookmarkController.js';

const router = express.Router();

// News routes
router.get('/top', getTopNews);
router.get('/search', searchNews);

// Bookmark routes
router.get('/bookmarks', getBookmarks);
router.post('/bookmarks', saveBookmark);
router.delete('/bookmarks/:id', deleteBookmark);

export default router;