import { useState, useEffect, useRef } from 'react';
import NewsList from '../components/NewsList';
import { getTopNews, searchNews } from '../api/api';

// Remove duplicates by URL and by normalized title
const deduplicate = (articles) => {
  const seenUrls = new Set();
  const seenTitles = new Set();

  return articles.filter((article) => {
    // Normalize title: lowercase, strip punctuation, compare first 80 chars
    const normalizedTitle = article.title
      ?.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 80);

    if (seenUrls.has(article.url) || seenTitles.has(normalizedTitle)) {
      return false;
    }

    seenUrls.add(article.url);
    if (normalizedTitle) seenTitles.add(normalizedTitle);
    return true;
  });
};

export default function Home({ searchQuery }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasLoadedTopNews = useRef(false);

  useEffect(() => {
    if (searchQuery?.trim()) {
      handleSearch(searchQuery);
      hasLoadedTopNews.current = false;
    } else {
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
      setArticles(deduplicate(data.articles || []));
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
      setArticles(deduplicate(data.articles || []));
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