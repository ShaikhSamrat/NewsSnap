import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Saved from './pages/Saved';
import Navbar from './components/Navbar';
import { useState } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <Router>
      <div className="app">
        <Navbar 
          onSearch={handleSearch} 
          clearSearch={clearSearch} 
        />

        <Routes>
          <Route 
            path="/" 
            element={<Home searchQuery={searchQuery} />} 
          />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;