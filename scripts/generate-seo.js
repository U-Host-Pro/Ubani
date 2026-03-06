#!/usr/bin/env node
/**
 * SEO Generation Script
 * Generates sitemap.xml and robots.txt for Ubani Hosting
 * Run with: npm run generate:seo
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://ubanihosting.co.za';
const PAGES = [
  { url: '', priority: 1.0, changefreq: 'weekly' },
  { url: '/about', priority: 0.8, changefreq: 'monthly' },
  { url: '/services', priority: 0.9, changefreq: 'weekly' },
  { url: '/contact', priority: 0.8, changefreq: 'monthly' },
  { url: '/terms', priority: 0.5, changefreq: 'monthly' },
];

// Generate Sitemap XML
function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  PAGES.forEach(page => {
    sitemap += `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;
  
  const filepath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(filepath, sitemap, 'utf8');
  console.log('✓ Generated sitemap.xml');
}

// Generate Robots.txt
function generateRobots() {
  const robots = `# Robots.txt for Ubani Hosting - SEO Optimization
# Allows search engines to crawl the site efficiently

User-agent: *
Allow: /
Disallow: /api/
Disallow: /*.json$
Disallow: /admin/
Disallow: /private/

# Sitemaps for search engine discovery
Sitemap: ${BASE_URL}/sitemap.xml

# Crawl delay recommendation (in seconds)
Crawl-delay: 1

# Specific rules for Google
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Specific rules for Bing
User-agent: Bingbot
Allow: /
Crawl-delay: 1
`;

  const filepath = path.join(__dirname, '../public/robots.txt');
  fs.writeFileSync(filepath, robots, 'utf8');
  console.log('✓ Generated robots.txt');
}

// Run generators
console.log('Generating SEO files...');
generateSitemap();
generateRobots();
console.log('✓ SEO generation complete!');
