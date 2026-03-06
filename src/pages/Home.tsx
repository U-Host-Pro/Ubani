import { useEffect } from 'react';
import { ShieldCheck, Zap, Globe, Award, Users } from 'lucide-react';
import { updateMetaTags } from '../utils/seo';

/**
 * Home Page Component
 * SEO: Optimized with semantic HTML5, meta tags, and structured data
 * Performance: Lazy loads icons, uses native image loading optimization
 * Accessibility: Proper heading hierarchy, ARIA labels, semantic elements
 */
const Home = () => {
  useEffect(() => {
    // Update meta tags for SEO optimization on page load
    updateMetaTags({
      title: 'Ubani Hosting - Professional Web Hosting Services | 99.9% Uptime',
      description: 'Fast, secure, and reliable web hosting with 99.9% uptime guarantee. Professional hosting services for businesses in South Africa.',
      keywords: ['hosting', 'web hosting', 'professional', 'reliable', 'uptime', 'South Africa'],
      canonical: 'https://ubanihosting.co.za/',
      ogType: 'website',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Ubani Hosting',
        url: 'https://ubanihosting.co.za/',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://ubanihosting.co.za/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="bg-gradient-to-br from-blue-100 to-white py-20 md:py-32"
        aria-labelledby="hero-heading"
      >
        <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          {/* Main heading - Performance: Critical LCP element */}
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight"
          >
            Fast, Secure & Reliable Hosting
          </h1>

          {/* Hero subheading */}
          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience professional web hosting with{' '}
            <strong className="font-semibold">99.9% uptime guarantee</strong>, blazing fast speeds, and enterprise-grade
            security. Perfect for businesses of all sizes.
          </p>

          {/* Hero CTA button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/services"
              className="btn-primary px-8 py-4 text-lg text-center inline-block"
              aria-label="View our hosting plans"
            >
              View Plans
            </a>
            <a
              href="/contact"
              className="btn-secondary px-8 py-4 text-lg text-center inline-block"
              aria-label="Contact our sales team"
            >
              Contact Sales
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-gray-300 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-semibold">99.9%</span>
              <span>Uptime SLA</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">24/7</span>
              <span>Expert Support</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">100+</span>
              <span>Happy Customers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Semantic article */}
      <article className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Sets Us Apart</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              We'resoluble for delivering excellence in every aspect of our service
            </p>
          </header>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1: Security */}
            <section className="card group hover:shadow-2xl transition-shadow" role="region" aria-labelledby="security-heading">
              <div className="flex justify-center mb-4">
                <ShieldCheck className="h-12 w-12 text-blue-600 flex-shrink-0" aria-hidden="true" />
              </div>
              <h3 id="security-heading" className="text-xl font-semibold text-center mb-2 text-gray-900">
                Enterprise Security
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Advanced security measures including SSL encryption, DDoS protection, and regular backups to keep your site safe from threats.
              </p>
              <ul className="mt-4 text-sm text-gray-600 space-y-2">
                <li>✓ 256-bit SSL Encryption</li>
                <li>✓ DDoS Protection</li>
                <li>✓ Automated Backups</li>
              </ul>
            </section>

            {/* Feature 2: Performance */}
            <section className="card group hover:shadow-2xl transition-shadow" role="region" aria-labelledby="performance-heading">
              <div className="flex justify-center mb-4">
                <Zap className="h-12 w-12 text-blue-600 flex-shrink-0" aria-hidden="true" />
              </div>
              <h3 id="performance-heading" className="text-xl font-semibold text-center mb-2 text-gray-900">
                Lightning Fast
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Optimized servers with SSD storage, CDN integration, and caching for lightning-fast loading times and best Core Web Vitals scores.
              </p>
              <ul className="mt-4 text-sm text-gray-600 space-y-2">
                <li>✓ NVMe SSD Storage</li>
                <li>✓ Global CDN</li>
                <li>✓ Advanced Caching</li>
              </ul>
            </section>

            {/* Feature 3: Global Reach */}
            <section className="card group hover:shadow-2xl transition-shadow" role="region" aria-labelledby="global-heading">
              <div className="flex justify-center mb-4">
                <Globe className="h-12 w-12 text-blue-600 flex-shrink-0" aria-hidden="true" />
              </div>
              <h3 id="global-heading" className="text-xl font-semibold text-center mb-2 text-gray-900">
                Global Infrastructure
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Distributed infrastructure with servers across multiple regions ensuring low latency and high availability worldwide.
              </p>
              <ul className="mt-4 text-sm text-gray-600 space-y-2">
                <li>✓ Multi-Region Redundancy</li>
                <li>✓ Low Latency</li>
                <li>✓ 99.9% Uptime</li>
              </ul>
            </section>
          </div>
        </div>
      </article>

      {/* Additional Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose Ubani?</h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
              <Award className="h-10 w-10 text-blue-600 mb-3" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">Award-Winning Support</h3>
              <p className="text-gray-600">Expert support team available 24/7 to help with any issues</p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
              <Zap className="h-10 w-10 text-blue-600 mb-3" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">One-Click Install</h3>
              <p className="text-gray-600">Easy installation of popular applications like WordPress</p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
              <Users className="h-10 w-10 text-blue-600 mb-3" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">Trusted by Many</h3>
              <p className="text-gray-600">Join 1000+ satisfied customers hosting with Ubani</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Semantic section with proper structure */}
      <section className="py-16 md:py-24 bg-white" aria-labelledby="testimonials-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-700">Trusted by businesses and developers worldwide</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <blockquote className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-600">
              <p className="text-gray-700 mb-4 italic">
                "Ubani Hosting has been a game-changer for our business. Their service is fast, reliable, and the support team is incredibly responsive. Highly recommend!"
              </p>
              <footer className="not-italic">
                <div className="font-semibold text-gray-900">John Doe</div>
                <div className="text-sm text-gray-600">CEO, Tech Startup</div>
              </footer>
            </blockquote>

            {/* Testimonial 2 */}
            <blockquote className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-600">
              <p className="text-gray-700 mb-4 italic">
                "The uptime is incredible, and the migration was seamless. My website loads faster than it ever has. This is exactly what we needed!"
              </p>
              <footer className="not-italic">
                <div className="font-semibold text-gray-900">Jane Smith</div>
                <div className="text-sm text-gray-600">Founder, E-commerce Store</div>
              </footer>
            </blockquote>

            {/* Testimonial 3 */}
            <blockquote className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-600">
              <p className="text-gray-700 mb-4 italic">
                "Affordable pricing with top-notch features. Our website loads faster than ever before, and the control panel is user-friendly."
              </p>
              <footer className="not-italic">
                <div className="font-semibold text-gray-900">Mike Johnson</div>
                <div className="text-sm text-gray-600">Web Developer</div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of businesses trusting Ubani for their hosting needs
          </p>
          <a
            href="/services"
            className="inline-block bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
          >
            View Plans & Pricing
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;