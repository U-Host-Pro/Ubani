import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

// Performance: Lazy load routes for code splitting
// Each page is loaded only when needed
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Terms = lazy(() => import('./pages/Terms'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Skip to main content link for accessibility */}
        <a href="#main" className="skip-to-main">Skip to main content</a>
        
        {/* Header with navigation landmarks */}
        <Header />
        
        {/* Main content area with semantic HTML and ARIA roles */}
        <main id="main" className="flex-grow">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Home page - loaded eagerly for better LCP */}
              <Route path="/" element={<Home />} />
              
              {/* Other pages - lazy loaded for better code splitting */}
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              
              {/* 404 fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        
        {/* Footer with navigation landmarks */}
        <Footer />
      </div>
    </Router>
  );
}

// 404 Not Found component
function NotFound() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-600 mb-6">Page not found</p>
        <a href="/" className="btn-primary">Go back home</a>
      </div>
    </div>
  );
}

export default App;