import { useState } from 'react';
import './Header.css';

function Header({ onNavigate, currentView }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="main-header">
      <div className="header-left">
        <span className="site-title">SUYASH CHITRAKAR</span>
      </div>
      <div className="header-right">
        <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
          <button 
            className="dropdown-toggle" 
            onClick={toggleDropdown}
            onBlur={closeDropdown}
          >
            Menu &#x25BC;
          </button>
          <div className="dropdown-menu">
            <a href="#" className={`dropdown-item ${currentView === 'home' ? 'active' : ''}`} onClick={() => { onNavigate('home'); closeDropdown(); }}>Home</a>
            <a href="#" className={`dropdown-item ${currentView === 'generator' ? 'active' : ''}`} onClick={() => { onNavigate('generator'); closeDropdown(); }}>Generate Workout</a>
            {currentView === 'workout' && (
              <a href="#" className="dropdown-item active" onClick={closeDropdown}>Active Workout</a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;