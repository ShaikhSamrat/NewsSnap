import axios from 'axios';

const GNEWS_BASE_URL = 'https://gnews.io/api/v4';

const getApiKey = () => {
  const key = process.env.GNEWS_API_KEY;
  if (!key) {
    console.error('GNEWS_API_KEY is not defined. Please add it to backend/.env');
  }
  return key;
};

// Function to get top news from GNews API
export const getTopNewsFromGNews = async () => {
  try {
    const response = await axios.get(`${GNEWS_BASE_URL}/top-headlines`, {
      params: {
        token: getApiKey(),
        lang: 'en',
        max: 20, // Get 20 top news articles
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching from GNews API:', error.message);
    throw error;
  }
};

// Function to search news from GNews API
export const searchNewsFromGNews = async (query) => {
  try {
    const response = await axios.get(`${GNEWS_BASE_URL}/search`, {
      params: {
        q: query,
        token: getApiKey(),
        lang: 'en',
        max: 20, // Get 20 search results
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error searching from GNews API:', error.message);
    throw error;
  }
};
