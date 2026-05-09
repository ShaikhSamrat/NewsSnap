import { getTopNewsFromGNews, searchNewsFromGNews } from '../services/gnewsService.js';

// Controller to get top news
export const getTopNews = async (req, res) => {
  try {
    const newsData = await getTopNewsFromGNews();
    res.json(newsData);
  } catch (error) {
    console.error('Error in getTopNews:', error.message);
    res.status(500).json({ error: 'Failed to fetch top news' });
  }
};

// Controller to search news
export const searchNews = async (req, res) => {
  try {
    const { q } = req.query;

    // Check if search query is provided
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const newsData = await searchNewsFromGNews(q);
    res.json(newsData);
  } catch (error) {
    console.error('Error in searchNews:', error.message);
    res.status(500).json({ error: 'Failed to search news' });
  }
};
