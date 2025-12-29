import React from 'react';
import { personalInfo } from '../data/content';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-copyright">{personalInfo.name} © {currentYear}</p>
        <p className="footer-colophon">Built with React in Morocco. Fueled by mint tea.</p>
      </div>
    </footer>
  );
};

export default Footer;
