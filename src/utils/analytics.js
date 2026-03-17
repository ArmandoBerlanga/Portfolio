// Privacy-friendly analytics utility
// This is a placeholder for integrating analytics like Plausible, Fathom, or Simple Analytics

/**
 * Initialize analytics
 * Uncomment and configure based on your chosen analytics provider
 */
export function initAnalytics() {
    // Option 1: Plausible Analytics
    // Add to index.html: <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>

    // Option 2: Fathom Analytics
    // Add to index.html: <script src="https://cdn.usefathom.com/script.js" data-site="YOUR_SITE_ID" defer></script>

    // Option 3: Simple Analytics
    // Add to index.html: <script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>

    console.log('Analytics initialized (placeholder)');
}

/**
 * Track custom events
 * @param {string} eventName - Name of the event
 * @param {object} properties - Event properties
 */
export function trackEvent(eventName, properties = {}) {
    // For Plausible:
    // if (window.plausible) {
    //     window.plausible(eventName, { props: properties });
    // }

    // For Fathom:
    // if (window.fathom) {
    //     window.fathom.trackGoal(eventName, properties.value || 0);
    // }

    console.log('Event tracked:', eventName, properties);
}

/**
 * Track page views (for SPAs)
 * @param {string} url - Page URL
 */
export function trackPageView(url) {
    // For Plausible (automatic in most cases)
    // window.plausible && window.plausible('pageview');

    // For Fathom:
    // window.fathom && window.fathom.trackPageview();

    console.log('Page view tracked:', url);
}
