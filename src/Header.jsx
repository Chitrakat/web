import { useState } from 'react';
import './Header.css';

function Header() {
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
            <a href="#" className="dropdown-item" onClick={closeDropdown}>Option 1</a>
            <a href="#" className="dropdown-item" onClick={closeDropdown}>Option 2</a>
            <a href="#" className="dropdown-item" onClick={closeDropdown}>Option 3</a>
            <a href="#" className="dropdown-item" onClick={closeDropdown}>Option 4</a>
            <a href="#" className="dropdown-item" onClick={closeDropdown}>Option 5</a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;