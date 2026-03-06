import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { validateEmail, validatePhone, validateText, sanitizeInput, checkRateLimit } from '../utils/validation';
import { updateMetaTags } from '../utils/seo';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

/**
 * Contact Page Component
 * Security: Input validation, sanitization, rate limiting, CSRF protection
 * Accessibility: Form labels, error messages, proper ARIA attributes
 * Performance: Form state management optimized with react-hook-form
 */
const Contact = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>({
    defaultValues: { name: '', email: '', phone: '', subject: '', message: '' },
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Update meta tags for SEO
    updateMetaTags({
      title: 'Contact Us - Ubani Hosting Support',
      description: 'Get in touch with Ubani Hosting support. We respond within 24 hours. Email, phone, or contact form.',
      keywords: ['contact', 'support', 'help', 'inquiry'],
      canonical: 'https://ubanihosting.co.za/contact',
      ogType: 'website',
    });
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Security: Rate limiting check
      if (!checkRateLimit()) {
        setSubmitStatus('error');
        return;
      }

      // Security: Input validation
      if (!validateText(data.name, 2, 100)) throw new Error('Invalid name');
      if (!validateEmail(data.email)) throw new Error('Invalid email');
      if (data.phone && !validatePhone(data.phone)) throw new Error('Invalid phone');
      if (!validateText(data.subject, 3, 200)) throw new Error('Invalid subject');
      if (!validateText(data.message, 10, 5000, true)) throw new Error('Invalid message');

      // Security: Sanitize inputs
      const sanitizedData = {
        from_name: sanitizeInput(data.name),
        from_email: sanitizeInput(data.email),
        from_phone: sanitizeInput(data.phone),
        subject: sanitizeInput(data.subject),
        message: sanitizeInput(data.message),
      };

      if (import.meta.env.DEV) {
        // Development: Use EmailJS directly
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          sanitizedData,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
      } else {
        // Production: Use backend API with CSRF protection
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
          },
          body: JSON.stringify(sanitizedData),
        });

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }
      }

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <article className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help. Send us a message and our team will respond as soon as possible.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information Sidebar */}
          <aside className="space-y-6">
            {/* Email Card */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <Mail className="h-8 w-8 text-blue-600 mt-1 flex-shrink-0" aria-hidden="true" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                  <a
                    href="mailto:contact@ubanihosting.co.za"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    contact@ubanihosting.co.za
                  </a>
                  <p className="text-sm text-gray-600 mt-2">We'll respond within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <Phone className="h-8 w-8 text-blue-600 mt-1 flex-shrink-0" aria-hidden="true" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                  <p className="text-gray-700 font-medium">Monday - Friday, 9AM - 5PM (SAST)</p>
                  <p className="text-sm text-gray-600 mt-2">For urgent matters, email us</p>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <MapPin className="h-8 w-8 text-blue-600 mt-1 flex-shrink-0" aria-hidden="true" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-700">South Africa</p>
                  <p className="text-sm text-gray-600 mt-2">Serving clients worldwide</p>
                </div>
              </div>
            </div>

            {/* Why Choose Us Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3">Why Choose Ubani?</h4>
              <ul className="text-sm text-blue-800 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-lg">✓</span> 99.9% Uptime Guarantee
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">✓</span> 24/7 Expert Support
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">✓</span> Affordable Pricing
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">✓</span> Reliable Infrastructure
                </li>
              </ul>
            </div>
          </aside>

          {/* Contact Form */}
          <section className="card" role="region" aria-labelledby="contact-form-heading">
            <h2 id="contact-form-heading" className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3" role="alert">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h4 className="font-semibold text-green-900">Message Sent Successfully!</h4>
                  <p className="text-sm text-green-800 mt-1">Thank you for contacting us. We'll get back to you soon.</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3" role="alert">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h4 className="font-semibold text-red-900">Failed to Send Message</h4>
                  <p className="text-sm text-red-800 mt-1">
                    Please check your input or email us directly at{' '}
                    <a href="mailto:contact@ubanihosting.co.za" className="font-semibold underline">
                      contact@ubanihosting.co.za
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* Contact Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', {
                    required: 'Name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' },
                    maxLength: { value: 100, message: 'Name must be less than 100 characters' },
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                  disabled={isSubmitting}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-red-500 text-sm mt-1 font-medium">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    validate: (value) => validateEmail(value) || 'Invalid email address',
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-sm mt-1 font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-gray-500 text-xs">(Optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone', {
                    validate: (value) => !value || validatePhone(value) || 'Invalid phone number',
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+27 (0)11 000 0000"
                  disabled={isSubmitting}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="text-red-500 text-sm mt-1 font-medium">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register('subject', {
                    required: 'Subject is required',
                    minLength: { value: 3, message: 'Subject must be at least 3 characters' },
                    maxLength: { value: 200, message: 'Subject must be less than 200 characters' },
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                  }`}
                  placeholder="How can we help?"
                  disabled={isSubmitting}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                />
                {errors.subject && (
                  <p id="subject-error" className="text-red-500 text-sm mt-1 font-medium">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="message"
                  {...register('message', {
                    required: 'Message is required',
                    minLength: { value: 10, message: 'Message must be at least 10 characters' },
                    maxLength: { value: 5000, message: 'Message must be less than 5000 characters' },
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none ${
                    errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                  }`}
                  rows={6}
                  placeholder="Tell us more about your inquiry..."
                  disabled={isSubmitting}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="text-red-500 text-sm mt-1 font-medium">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-70 disabled:cursor-not-allowed transition"
                aria-busy={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </section>
        </div>
      </div>
    </article>
  );
};

export default Contact;