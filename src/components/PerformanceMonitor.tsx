"use client";

import { useEffect, useState } from "react";

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  tti: number | null;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    tti: null
  });

  useEffect(() => {
    // Only run in production for performance monitoring
    if (process.env.NODE_ENV !== 'production') return;

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        const metric = entry as any;
        
        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              setMetrics(prev => ({ ...prev, fcp: Math.round(metric.startTime) }));
            }
            break;
          case 'largest-contentful-paint':
            setMetrics(prev => ({ ...prev, lcp: Math.round(metric.startTime) }));
            break;
          case 'layout-shift':
            if (!metric.hadRecentInput) {
              setMetrics(prev => ({ 
                ...prev, 
                cls: prev.cls ? prev.cls + metric.value : metric.value 
              }));
            }
            break;
        }
      });
    });

    // Observe various performance metrics
    try {
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] });
    } catch (e) {
      console.warn('Performance monitoring not supported:', e);
    }

    // Measure Time to Interactive (TTI) approximation
    let ttiMeasured = false;
    const checkTTI = () => {
      if (ttiMeasured) return;
      
      const navEntry = performance.getEntriesByType('navigation')[0] as any;
      if (navEntry && navEntry.domContentLoadedEventEnd) {
        setMetrics(prev => ({ 
          ...prev, 
          tti: Math.round(navEntry.domContentLoadedEventEnd - navEntry.fetchStart)
        }));
        ttiMeasured = true;
      }
    };

    // Check TTI after a delay to ensure DOM is ready
    setTimeout(checkTTI, 1000);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Log metrics to console for debugging (remove in production)
  useEffect(() => {
    if (Object.values(metrics).some(val => val !== null)) {
      console.log('Performance Metrics:', metrics);
    }
  }, [metrics]);

  // This component doesn't render anything visible
  return null;
}