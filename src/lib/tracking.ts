// src/lib/tracking.ts

// Helper to get stored parameters from sessionStorage and localStorage
export const getStoredParams = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  try {
    const local = localStorage.getItem('tracked_parameters');
    const session = sessionStorage.getItem('tracked_parameters');
    const localObj = local ? JSON.parse(local) : {};
    const sessionObj = session ? JSON.parse(session) : {};
    return { ...localObj, ...sessionObj };
  } catch (e) {
    console.error('Error reading tracked parameters:', e);
    return {};
  }
};

// Helper to set stored parameters to both sessionStorage and localStorage
export const setStoredParams = (params: Record<string, string>) => {
  if (typeof window === 'undefined') return;
  try {
    const str = JSON.stringify(params);
    localStorage.setItem('tracked_parameters', str);
    sessionStorage.setItem('tracked_parameters', str);
  } catch (e) {
    console.error('Error saving tracked parameters:', e);
  }
};

// Merges stored parameters into a given URL string, preserving existing parameters
export const appendStoredParamsToUrl = (urlStr: string): string => {
  if (typeof window === 'undefined') return urlStr;
  try {
    const stored = getStoredParams();
    if (Object.keys(stored).length === 0) return urlStr;

    // Determine if URL is absolute or relative
    const isAbsolute = urlStr.startsWith('http://') || urlStr.startsWith('https://') || urlStr.startsWith('//');
    const base = isAbsolute ? undefined : window.location.origin;
    const urlObj = new URL(urlStr, base);

    Object.entries(stored).forEach(([key, val]) => {
      // Merge: only set if URL doesn't have it already
      if (!urlObj.searchParams.has(key)) {
        urlObj.searchParams.set(key, val);
      }
    });

    if (isAbsolute) {
      return urlObj.toString();
    } else {
      // Return relative pathname + search + hash
      return urlObj.pathname + urlObj.search + urlObj.hash;
    }
  } catch (e) {
    return urlStr;
  }
};

// Scans the DOM for external payment links or relative links, and appends the stored parameters
export const propagateParameters = () => {
  if (typeof window === 'undefined') return;
  const stored = getStoredParams();
  if (Object.keys(stored).length === 0) return;

  const links = document.querySelectorAll('a');
  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Check if target is a payment gateway (Hotmart, Kiwify) or internal relative path
    const isPaymentDomain = /pay\.hotmart\.com|hotmart\.com|kiwify\.com|kiwify\.com\.br/i.test(href);
    const isRelativeInternal = href.startsWith('/') && !href.startsWith('//');

    if (isPaymentDomain || isRelativeInternal) {
      try {
        const isAbsolute = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
        const base = isAbsolute ? undefined : window.location.origin;
        const urlObj = new URL(href, base);

        let updated = false;
        Object.entries(stored).forEach(([key, val]) => {
          if (!urlObj.searchParams.has(key)) {
            urlObj.searchParams.set(key, val);
            updated = true;
          }
        });

        if (updated) {
          const newHref = isAbsolute 
            ? urlObj.toString() 
            : urlObj.pathname + urlObj.search + urlObj.hash;
          link.setAttribute('href', newHref);
        }
      } catch (e) {
        // Ignore malformed URLs
      }
    }
  });
};

// Checks if the current URL address bar lacks stored parameters, and restores them silently
export const restoreUrlParameters = () => {
  if (typeof window === 'undefined') return;
  const stored = getStoredParams();
  if (Object.keys(stored).length === 0) return;

  const currentUrl = new URL(window.location.href);
  let changed = false;

  Object.entries(stored).forEach(([key, val]) => {
    if (!currentUrl.searchParams.has(key)) {
      currentUrl.searchParams.set(key, val);
      changed = true;
    }
  });

  if (changed) {
    window.history.replaceState(null, '', currentUrl.pathname + currentUrl.search);
  }
};

// Overrides window.history methods to ensure any internal SPA navigations automatically carry the parameters
const overrideHistoryMethods = () => {
  if (typeof window === 'undefined') return;

  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;

  window.history.pushState = function (state, title, url) {
    if (url) {
      const updatedUrl = appendStoredParamsToUrl(url.toString());
      return originalPushState.apply(this, [state, title, updatedUrl]);
    }
    return originalPushState.apply(this, [state, title, url]);
  };

  window.history.replaceState = function (state, title, url) {
    if (url) {
      const updatedUrl = appendStoredParamsToUrl(url.toString());
      return originalReplaceState.apply(this, [state, title, updatedUrl]);
    }
    return originalReplaceState.apply(this, [state, title, url]);
  };
};

// Global initialization function
export const initTracking = () => {
  if (typeof window === 'undefined') return;

  // 1. Capture dynamic URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const currentParams: Record<string, string> = {};
  urlParams.forEach((value, key) => {
    currentParams[key] = value;
  });

  // Merge with previously saved parameters
  const existingParams = getStoredParams();
  const mergedParams = { ...existingParams, ...currentParams };

  // Only save if there's actually something to save
  if (Object.keys(mergedParams).length > 0) {
    setStoredParams(mergedParams);
  }

  // 2. Restore compatible browser URL address bar params
  restoreUrlParameters();

  // 3. Setup override for routers/custom pushes
  overrideHistoryMethods();

  // 4. Initial DOM sweep for links
  propagateParameters();

  // 5. Fast loop scan (500ms) to handle modals, dynamic buttons, or async renders
  setInterval(propagateParameters, 500);

  // 6. User interactions to catch link generation right at interaction time
  const interactionEvents = ['mouseover', 'touchstart', 'mousedown', 'click'];
  interactionEvents.forEach((event) => {
    window.addEventListener(event, propagateParameters, { passive: true });
  });
};
