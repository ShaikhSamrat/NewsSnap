import { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import axios from 'axios';

export default function Saved() {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookmarks = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('http://localhost:5000/api/news/bookmarks');
      setBookmarks(res.data);
    } catch (err) {
      setError('Failed to load bookmarks');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this bookmark?')) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/news/bookmarks/${id}`);
      setBookmarks(prev => prev.filter(b => b._id !== id));
    } catch (err) {
      alert('Failed to delete bookmark');
    }
  };

  if (isLoading) return <div className="loading">Loading bookmarks...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <header className="header">
        <h1 className="title">Saved Bookmarks</h1>
        <p className="subtitle">{bookmarks.length} articles saved</p>
      </header>

      <main className="main-content">
        {bookmarks.length === 0 ? (
          <div className="no-results">No bookmarks yet. Start saving articles!</div>
        ) : (
          <div className="news-list">
            {bookmarks.map(bookmark => (
              <div key={bookmark._id} style={{ position: 'relative' }}>
                <NewsCard 
                  article={bookmark} 
                  onBookmarkToggle={fetchBookmarks}
                  showBookmarkIcon={false}     // ← Hide bookmark icon here
                />
                <button 
                  onClick={() => handleDelete(bookmark._id)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: '#ff4444',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}