import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import NewsList from '../components/NewsList';
import { getTopNews, searchNews } from '../api/api';

// Home Page Component
export default function Home() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch top news when page loads
  useEffect(() => {
    fetchTopNews();
  }, []);

  // Function to fetch top news - HOME FEED
  const fetchTopNews = async () => {
    setIsLoading(true);
    setError(null);
    setIsSearching(false);

    try {
      const data = await getTopNews();
      setArticles(data.articles || []);
    } catch (err) {
      setError('Failed to load news. Please try again later.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle search - SEARCH FEATURE
  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    setIsSearching(true);

    try {
      const data = await searchNews(query);
      setArticles(data.articles || []);
    } catch (err) {
      setError('Failed to search news. Please try again later.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to go back to home feed
  const handleBackToHome = () => {
    fetchTopNews();
  };

  return (
    <div className="home">
      <header className="header">
        <h1 className="title">NewsSnap</h1>
        <p className="subtitle">Stay Updated with Latest News</p>
      </header>

      <SearchBar onSearch={handleSearch} />

      {isSearching && (
        <div className="search-info">
          <button onClick={handleBackToHome} className="back-button">
            ← Back to Home Feed
          </button>
        </div>
      )}

      <main className="main-content">
        <NewsList
          articles={articles}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
}
