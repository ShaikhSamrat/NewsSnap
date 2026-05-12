// frontend/src/api/api.js
import axios from 'axios';
import { API_BASE_URL } from '../config';

export const getTopNews = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/news/top`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top news:', error);
    throw error;
  }
};

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