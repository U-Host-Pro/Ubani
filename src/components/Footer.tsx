const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Ubani Hosting</h3>
            <p className="text-gray-300 mb-4">
              Professional web hosting services with 99.9% uptime guarantee. 
              Trusted by businesses worldwide for reliable hosting solutions.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/services" className="hover:text-white transition-colors">Web Hosting</a></li>
              <li><a href="/services" className="hover:text-white transition-colors">Domain Registration</a></li>
              <li><a href="/services" className="hover:text-white transition-colors">Website Development</a></li>
              <li><a href="/services" className="hover:text-white transition-colors">Migration Services</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Ubani Hosting. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;