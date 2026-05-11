import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Saved from './pages/Saved';
import { FaBookmark } from 'react-icons/fa';

function App() {
  return (
    <Router>
      <div className="app">
        {/* Simple Navbar */}
        <nav style={{
          background: '#667eea',
          padding: '10px 20px',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold' }}>
            NewsSnap
          </Link>
          
          <Link to="/saved" style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <FaBookmark /> Saved
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;