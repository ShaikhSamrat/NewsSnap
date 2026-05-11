import { useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import axios from 'axios';

export default function NewsCard({ article, onBookmarkToggle }) {
  const [showImage, setShowImage] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleImageError = () => {
    setShowImage(false);
  };

  const toggleBookmark = async () => {
    try {
      if (isBookmarked) {
        // For simplicity, we'll just update UI. Delete handled in Saved page.
        alert("Use Saved page to remove bookmark");
      } else {
        await axios.post('http://localhost:5000/api/news/bookmarks', {
          title: article.title,
          description: article.description,
          url: article.url,
          image: article.image,
          source: article.source,
          publishedAt: article.publishedAt
        });
        setIsBookmarked(true);
        alert('✅ Saved to bookmarks!');
        if (onBookmarkToggle) onBookmarkToggle();
      }
    } catch (error) {
      if (error.response?.status === 400) {
        alert('Already bookmarked!');
      } else {
        console.error('Error bookmarking:', error);
        alert('Failed to save bookmark');
      }
    }
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 className="news-title">{article.title}</h3>
          <button 
            onClick={toggleBookmark}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              fontSize: '1.3rem',
              color: isBookmarked ? '#ffd700' : '#667eea'
            }}
            title="Bookmark"
          >
            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>

        <p className="news-source">Source: {article.source?.name}</p>
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