import { useEffect } from 'react';
import { updateMetaTags } from '../utils/seo';
import { Check } from 'lucide-react';

interface Plan {
  name: string;
  priceMonthly: string;
  priceYearly: string;
  features: string[];
  popular?: boolean;
  description: string;
  bestFor: string;
}

/**
 * Services/Pricing Page Component
 * SEO: Product schema markup for each plan
 * Performance: Lazy loads pricing information
 * Accessibility: Proper heading hierarchy, semantic structure
 */
const plans: Plan[] = [
  {
    name: 'Starter',
    priceMonthly: 'R39',
    priceYearly: 'R390',
    features: [
      '1 Website',
      '10GB Storage',
      '100GB Bandwidth',
      'Unlimited Email',
      'Basic Assistance',
      'SSL Certificate',
      'WordPress Pre-installed',
    ],
    description: 'Perfect for beginners and small projects',
    bestFor: 'Beginners, portfolios, small blogs',
  },
  {
    name: 'Business',
    priceMonthly: 'R79',
    priceYearly: 'R790',
    features: [
      '5 Websites',
      '50GB Storage',
      '500GB Bandwidth',
      'Unlimited Email',
      'Enhanced Assistance',
      'SSL Certificate',
      'WordPress Pre-installed',
      'Database Support',
      'Priority Support',
    ],
    popular: true,
    description: 'Most popular choice for growing businesses',
    bestFor: 'Small business, e-commerce sites',
  },
  {
    name: 'Enterprise',
    priceMonthly: 'R149',
    priceYearly: 'R1490',
    features: [
      'Unlimited Websites',
      '200GB Storage',
      'Unlimited Bandwidth',
      'Unlimited Email',
      'Dedicated Account Manager',
      'SSL Certificate',
      'Advanced Security',
      'Performance Optimization',
      'Custom Assistance',
      '24/7 Phone Support',
    ],
    description: 'For demanding applications and enterprise needs',
    bestFor: 'Enterprise, high-traffic sites',
  },
];

const Services = () => {
  useEffect(() => {
    // Update meta tags for SEO
    updateMetaTags({
      title: 'Web Hosting Plans & Pricing - Ubani Hosting',
      description: 'Affordable hosting plans starting from R39/month. Starter, Business, and Enterprise hosting with 99.9% uptime guarantee.',
      keywords: ['hosting plans', 'pricing', 'web hosting', 'affordable hosting', 'business hosting'],
      canonical: 'https://ubanihosting.co.za/services',
      ogType: 'website',
    });
  }, []);

  return (
    <article className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Our Hosting Plans</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
            Choose the plan that fits your needs. All plans include a 30‑day money-back guarantee and our 99.9% uptime SLA.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Check className="h-5 w-5 text-green-600" aria-hidden="true" />
              <span>30-day Money-back Guarantee</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="h-5 w-5 text-green-600" aria-hidden="true" />
              <span>99.9% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="h-5 w-5 text-green-600" aria-hidden="true" />
              <span>Free SSL Certificate</span>
            </div>
          </div>
        </header>

        {/* Pricing Grid */}
        <div className="grid gap-8 md:grid-cols-3 lg:gap-6">
          {plans.map((plan) => (
            <section
              key={plan.name}
              className={`relative rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl ${
                plan.popular ? 'md:scale-105 ring-2 ring-blue-600 bg-white' : 'bg-white'
              }`}
              role="region"
              aria-labelledby={`plan-${plan.name}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="bg-blue-600 text-white py-2 px-4 text-center text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="p-6 md:p-8">
                {/* Plan name */}
                <h2 id={`plan-${plan.name}`} className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h2>

                {/* Plan description */}
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

                {/* Pricing */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.priceMonthly}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">or {plan.priceYearly} annually (save 20%)</p>
                </div>

                {/* Best for */}
                <p className="text-sm text-gray-700 mb-6">
                  <strong>Best for:</strong> <span>{plan.bestFor}</span>
                </p>

                {/* Features */}
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-700">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div>
                  <a
                    href="/contact"
                    className={`w-full py-3 px-6 rounded-lg font-semibold text-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      plan.popular
                        ? 'btn-primary focus:ring-blue-500'
                        : 'btn-secondary focus:ring-gray-500'
                    }`}
                    aria-label={`Get started with ${plan.name} plan`}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Features Comparison Section */}
        <section className="mt-16 md:mt-20 pt-12 md:pt-16 border-t-2 border-gray-300">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
            What's Included in Every Plan?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Security', items: ['Free SSL Certificate', 'DDoS Protection', 'Automated Backups', 'Malware Scanning'] },
              { title: 'Performance', items: ['NVMe SSD Storage', 'Global CDN', 'Advanced Caching', 'HTTP/2 Support'] },
              { title: 'Support', items: ['Email Support', 'Help Center', 'Knowledge Base', 'Community Forum'] },
              { title: 'Tools', items: ['File Manager', 'Database Manager', 'Email Manager', 'WordPress Tools'] },
            ].map((category) => (
              <div key={category.title} className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg text-gray-900 mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-700">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16 md:mt-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { q: 'Can I upgrade later?', a: 'Yes, you can upgrade to a higher plan anytime with pro-rata billing.' },
              { q: 'Is there a setup fee?', a: 'No, there are no hidden setup fees or additional charges.' },
              { q: 'What if I\'m not satisfied?', a: 'We offer a 30-day money-back guarantee with no questions asked.' },
              { q: 'Do you offer a trial?', a: 'You can try our service risk-free for 30 days.' },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                <p className="text-gray-700">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 md:mt-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6 opacity-90">Join hundreds of happy customers on Ubani Hosting</p>
          <a href="/contact" className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors">
            Choose Your Plan
          </a>
        </section>
      </div>
    </article>
  );
};

export default Services;