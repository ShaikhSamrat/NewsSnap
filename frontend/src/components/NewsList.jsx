import NewsCard from './NewsCard';

// NewsList Component - Display list of news articles
export default function NewsList({ articles, isLoading, error }) {
  // Show loading message
  if (isLoading) {
    return <div className="loading">Loading news...</div>;
  }

  // Show error message
  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  // Show message if no articles found
  if (!articles || articles.length === 0) {
    return <div className="no-results">No news found. Try searching!</div>;
  }

  // Display all articles
  return (
    <div className="news-list">
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  );
}
