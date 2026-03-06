/**
 * Footer Component
 * Accessibility: Semantic footer with proper navigation landmarks
 * SEO: Structured footer with internal links
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-gray-900 text-white py-12"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company info */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold mb-4">Ubani Hosting</h2>
            <p className="text-gray-300 mb-4">
              Professional web hosting services with 99.9% uptime guarantee. 
              Trusted by businesses worldwide for reliable hosting solutions.
            </p>
            {/* Contact information for accessibility */}
            <address className="not-italic text-gray-300 text-sm">
              <a href="mailto:contact@ubanihosting.co.za" className="hover:text-white transition-colors">
                contact@ubanihosting.co.za
              </a>
            </address>
          </div>
          
          {/* Services Navigation */}
          <nav aria-label="Services footer navigation">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a 
                  href="/services" 
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 py-1" 
                  aria-label="Web hosting services"
                >
                  Web Hosting
                </a>
              </li>
              <li>
                <a 
                  href="/services" 
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 py-1" 
                  aria-label="Domain registration services"
                >
                  Domain Registration
                </a>
              </li>
              <li>
                <a 
                  href="/services" 
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 py-1" 
                  aria-label="Website development services"
                >
                  Website Development
                </a>
              </li>
              <li>
                <a 
                  href="/services" 
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 py-1" 
                  aria-label="Migration services"
                >
                  Migration Services
                </a>
              </li>
            </ul>
          </nav>
          
          {/* Company Navigation */}
          <nav aria-label="Company footer navigation">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a 
                  href="/about" 
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 py-1"
                  aria-label="About Ubani Hosting"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 py-1"
                  aria-label="Contact us"
                >
                  Contact
                </a>
              </li>
              <li>
                <a 
                  href="/terms" 
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 py-1"
                  aria-label="Terms of service"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="https://www.ubanihosting.co.za/privacy" 
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 py-1"
                  aria-label="Privacy policy"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Footer divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* Copyright notice */}
          <p className="text-center text-gray-300 text-sm">
            &copy; {currentYear} Ubani Hosting. All rights reserved.
          </p>
          {/* Accessibility: Additional footer info */}
          <p className="text-center text-gray-400 text-xs mt-2">
            Ubani Hosting is committed to web accessibility. 
            <a 
              href="https://www.ubanihosting.co.za/accessibility" 
              className="ml-1 hover:text-white transition-colors"
              aria-label="Accessibility statement"
            >
              Learn more about our accessibility efforts
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;