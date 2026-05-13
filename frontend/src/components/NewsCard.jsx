import { useState, useEffect } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const DEFAULT_IMAGE = '/images/default-news.jpg';

export default function NewsCard({ 
  article, 
  onBookmarkToggle, 
  showBookmarkIcon = true 
}) {
  const [showImage, setShowImage] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const checkIfBookmarked = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/news/bookmarks`);
        const bookmarks = res.data;
        const alreadySaved = bookmarks.some(bookmark => bookmark.url === article.url);
        setIsBookmarked(alreadySaved);
      } catch (error) {
        console.error('Error checking bookmarks:', error);
      }
    };

    if (article?.url) {
      checkIfBookmarked();
    }
  }, [article?.url]);

  const handleImageError = () => {
    setShowImage(false);
  };

  const toggleBookmark = async () => {
    try {
      if (isBookmarked) {
        alert("Use Saved page to remove bookmark");
      } else {
        await axios.post(`${API_BASE_URL}/news/bookmarks`, {
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
        setIsBookmarked(true);
        alert('Already bookmarked!');
      } else {
        console.error('Error bookmarking:', error);
        alert('Failed to save bookmark');
      }
    }
  };

  const truncateDescription = (text) => {
    if (!text) return '';
    const maxLength = 195;
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  const imageSrc = article.image && showImage ? article.image : DEFAULT_IMAGE;

  return (
    <div className="news-card">
      <div style={{ position: 'relative' }}>
        <img
          src={imageSrc}
          alt={article.title}
          className="news-image"
          onError={handleImageError}
        />

        {/* Bookmark badge — top-right corner of image, CNN style */}
        {showBookmarkIcon && (
          <button
            onClick={toggleBookmark}
            title={isBookmarked ? "Already Saved" : "Save article"}
            style={{
              position: 'absolute',
              top: 0,
              right: '16px',
              width: '32px',
              height: '42px',
              background: isBookmarked ? '#cc0000' : '#1c1c1c',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              /* ribbon/bookmark tab shape */
              clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
              transition: 'background 0.2s ease',
              padding: 0,
            }}
          >
            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        )}
      </div>

      <div className="news-content">
        <h3 className="news-title">{article.title}</h3>

        <p className="news-source">Source: {article.source?.name}</p>

        <p className="news-description">
          {truncateDescription(article.description)}
        </p>

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