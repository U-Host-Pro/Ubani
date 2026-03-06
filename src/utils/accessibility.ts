/**
 * Accessibility Utilities
 * WCAG 2.1 AA compliance helpers
 * Focus management, keyboard navigation, screen reader support
 */

/**
 * Trap focus within a modal/dialog
 * Accessibility: Ensures keyboard users can't tab out of modal
 */
export const trapFocus = (element: HTMLElement): (() => void) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleKeyDown);

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
};

/**
 * Announce message to screen readers
 * Accessibility: Live regions for real-time announcements
 */
export const announceToScreenReader = (
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement is read (typically ~2 seconds)
  setTimeout(() => {
    announcement.remove();
  }, 2000);
};

/**
 * Manage focus on page transitions
 * Accessibility: Moves focus to main content after navigation
 */
export const focusMainContent = (): void => {
  const mainContent = document.querySelector('main') || document.getElementById('main');

  if (mainContent) {
    // Make main content focusable
    mainContent.setAttribute('tabindex', '-1');
    mainContent.focus();
    // Remove tabindex after focus
    mainContent.addEventListener(
      'blur',
      () => {
        mainContent.removeAttribute('tabindex');
      },
      { once: true }
    );

    // Announce navigation to screen reader
    announceToScreenReader('Page loaded');
  }
};

/**
 * Skip link management
 * Accessibility: Help users skip repetitive content
 */
export const initializeSkipLinks = (): void => {
  const skipLinks = document.querySelectorAll('a.skip-to-main');

  skipLinks.forEach((link) => {
    link.addEventListener('click', (e: Event) => {
      e.preventDefault();
      const target = document.querySelector('main') || document.getElementById('main');
      if (target) {
        (target as HTMLElement).focus();
        focusMainContent();
      }
    });
  });
};

/**
 * Check for reduced motion preference
 * Accessibility: Respect user's motion preferences
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Check for high contrast preference
 * Accessibility: Detect high contrast mode
 */
export const prefersHighContrast = (): boolean => {
  return window.matchMedia('(prefers-contrast: more)').matches;
};

/**
 * Check for dark mode preference
 * Accessibility & UX: Detect dark mode preference
 */
export const prefersDarkMode = (): boolean => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Add keyboard navigation to custom components
 * Accessibility: Arrow key navigation for lists/menus
 */
export const setupKeyboardNavigation = (
  container: HTMLElement,
  itemSelector: string,
  options: {
    horizontal?: boolean;
    wrap?: boolean;
  } = {}
): void => {
  const items = Array.from(container.querySelectorAll(itemSelector)) as HTMLElement[];

  items.forEach((item, index) => {
    item.addEventListener('keydown', (e: KeyboardEvent) => {
      const isNext = options.horizontal ? e.key === 'ArrowRight' : e.key === 'ArrowDown';
      const isPrev = options.horizontal ? e.key === 'ArrowLeft' : e.key === 'ArrowUp';
      const isHome = e.key === 'Home';
      const isEnd = e.key === 'End';

      let nextIndex = index;

      if (isNext) {
        nextIndex = index + 1;
        if (nextIndex >= items.length) {
          nextIndex = options.wrap ? 0 : items.length - 1;
        }
        e.preventDefault();
      } else if (isPrev) {
        nextIndex = index - 1;
        if (nextIndex < 0) {
          nextIndex = options.wrap ? items.length - 1 : 0;
        }
        e.preventDefault();
      } else if (isHome) {
        nextIndex = 0;
        e.preventDefault();
      } else if (isEnd) {
        nextIndex = items.length - 1;
        e.preventDefault();
      }

      items[nextIndex]?.focus();
    });
  });
};

/**
 * Validate color contrast ratio
 * Accessibility: Check WCAG color contrast compliance
 * Returns ratio (e.g., 4.5:1)
 */
export const getContrastRatio = (
  foregroundColor: string,
  backgroundColor: string
): number => {
  const fg = hexToRgb(foregroundColor);
  const bg = hexToRgb(backgroundColor);

  if (!fg || !bg) return 1;

  const fgLuminance = getRelativeLuminance(fg);
  const bgLuminance = getRelativeLuminance(bg);

  const lighter = Math.max(fgLuminance, bgLuminance);
  const darker = Math.min(fgLuminance, bgLuminance);

  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Convert hex color to RGB
 */
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * Get relative luminance for contrast calculation
 */
const getRelativeLuminance = (rgb: { r: number; g: number; b: number }): number => {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    const v = val / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * Initialize all accessibility features
 */
export const initializeAccessibility = (): void => {
  initializeSkipLinks();
  focusMainContent();

  // Listen for route changes to refocus content
  window.addEventListener('popstate', focusMainContent);
};
