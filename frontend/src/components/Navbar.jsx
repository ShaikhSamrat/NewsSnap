import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBookmark, FaHome } from 'react-icons/fa';
import SearchBar from './SearchBar';

export default function Navbar({ onSearch, clearSearch }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (clearSearch) clearSearch();
  };

  const handleSearch = (query) => {
    onSearch(query);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        
        {/* Logo - Shows text on large screens, icon only on mobile */}
        <Link 
          to="/" 
          className="logo"
          onClick={handleLogoClick}
          title="Go to Home"
        >
          <FaHome style={{ marginRight: '8px', fontSize: '26px' }} />
          <span>NewsSnap</span>
        </Link>

        {/* Search Bar */}
        <div className="nav-search">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Saved - Shows text on large screens, icon only on mobile */}
        <Link 
          to="/saved" 
          className="saved-link" 
          title="Saved Bookmarks"
        >
          <FaBookmark style={{ fontSize: '24px' }} />
          <span>Saved</span>
        </Link>

      </div>
    </nav>
  );
}