import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Work from './components/Work';
import FortyTwo from './components/FortyTwo';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CaseStudy from './components/CaseStudy';
import './styles/index.css';

function HomePage() {
  return (
    <>
      <Header />
      <Work />
      <FortyTwo />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/washminute" element={<CaseStudy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;