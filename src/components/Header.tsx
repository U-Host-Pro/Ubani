import React, { useState, useCallback } from 'react';
import { Menu, X, Server } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Header Component
 * Accessibility: Semantic navigation with ARIA labels and keyboard support
 * Performance: Memoized handlers and optimized re-renders
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Performance: Memoize callback to prevent unnecessary re-renders
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Accessibility: Handle keyboard events for menu
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu();
    }
  };

  return (
    <header 
      className="bg-white shadow-sm sticky top-0 z-50"
      role="banner"
      onKeyDown={handleKeyDown}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and branding */}
          <Link 
            to="/" 
            className="flex items-center group"
            onClick={closeMenu}
            aria-label="Ubani Hosting - Home"
          >
            <Server 
              className="h-8 w-8 text-blue-600 mr-2 group-hover:animate-pulse" 
              aria-hidden="true"
            />
            <span className="text-xl font-bold text-gray-900">Ubani Hosting</span>
          </Link>
          
          {/* Main navigation - semantic nav element */}
          <nav 
            className="hidden md:flex space-x-8"
            role="navigation"
            aria-label="Main navigation"
          >
            <NavLink to="/" label="Home" isActive={location.pathname === '/'} />
            <NavLink to="/about" label="About" isActive={location.pathname === '/about'} />
            <NavLink to="/services" label="Services" isActive={location.pathname === '/services'} />
            <NavLink to="/contact" label="Contact" isActive={location.pathname === '/contact'} />
          </nav>

          {/* CTA Button - desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/contact"
              onClick={closeMenu}
              className="btn-primary"
              aria-label="Get started with Ubani Hosting"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button with accessibility attributes */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu - semantic nav with proper ARIA attributes */}
        {isMenuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <MobileNavLink to="/" label="Home" onClick={closeMenu} />
            <MobileNavLink to="/about" label="About" onClick={closeMenu} />
            <MobileNavLink to="/services" label="Services" onClick={closeMenu} />
            <MobileNavLink to="/contact" label="Contact" onClick={closeMenu} />
            <Link
              to="/contact"
              onClick={closeMenu}
              className="block w-full text-left px-3 py-2 btn-primary mt-4 text-center"
            >
              Get Started
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

/**
 * NavLink Component
 * Accessibility: Show active state and proper focus management
 */
interface NavLinkProps {
  to: string;
  label: string;
  isActive?: boolean;
}

function NavLink({ to, label, isActive }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={`transition-colors py-2 px-1 border-b-2 ${
        isActive
          ? 'border-blue-600 text-blue-600 font-semibold'
          : 'border-transparent text-gray-700 hover:text-blue-600'
      } focus:outline-none focus:ring-2 focus:ring-blue-500 rounded`}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </Link>
  );
}

/**
 * MobileNavLink Component
 * Accessibility: Mobile-optimized navigation links
 */
interface MobileNavLinkProps {
  to: string;
  label: string;
  onClick: () => void;
}

function MobileNavLink({ to, label, onClick }: MobileNavLinkProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded w-full text-left transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {label}
    </Link>
  );
}

export default Header;