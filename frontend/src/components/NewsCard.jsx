import { useState } from 'react';

// NewsCard Component - Single news article card
export default function NewsCard({ article }) {
  const [showImage, setShowImage] = useState(true);

  const handleImageError = () => {
    setShowImage(false);
  };

  return (
    <div className="news-card">
      {article.image && showImage ? (
        <img
          src={article.image}
          alt={article.title}
          className="news-image"
          onError={handleImageError}
        />
      ) : (
        <div className="image-placeholder">No image available</div>
      )}
      <div className="news-content">
        <h3 className="news-title">{article.title}</h3>
        <p className="news-source">Source: {article.source.name}</p>
        <p className="news-description">{article.description}</p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="read-more-btn"
        >
          Read More
        </a>
      </div>
    </div>
  );
}
