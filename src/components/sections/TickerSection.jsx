import { TICKER_ITEMS } from '../../data/categories';

/* ─────────────────────────────────────────────
   TICKER SECTION
   The scrolling bronze band below the hero.
   Edit TICKER_ITEMS in data/categories.js
   to change the text that scrolls.
───────────────────────────────────────────── */
export default function TickerSection() {
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
