import { useCatalog } from '../../context/CatalogContext';

/* ─────────────────────────────────────────────
   TICKER SECTION (Marquee)
   A continuous scrolling bar for announcements.
   Edit TICKER_ITEMS in Admin Portal
───────────────────────────────────────────── */
export default function TickerSection() {
  const { TICKER_ITEMS } = useCatalog();
  return (
    <div className="ticker">
      <div className="ticker-inner">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}
