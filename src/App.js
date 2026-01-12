import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import Header from './components/Header';
import Work from './components/Work';
import FortyTwo from './components/FortyTwo';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import './styles/index.css';

// Lazy load case study component for better performance
const WashMinuteCaseStudy = lazy(() => import('./components/WashMinuteCaseStudy'));

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 }
};

const pageTransition = {
  duration: 0.3,
  ease: 'easeInOut'
};

function HomePage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <Header />
      <main id="main-content">
        <Work />
        <FortyTwo />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  );
}

function CaseStudyPage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
        <WashMinuteCaseStudy />
      </Suspense>
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/washminute" element={<CaseStudyPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <BrowserRouter>
      <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "never"}>
        <ScrollToTop />
        <AnimatedRoutes />
      </MotionConfig>
    </BrowserRouter>
  );
}

export default App;