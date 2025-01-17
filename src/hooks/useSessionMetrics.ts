import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface SessionMetrics {
  totalTime: number;
  pagesVisited: Set<string>;
  currentPageTime: number;
  isActive: boolean;
}

export const useSessionMetrics = () => {
  const [metrics, setMetrics] = useState<SessionMetrics>({
    totalTime: 0,
    pagesVisited: new Set([]),
    currentPageTime: 0,
    isActive: true,
  });

  const location = useLocation();
  const lastActivityTime = useRef(Date.now());
  const intervalRef = useRef<number>();

  useEffect(() => {
    const updateMetrics = () => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivityTime.current;

      // Check for inactivity (2 minutes)
      if (timeSinceLastActivity > 2 * 60 * 1000) {
        setMetrics(prev => ({ ...prev, isActive: false }));
        return;
      }

      setMetrics(prev => ({
        ...prev,
        totalTime: prev.totalTime + 1,
        currentPageTime: prev.currentPageTime + 1,
        isActive: true,
      }));
    };

    // Start interval for updating metrics
    intervalRef.current = window.setInterval(updateMetrics, 1000);

    // Track user activity
    const handleActivity = () => {
      lastActivityTime.current = Date.now();
      setMetrics(prev => ({ ...prev, isActive: true }));
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleActivity);

    return () => {
      window.clearInterval(intervalRef.current);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, []);

  // Update metrics when page changes
  useEffect(() => {
    setMetrics(prev => ({
      ...prev,
      pagesVisited: new Set([...prev.pagesVisited, location.pathname]),
      currentPageTime: 0,
    }));
  }, [location]);

  return metrics;
};