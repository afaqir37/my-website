import React from 'react';
import { personalInfo } from '../data/content';

const Nav = () => {
  return (
    <nav>
      <a href="#" className="nav-logo">{personalInfo.name}</a>
      <div className="nav-links">
        <a href="#work">Work</a>
        <a href="#background">Background</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
};

export default Nav;
