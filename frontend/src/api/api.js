import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Get top news
export const getTopNews = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/news/top`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top news:', error);
    throw error;
  }
};

// Search for news
export const searchNews = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/news/search`, {
      params: { q: query }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
};
