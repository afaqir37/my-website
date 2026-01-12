import { useState, useEffect } from 'react';
import { personalInfo } from '../data/content';
import ThemeToggle from './ThemeToggle';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <nav aria-label="Main navigation">
      <a href="#" className="nav-logo">
        <span>{personalInfo.name}</span>
      </a>

      {/* Desktop navigation */}
      <div className="nav-links desktop-nav">
        <a href="#work">Work</a>
        <a href="#background">Background</a>
        <a href="#contact">Contact</a>
        <ThemeToggle />
      </div>

      {/* Mobile controls (hamburger + theme toggle) */}
      <div className="mobile-controls">
        <ThemeToggle />
        <button
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-links">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#background" onClick={closeMenu}>Background</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </div>
      </div>

      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && (
        <div className="menu-overlay" onClick={closeMenu}></div>
      )}
    </nav>
  );
};

export default Nav;
