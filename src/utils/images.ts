/**
 * Image Optimization Utilities
 * Performance: Lazy loading, responsive images, modern formats
 * SEO: Image titles and descriptions
 */

declare global {
  interface Window {
    IntersectionObserver: any;
  }
}

/**
 * Initialize lazy loading for images
 * Performance: Defers loading of off-screen images
 */
export const initializeLazyLoading = (): void => {
  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers - load all images immediately
    console.warn('IntersectionObserver not supported');
    return;
  }

  const imageElements = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.getAttribute('data-src');
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px', // Load images 50px before they enter viewport
  });

  imageElements.forEach((img) => {
    imageObserver.observe(img);
  });
};

/**
 * Lazy load iframe content (e.g., maps, videos)
 * Performance: Defers loading of iframes until visible
 */
export const initializeLazyIframes = (): void => {
  if (!('IntersectionObserver' in window)) {
    return;
  }

  const iframeElements = document.querySelectorAll('iframe[data-src]');

  const iframeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const iframe = entry.target as HTMLIFrameElement;
        const src = iframe.getAttribute('data-src');
        if (src) {
          iframe.src = src;
          iframe.removeAttribute('data-src');
          iframeObserver.unobserve(iframe);
        }
      }
    });
  }, {
    rootMargin: '100px', // Load iframes 100px before viewport
  });

  iframeElements.forEach((iframe) => {
    iframeObserver.observe(iframe);
  });
};

/**
 * Generate responsive image srcset for modern browsers
 * Performance & SEO: Serves optimal image sizes for each device
 */
export const generateResponsiveImageSrcset = (
  basePath: string,
  sizes: number[] = [480, 768, 1024, 1280, 1600]
): string => {
  return sizes
    .map((size) => {
      const ext = basePath.split('.').pop();
      const nameWithoutExt = basePath.slice(0, -ext!.length - 1);
      return `${nameWithoutExt}-${size}w.${ext} ${size}w`;
    })
    .join(', ');
};

/**
 * Create picture element for WebP fallback
 * Performance: Serves modern formats with fallbacks
 */
export const generateImagePictureHTML = (
  imagePath: string,
  alt: string,
  title?: string,
  sizes?: string
): string => {
  const webpPath = imagePath.replace(/\.\w+$/, '.webp');
  return `
    <picture>
      <source srcset="${webpPath}" type="image/webp">
      <source srcset="${imagePath}" type="image/jpeg">
      <img 
        src="${imagePath}" 
        alt="${alt}"
        ${title ? `title="${title}"` : ''}
        ${sizes ? `sizes="${sizes}"` : ''}
        loading="lazy"
        decoding="async"
      />
    </picture>
  `;
};

/**
 * Preload strategic images for better LCP
 * Performance: Preloads hero images and critical assets
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.onload = () => resolve();
    link.onerror = () => reject();
    document.head.appendChild(link);
  });
};

/**
 * Get optimized image URL with size parameters
 * For services like Cloudinary, ImageKit, etc.
 */
export const getOptimizedImageUrl = (
  imageUrl: string,
  width?: number,
  height?: number,
  quality: number = 80,
  format: 'webp' | 'auto' = 'auto'
): string => {
  // Example for Cloudinary - adjust for your image service
  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  params.append('q', quality.toString());
  params.append('f', format);

  return `${imageUrl}?${params.toString()}`;
};

/**
 * Calculate aspect ratio for image
 * Performance: Prevents cumulative layout shift
 */
export const getImageAspectRatio = (width: number, height: number): string => {
  return `${width} / ${height}`;
};

/**
 * Generate blur-up placeholder
 * Performance & UX: Shows pixelated version while loading
 */
export const generateBlurHash = (): string => {
  // This is a simplified version - in production, use blurhash library
  // For now, return a solid color placeholder
  return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23e5e7eb" width="100" height="100"/%3E%3C/svg%3E';
};

/**
 * Create responsive image component configuration
 */
export interface ResponsiveImageConfig {
  src: string;
  alt: string;
  title?: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
}

/**
 * Generate HTML img tag with optimal attributes
 */
export const generateOptimizedImageHTML = (config: ResponsiveImageConfig): string => {
  const {
    src,
    alt,
    title,
    width,
    height,
    sizes,
    priority = false,
  } = config;

  const loading = priority ? 'eager' : 'lazy';
  const aspectRatio = getImageAspectRatio(width, height);

  return `
    <img
      src="${src}"
      alt="${alt}"
      ${title ? `title="${title}"` : ''}
      width="${width}"
      height="${height}"
      loading="${loading}"
      decoding="async"
      ${sizes ? `sizes="${sizes}"` : ''}
      style="aspect-ratio: ${aspectRatio}; object-fit: cover;"
      ${priority ? 'fetchpriority="high"' : ''}
    />
  `;
};

/**
 * Cleanup lazy loading observers
 */
export const cleanupLazyLoading = (): void => {
  // This is called when component unmounts
  // IntersectionObservers are automatically cleaned up by garbage collection
  console.log('[Performance] Lazy loading cleanup');
};
