import { useEffect, useCallback } from 'react';

/**
 * useScrollReveal — attaches an IntersectionObserver to all .sr, .sr-l, .sr-r, .stg
 * elements and adds .vis when they enter the viewport.
 * Call inside a component after render, or pass a dep list to re-run.
 */
export default function useScrollReveal(deps = []) {
  const observe = useCallback(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('vis');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.sr,.sr-l,.sr-r,.stg').forEach((el) => io.observe(el));
    return io;
  }, []);

  useEffect(() => {
    const io = observe();
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
