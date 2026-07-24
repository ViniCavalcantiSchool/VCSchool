import React, { useState, useEffect, useRef } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  id?: string;
}

export default function LazySection({ children, fallback = null, rootMargin = '200px', id }: LazySectionProps) {
  const [isIntersected, setIsIntersected] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsIntersected(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [rootMargin]);

  // Fallback to load anyway after 4 seconds (important for slower connections / crawler bots)
  useEffect(() => {
    if (isIntersected) return;
    const timer = setTimeout(() => {
      setIsIntersected(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [isIntersected]);

  return (
    <div ref={containerRef} id={id} className="w-full">
      {isIntersected ? children : fallback}
    </div>
  );
}
