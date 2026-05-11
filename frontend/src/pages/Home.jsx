import { useState, useEffect, useRef } from 'react';
import NewsList from '../components/NewsList';
import { getTopNews, searchNews } from '../api/api';

export default function Home({ searchQuery }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasLoadedTopNews = useRef(false);

  // Main effect to handle search or show top news
  useEffect(() => {
    if (searchQuery?.trim()) {
      // Search mode
      handleSearch(searchQuery);
      hasLoadedTopNews.current = false;
    } else {
      // Top news mode
      if (!hasLoadedTopNews.current) {
        hasLoadedTopNews.current = true;
        fetchTopNews();
      }
    }
  }, [searchQuery]);

  const fetchTopNews = async () => {
    setIsLoading(true);
    setError(null);

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

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);

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

  return (
    <div className="home">
      <header className="header">
        <h1 className="title">NewsSnap</h1>
        <p className="subtitle">Stay Updated with Latest News</p>
      </header>

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