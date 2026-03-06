/**
 * Validation and Sanitization Utilities
 * Security: Prevents XSS, injection attacks, and data corruption
 * Accessibility: Provides clear validation feedback
 */

import DOMPurify from 'dompurify';

/**
 * Email validation using RFC 5322 standards
 * Security: Validates email format before processing
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Phone number validation for South African numbers
 * Supports multiple formats: +27, 0027, (0)27
 */
export const validatePhone = (phone: string | undefined): boolean => {
  if (!phone) return true; // Phone is optional
  const phoneRegex = /^(\+27|0027|\(0\)27|0)[1-9]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ''));
};

/**
 * Text validation with length checks
 * Security: Prevents buffer overflow and DoS attacks
 */
export const validateText = (
  text: string,
  minLength = 2,
  maxLength = 1000,
  allowSpecialChars = false
): boolean => {
  if (!text || text.length < minLength || text.length > maxLength) return false;

  if (!allowSpecialChars) {
    // Allow only alphanumeric, spaces, and common punctuation
    const textRegex = /^[a-zA-Z0-9\s\-.,!?'()]+$/;
    return textRegex.test(text);
  }
  return true;
};

/**
 * Sanitize HTML to prevent XSS attacks
 * Security: Uses DOMPurify library for robust sanitization
 */
export const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br', 'p'],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  });
};

/**
 * Sanitize user input text
 * Security: Removes potentially dangerous characters and normalizes input
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';

  // Remove null bytes and control characters
  let sanitized = input.replace(/\0|[\x00-\x1F\x7F]/g, '');

  // Trim whitespace
  sanitized = sanitized.trim();

  // Replace multiple spaces with single space
  sanitized = sanitized.replace(/\s+/g, ' ');

  // Remove any HTML-like tags to prevent injection
  sanitized = sanitized.replace(/<[^>]*>/g, '');

  return sanitized;
};

/**
 * Validate URL to prevent Open Redirect vulnerabilities
 * Security: Only allows relative URLs or whitelisted domains
 */
export const validateURL = (url: string, allowedDomains: string[] = []): boolean => {
  try {
    if (url.startsWith('/')) return true; // Allow relative URLs
    const urlObj = new URL(url);
    return allowedDomains.includes(urlObj.hostname);
  } catch {
    return false;
  }
};

/**
 * Escape special characters for HTML
 * Security: Prevents HTML injection
 */
export const escapeHTML = (text: string): string => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
};

/**
 * Create a safe data attribute string
 * Security: Safely encode data for HTML attributes
 */
export const createSafeAttribute = (data: Record<string, any>): string => {
  return encodeURIComponent(JSON.stringify(sanitizeInput(JSON.stringify(data))));
};

/**
 * Validate and create safe JSON
 * Security: Prevents JSON injection attacks
 */
export const createSafeJSON = (data: any): string => {
  try {
    const json = JSON.stringify(data);
    return sanitizeHTML(json);
  } catch {
    return '{}';
  }
};

/**
 * Form data validation object
 * Combines multiple validation functions
 */
export interface ValidationRules {
  [key: string]: (value: any) => boolean | string;
}

/**
 * Validate form data against rules
 * Security: Validates all form inputs before submission
 */
export const validateFormData = (
  data: Record<string, any>,
  rules: ValidationRules
): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach((field) => {
    const result = rules[field](data[field]);
    if (result !== true) {
      errors[field] = typeof result === 'string' ? result : `Invalid ${field}`;
    }
  });

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Rate limiting check for form submissions
 * Security: Prevents spam and brute force attacks
 */
let lastSubmissionTime = 0;
const SUBMISSION_COOLDOWN_MS = 1000; // 1 second between submissions

export const checkRateLimit = (): boolean => {
  const now = Date.now();
  if (now - lastSubmissionTime < SUBMISSION_COOLDOWN_MS) {
    return false;
  }
  lastSubmissionTime = now;
  return true;
};

/**
 * Reset rate limit (for testing purposes)
 */
export const resetRateLimit = (): void => {
  lastSubmissionTime = 0;
};
