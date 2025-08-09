import { useState, useEffect, useRef } from 'react';
import type { RefObject } from 'react';

interface IntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const useIntersectionObserver = (
  options: IntersectionObserverOptions
): [RefObject<HTMLElement>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options.triggerOnce && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        } else {
            if(!options.triggerOnce) {
                setIsVisible(false);
            }
        }
      },
      {
        threshold: options.threshold ?? 0.1,
        root: options.root,
        rootMargin: options.rootMargin,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options.triggerOnce, options.threshold, options.root, options.rootMargin]);

  return [elementRef, isVisible];
};

export default useIntersectionObserver;