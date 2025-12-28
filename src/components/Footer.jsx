import React from 'react';
import { personalInfo } from '../data/content';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <p>{personalInfo.name} © {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
