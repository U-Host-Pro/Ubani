/**
 * SEO Utilities and Meta Tag Management
 * Helps manage meta tags, structured data, and SEO best practices
 */

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: any;
}

/**
 * Update page meta tags for SEO
 * Performance: Uses requestIdleCallback for non-critical updates
 */
export const updateMetaTags = (metadata: SEOMetadata): void => {
  // Performance: Deferf non-critical updates
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(() => updateMetaTagsSync(metadata));
  } else {
    setTimeout(() => updateMetaTagsSync(metadata), 0);
  }
};

/**
 * Synchronously update meta tags
 */
const updateMetaTagsSync = (metadata: SEOMetadata): void => {
  // Update title
  if (metadata.title) {
    document.title = metadata.title;
    updateOrCreateMetaTag('property', 'og:title', metadata.title);
    updateOrCreateMetaTag('name', 'twitter:title', metadata.title);
  }

  // Update description
  if (metadata.description) {
    updateOrCreateMetaTag('name', 'description', metadata.description);
    updateOrCreateMetaTag('property', 'og:description', metadata.description);
    updateOrCreateMetaTag('name', 'twitter:description', metadata.description);
  }

  // Update keywords
  if (metadata.keywords && metadata.keywords.length > 0) {
    updateOrCreateMetaTag('name', 'keywords', metadata.keywords.join(', '));
  }

  // Update canonical URL
  if (metadata.canonical) {
    updateOrCreateLinkTag('canonical', metadata.canonical);
  }

  // Update OpenGraph image
  if (metadata.ogImage) {
    updateOrCreateMetaTag('property', 'og:image', metadata.ogImage);
    updateOrCreateMetaTag('name', 'twitter:image', metadata.ogImage);
  }

  // Update OpenGraph type
  if (metadata.ogType) {
    updateOrCreateMetaTag('property', 'og:type', metadata.ogType);
  }

  // Update current URL
  updateOrCreateMetaTag('property', 'og:url', window.location.href);

  // Update structured data
  if (metadata.structuredData) {
    updateStructuredData(metadata.structuredData);
  }
};

/**
 * Create or update a meta tag
 */
const updateOrCreateMetaTag = (attribute: string, name: string, content: string): void => {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`);

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }

  meta.setAttribute('content', content);
};

/**
 * Create or update a link tag
 */
const updateOrCreateLinkTag = (rel: string, href: string): void => {
  let link = document.querySelector(`link[rel="${rel}"]`);

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
};

/**
 * Update JSON-LD structured data
 * SEO: Helps search engines understand page content
 */
const updateStructuredData = (data: any): void => {
  // Remove old script if exists
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Create new script
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

/**
 * Generate BreadcrumbList schema
 * SEO: Improves navigation display in search results
 */
export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
};

/**
 * Generate Article schema
 * SEO: Rich snippets for articles and blog posts
 */
export const generateArticleSchema = (data: {
  headline: string;
  description: string;
  image?: string;
  author: string;
  datePublished: string;
  dateModified?: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.headline,
    description: data.description,
    image: data.image,
    author: {
      '@type': 'Person',
      name: data.author,
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
  };
};

/**
 * Generate Product schema
 * SEO: Improve product visibility in search results
 */
export const generateProductSchema = (data: {
  name: string;
  description: string;
  price: string;
  currency: string;
  rating?: number;
  reviewCount?: number;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: data.name,
    description: data.description,
    offers: {
      '@type': 'Offer',
      price: data.price,
      priceCurrency: data.currency,
    },
    ...(data.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: data.rating,
        reviewCount: data.reviewCount || 0,
      },
    }),
  };
};

/**
 * Generate Service schema
 * SEO: Helps service-based businesses appear in local search
 */
export const generateServiceSchema = (data: {
  name: string;
  description: string;
  provider: string;
  areaServed?: string[];
  priceRange?: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.name,
    description: data.description,
    provider: {
      '@type': 'Organization',
      name: data.provider,
    },
    ...(data.areaServed && { areaServed: data.areaServed }),
    ...(data.priceRange && { priceRange: data.priceRange }),
  };
};

/**
 * Validate SEO compliance
 * Returns warnings for SEO issues
 */
export const validateSEO = (): string[] => {
  const warnings: string[] = [];

  // Check title
  const title = document.title;
  if (!title || title.length < 30) warnings.push('Page title is too short (< 30 chars)');
  if (title.length > 60) warnings.push('Page title is too long (> 60 chars)');

  // Check meta description
  const description = document.querySelector('meta[name="description"]')?.getAttribute('content');
  if (!description || description.length < 120) warnings.push('Meta description is too short (< 120 chars)');
  if (description && description.length > 160) warnings.push('Meta description is too long (> 160 chars)');

  // Check headings
  const h1s = document.querySelectorAll('h1');
  if (h1s.length === 0) warnings.push('No H1 tag found on page');
  if (h1s.length > 1) warnings.push('Multiple H1 tags found (should be only one)');

  // Check images without alt text
  const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
  if (imagesWithoutAlt.length > 0) {
    warnings.push(`${imagesWithoutAlt.length} image(s) missing alt text`);
  }

  // Check links without title
  const linksWithoutTitle = document.querySelectorAll('a:not([title]):not([aria-label])');
  if (linksWithoutTitle.length > 0) {
    warnings.push(`${linksWithoutTitle.length} link(s) missing title or aria-label`);
  }

  // Check for canonical URL
  if (!document.querySelector('link[rel="canonical"]')) {
    warnings.push('Missing canonical URL');
  }

  // Check for mobile viewport
  const viewport = document.querySelector('meta[name="viewport"]');
  if (!viewport) warnings.push('Missing mobile viewport meta tag');

  return warnings;
};

/**
 * Generate clean, SEO-friendly URL slug
 * SEO: Improves URL structure and readability
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_]+/g, '-') // Replace spaces with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Extract keywords from text
 * Performance: Basic keyword extraction for content analysis
 */
export const extractKeywords = (text: string, limit = 5): string[] => {
  const words = text
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 3)
    .filter((word) => !isCommonWord(word));

  // Get unique words and sort by frequency
  const frequency: Record<string, number> = {};
  words.forEach((word) => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word);
};

/**
 * List of common English words to exclude from keyword extraction
 */
const COMMON_WORDS = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'or', 'an', 'is', 'are', 'was',
  'were', 'been', 'being', 'which', 'who', 'what', 'when', 'where', 'why', 'how',
]);

/**
 * Check if word is common
 */
const isCommonWord = (word: string): boolean => {
  return COMMON_WORDS.has(word);
};
