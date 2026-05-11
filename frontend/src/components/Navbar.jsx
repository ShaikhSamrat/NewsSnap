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
        {/* Logo with Home Icon - Acts as single button */}
        <Link 
          to="/" 
          className="logo"
          onClick={handleLogoClick}
          title="Go to Home"
        >
          <FaHome style={{ marginRight: '10px', fontSize: '26px' }} />
          NewsSnap
        </Link>

        <div className="nav-search">
          <SearchBar onSearch={handleSearch} />
        </div>

        <Link to="/saved" className="saved-link">
          <FaBookmark style={{ marginRight: '8px' }} />
          Saved
        </Link>
      </div>
    </nav>
  );
}