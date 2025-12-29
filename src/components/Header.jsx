import React from 'react';
import Nav from './Nav';
import { introText } from '../data/content';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Nav />
        <div className="intro">
          <h1 dangerouslySetInnerHTML={{ __html: introText.headline }} />
          <p dangerouslySetInnerHTML={{ __html: introText.description }} />
        </div>
      </div>
    </header>
  );
};

export default Header;
