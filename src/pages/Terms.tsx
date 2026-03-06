import { useEffect } from 'react';
import { updateMetaTags } from '../utils/seo';

/**
 * Terms of Service Page
 * SEO: Legal compliance, meta tags, canonical URL
 * Accessibility: Proper heading hierarchy, semantic structure
 */
const Terms = () => {
  useEffect(() => {
    // Update meta tags for SEO
    updateMetaTags({
      title: 'Terms of Service - Ubani Hosting',
      description: 'Read our terms of service. Learn about our hosting policies, billing, and acceptable use.',
      canonical: 'https://ubanihosting.co.za/terms',
      ogType: 'website',
    });
  }, []);

  return (
    <article className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-lg text-gray-700 mb-4">Last updated: {new Date().toLocaleDateString('en-ZA')}</p>
          <p className="text-gray-700 leading-relaxed">
            By accessing and using Ubani Hosting services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </header>

        {/* Main content */}
        <div className="space-y-8 prose prose-lg max-w-none">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">1. Services</h2>
            <p className="text-gray-700 leading-relaxed">
              Ubani Hosting provides web hosting, domain registration, and related services with a 99.9% uptime guarantee. Additional services may be subject to separate terms and conditions.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
              <li>Shared hosting services</li>
              <li>Domain registration and management</li>
              <li>Email hosting and forwarding</li>
              <li>Database services</li>
              <li>SSL certificates</li>
              <li>Technical support</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">2. Billing and Payments</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Plans are billed monthly or annually in advance. Cancellation requests must be submitted at least 7 days before the next billing cycle to avoid charges.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3">Payment Terms:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Automatic renewal unless cancelled</li>
                <li>✓ Invoices sent before each billing period</li>
                <li>✓ 30-day money-back guarantee</li>
                <li>✓ All prices in South African Rand (ZAR)</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">3. Acceptable Use Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Users may not host illegal content or use our services for spam, abuse, or any other malicious purpose. Violations may result in immediate account suspension without refund.
            </p>
            <p className="font-semibold text-gray-900 mb-3">Prohibited Activities:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Hosting illegal or copyrighted content</li>
              <li>Sending spam or unsolicited emails</li>
              <li>Distributing malware or viruses</li>
              <li>Conducting denial of service (DoS) attacks</li>
              <li>Attempting to gain unauthorized access to systems</li>
              <li>Violating others' privacy or intellectual property rights</li>
              <li>Excessive bandwidth or resource consumption</li>
              <li>Phishing or fraud attempts</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">4. Liability and Disclaimers</h2>
            <p className="text-gray-700 leading-relaxed">
              We are not liable for any indirect, incidental, or consequential damages. Our liability is limited to the amounts paid by you in the previous 12 months.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-4">
              <h3 className="font-semibold text-gray-900 mb-3">Important Disclaimers:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Services provided "as is" without warranties</li>
                <li>• We are not responsible for data loss</li>
                <li>• Users should maintain their own backups</li>
                <li>• Uptime guarantee excludes maintenance windows</li>
                <li>• Force majeure events are excluded</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">5. Data Protection and Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              We take data protection seriously. Your personal information is handled in accordance with our Privacy Policy. For information on how we collect and process your data, please review our Privacy Policy.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              All content, materials, and services provided by Ubani Hosting are protected by intellectual property laws. You retain ownership of your content but grant us a license to operate and maintain your website.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">7. Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to terminate or suspend accounts that violate these terms or engage in prohibited activities. Upon termination, your access to services will be removed and data may be deleted.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">8. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of our services constitutes acceptance of modified terms.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For questions about these terms or our services, please contact us:
            </p>
            <div className="bg-blue-50 p-6 rounded-lg space-y-2">
              <p className="text-gray-900 font-semibold">Ubani Hosting</p>
              <p className="text-gray-700">
                Email:{' '}
                <a href="mailto:contact@ubanihosting.co.za" className="text-blue-600 hover:underline">
                  contact@ubanihosting.co.za
                </a>
              </p>
              <p className="text-gray-700">Location: South Africa</p>
              <p className="text-gray-700">Website: https://ubanihosting.co.za/</p>
            </div>
          </section>

          {/* Footer CTA */}
          <section className="text-center mt-12 pt-8 border-t border-gray-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Have Questions?</h2>
            <p className="text-gray-700 mb-6">If you have any questions about these terms, please get in touch.</p>
            <a href="/contact" className="btn-primary px-8 py-3 inline-block">
              Contact Us
            </a>
          </section>
        </div>
      </div>
    </article>
  );
};

export default Terms;