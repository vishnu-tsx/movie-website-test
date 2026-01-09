import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';

const Navbar = ({ siteName }) => {
  // Array of navigation links
  const navLinks = ['Home', 'Movies', 'TV Shows', 'My List'];
  
  // State for mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h2>{siteName || 'MovieHub'}</h2>
        </div>

        {/* Burger Menu Icon */}
        <button 
          className={`burger-menu ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <ul className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link, index) => (
            <li key={index} className="navbar-link" onClick={() => setIsMobileMenuOpen(false)}>
              {link}
            </li>
          ))}
        </ul>

        {/* Search Box */}
        <div className="navbar-search">
          <input type="text" placeholder="Search movies..." />
        </div>
      </div>
    </nav>
  );
};

// PropTypes for type checking
Navbar.propTypes = {
  siteName: PropTypes.string,
};

// Default props
Navbar.defaultProps = {
  siteName: 'MovieHub',
};

export default Navbar;