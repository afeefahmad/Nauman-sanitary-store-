import { useEffect, useRef } from 'react';
import { useCatalog } from '../../context/CatalogContext';

/* ─────────────────────────────────────────────
   STAT BLOCK — animated counting number
   Counts up from 0 when scrolled into view.
───────────────────────────────────────────── */
function StatBlock({ count, label }) {
  const ref      = useRef(null);
  const observed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !observed.current) {
        observed.current = true;
        const isLarge = count > 99;
        const dur     = 1800;
        const start   = performance.now();
        const step = (now) => {
          const t    = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(ease * count) + (isLarge ? '+' : '');
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    if (el) io.observe(el);
    return () => io.disconnect();
  }, [count]);

  return (
    <div className="stat-block">
      <div className="stat-num" ref={ref}>0</div>
      <div className="stat-lbl">{label}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STATS SECTION
   Animated counting numbers for social proof.
   Edit STATS in Admin Portal to change
   numbers and labels dynamically.
───────────────────────────────────────────── */
export default function StatsSection() {
  const { STATS } = useCatalog();
  return (
    <section className="sec-sm" id="stats">
      <div className="stats-row stg">
        {STATS.map((s, i) => (
          <StatBlock key={i} count={s.count} label={s.label} />
        ))}
      </div>
    </section>
  );
}
