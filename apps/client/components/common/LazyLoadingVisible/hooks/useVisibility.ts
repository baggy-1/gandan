import { type RefObject, useEffect, useState, useRef } from 'react';

type UseVisibility = <T extends HTMLElement>(
  ref: RefObject<T>,
  options?: Pick<IntersectionObserverInit, 'threshold'> & {
    once?: boolean;
  }
) => boolean;

const useVisibility: UseVisibility = (
  ref,
  { threshold = 0, once = false } = {}
) => {
  const [isVisible, setIsVisible] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (ref.current) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold,
      };

      observer.current = new IntersectionObserver(([{ isIntersecting }]) => {
        if (!once) {
          setIsVisible(isIntersecting);
          return;
        }

        if (isIntersecting) {
          setIsVisible(true);
        }
      }, options);

      observer.current.observe(ref.current);
    }

    // eslint-disable-next-line consistent-return
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [ref]);

  return isVisible;
};

export default useVisibility;
