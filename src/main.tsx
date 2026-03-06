import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initWebVitals, reportWebVitals } from './utils/performance'
import { initializeAccessibility } from './utils/accessibility'

/**
 * Application Entry Point
 * Performance: Lazy loads the app, tracks web vitals
 * Accessibility: Initializes accessibility features
 * Security: Uses React.StrictMode in development to catch potential issues
 */

// Initialize performance monitoring
if (typeof window !== 'undefined') {
  // Track Web Vitals (LCP, CLS, INP)
  initWebVitals((metric) => {
    console.log('[Performance Metric]', metric.name, metric.value, metric.unit);
    reportWebVitals(metric);
  });

  // Track page visibility for analytics
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      console.log('[Analytics] Page hidden');
    } else {
      console.log('[Analytics] Page visible');
    }
  });
}

// Get root element safely
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found. Please ensure index.html has a div with id="root"')
}

// Create and render React app
const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Initialize accessibility features after app mounts
window.addEventListener('load', () => {
  initializeAccessibility()
})

// Cleanup and performance logging
if (import.meta.env.PROD) {
  // Log initial page metrics
  window.addEventListener('load', () => {
    if (typeof window.performance !== 'undefined') {
      const perfData = window.performance.timing
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
      const connectTime = perfData.responseEnd - perfData.requestStart
      const renderTime = perfData.domComplete - perfData.domLoading
      
      console.log('[Performance] Page Load Time:', pageLoadTime, 'ms')
      console.log('[Performance] Connect Time:', connectTime, 'ms')
      console.log('[Performance] Render Time:', renderTime, 'ms')
    }
  })
}