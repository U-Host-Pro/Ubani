import { useEffect } from 'react';
import { updateMetaTags } from '../utils/seo';

/**
 * About Page Component
 * SEO: Optimized with meta tags, semantic HTML5, structured data
 * Accessibility: Proper heading hierarchy, semantic elements
 */
const About = () => {
  useEffect(() => {
    // Update meta tags for SEO
    updateMetaTags({
      title: 'About Ubani Hosting - Our Story & Mission',
      description: 'Learn about Ubani Hosting - our mission to provide affordable, reliable hosting services. Dedicated team with years of experience in web infrastructure.',
      keywords: ['about', 'team', 'mission', 'hosting company', 'history'],
      canonical: 'https://ubanihosting.co.za/about',
      ogType: 'website',
    });
  }, []);

  return (
    <article className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">About Ubani Hosting</h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            We're passionate about delivering reliable, affordable hosting solutions to businesses and individuals across South Africa and beyond.
          </p>
        </header>

        {/* Main content */}
        <div className="space-y-8 prose prose-lg max-w-none">
          {/* Our Story Section */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              Founded by a passionate team with years of experience in web infrastructure and hosting technologies, Ubani Hosting was created with a simple mission: to make professional hosting accessible and affordable for everyone. We started small but with a big vision - to become South Africa's trusted hosting provider.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              From our humble beginnings, we've grown to serve hundreds of satisfied customers, ranging from small blogs to large enterprise applications. Every day, our team works tirelessly to ensure that our customers' websites stay online, secure, and fast.
            </p>
          </section>

          {/* Our Mission Section */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              We believe in three core principles:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
              <li><strong>Transparency:</strong> We're honest about our services and pricing with no hidden fees</li>
              <li><strong>Performance:</strong> We invest in the infrastructure to ensure your website is always fast and reliable</li>
              <li><strong>Customer Success:</strong> Your success is our success - we're committed to your growth</li>
            </ul>
          </section>

          {/* Our Values Section */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-700">We continuously evolve our technology and services to stay ahead of industry standards.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Reliability</h3>
                <p className="text-gray-700">99.9% uptime SLA backed by redundant infrastructure and expert monitoring.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Security</h3>
                <p className="text-gray-700">Your data safety is paramount - we implement enterprise-grade security measures.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
                <p className="text-gray-700">We're committed to supporting the local tech community and helping businesses grow.</p>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="bg-gray-50 p-8 rounded-lg mt-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why Choose Ubani Hosting?</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center flex-shrink-0 h-5 w-5 rounded-full bg-blue-600 text-white mr-3 mt-1">✓</span>
                <span><strong>Local Support:</strong> Our team understands the South African market and operates on South African time</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center flex-shrink-0 h-5 w-5 rounded-full bg-blue-600 text-white mr-3 mt-1">✓</span>
                <span><strong>Affordable Pricing:</strong> Professional hosting doesn't have to break the bank</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center flex-shrink-0 h-5 w-5 rounded-full bg-blue-600 text-white mr-3 mt-1">✓</span>
                <span><strong>Expert Team:</strong> Decades of combined experience in web hosting and infrastructure</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center flex-shrink-0 h-5 w-5 rounded-full bg-blue-600 text-white mr-3 mt-1">✓</span>
                <span><strong>24/7 Support:</strong> We're always here when you need help</span>
              </li>
            </ul>
          </section>

          {/* CTA */}
          <section className="text-center mt-12 pt-8 border-t border-gray-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Join Us?</h2>
            <p className="text-gray-700 mb-6">Start your hosting journey with Ubani today</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary px-8 py-3 inline-block">
                Get in Touch
              </a>
              <a href="/services" className="btn-secondary px-8 py-3 inline-block">
                View Plans
              </a>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
};

export default About;