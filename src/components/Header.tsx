import React, { useState } from 'react';
import { Menu, X, Server } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  // simple helper to close mobile menu
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Server className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">Ubani Hosting</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" onClick={closeMenu} className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/about" onClick={closeMenu} className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link to="/services" onClick={closeMenu} className="text-gray-700 hover:text-blue-600 transition-colors">
              Services
            </Link>
            <Link to="/contact" onClick={closeMenu} className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/contact"
              onClick={closeMenu}
              className="btn-primary"
            >
              Get Started
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                to="/"
                onClick={closeMenu}
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={closeMenu}
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left"
              >
                About
              </Link>
              <Link
                to="/services"
                onClick={closeMenu}
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left"
              >
                Services
              </Link>
              <Link
                to="/contact"
                onClick={closeMenu}
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left"
              >
                Contact
              </Link>
              <Link
                to="/contact"
                onClick={closeMenu}
                className="block w-full text-left px-3 py-2 btn-primary mt-4"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;