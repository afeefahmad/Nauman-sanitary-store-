import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mx = useRef(0);
  const my = useRef(0);
  const rx = useRef(0);
  const ry = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;

    const onMove = (e) => {
      mx.current = e.clientX;
      my.current = e.clientY;
    };
    document.addEventListener('mousemove', onMove, { passive: true });

    const loop = () => {
      // Use transform instead of left/top — no layout recalculation, GPU composited
      dot.style.transform  = `translate(calc(${mx.current}px - 50%), calc(${my.current}px - 50%))`;
      rx.current += (mx.current - rx.current) * 0.12;
      ry.current += (my.current - ry.current) * 0.12;
      ring.style.transform = `translate(calc(${rx.current}px - 50%), calc(${ry.current}px - 50%))`;
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const addExpand = () => document.body.classList.add('cursor-expand');
    const remExpand = () => document.body.classList.remove('cursor-expand');

    const targets = document.querySelectorAll(
      'a,button,.cat-card,.brand-pill,.ac-item,.bp-item,.prod-card,.why-card,.cat-prod-card'
    );
    targets.forEach(el => {
      el.addEventListener('mouseenter', addExpand);
      el.addEventListener('mouseleave', remExpand);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      targets.forEach(el => {
        el.removeEventListener('mouseenter', addExpand);
        el.removeEventListener('mouseleave', remExpand);
      });
    };
  }, []);

  return (
    <>
      <div id="c-dot"  ref={dotRef}  />
      <div id="c-ring" ref={ringRef} />
    </>
  );
}
