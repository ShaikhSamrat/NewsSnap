import { Link, useLocation } from 'react-router-dom';
import { FaBookmark } from 'react-icons/fa';
import SearchBar from './SearchBar';

export default function Navbar({ onSearch, clearSearch }) {
  const location = useLocation();

  const handleLogoClick = () => {
    if (clearSearch) clearSearch();
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link 
          to="/" 
          className="logo"
          onClick={handleLogoClick}
        >
          NewsSnap
        </Link>

        <div className="nav-search">
          <SearchBar onSearch={onSearch} />
        </div>

        <Link to="/saved" className="saved-link">
          <FaBookmark style={{ marginRight: '8px' }} />
          Saved
        </Link>
      </div>
    </nav>
  );
}