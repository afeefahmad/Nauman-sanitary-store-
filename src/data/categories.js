// ═══════════════════════════════════════════════════════════
//  NAUMAN SANITARY STORE — Complete Product Catalog
//  All products organized by category & brand
//  No prices shown on website
// ═══════════════════════════════════════════════════════════

export const CONTACT = {
  owner: 'Nauman Zaffar',
  phone: '03008118085',
  phoneFormatted: '+92 300 8118085',
  whatsapp: '923008118085',
  whatsappUrl: 'https://wa.me/923008118085',
  email: 'afeefzafar2@gmail.com',
  address: 'Nauman Sanitary Store, Lahore & Multan, Punjab, Pakistan',
  hours: {
    weekdays: 'Mon – Sat: 9:00 AM – 8:00 PM',
    sunday: 'Sunday: 10:00 AM – 5:00 PM',
  },
};

export const TICKER_ITEMS = [
  'Nesco Ceramics', 'Pool Sanitary Ware', 'Porta', 'Master Sanitary',
  'Dell Sanitary', 'Brite Sanitary', 'PPRC Pipes', 'UPVC Fittings',
  'Muslim Showers', 'Designer Basins', 'Bath Sets', 'Vanity Solutions',
  'Kitchen Sinks', 'Water Geysers', 'LED Mirrors', 'Bath Tubs',
];

export const STATS = [
  { count: 500, label: 'Products Available' },
  { count: 8,   label: 'Premium Brands' },
  { count: 18,  label: 'Categories' },
  { count: 2000, label: 'Happy Customers' },
];

// ── All Brands ──────────────────────────────────────────────
export const BRANDS = [
  { id: 'porta',    name: 'Porta',    logo: '/porta-logo.webp', hero: true },
  { id: 'master',   name: 'Master',   hero: true },
  { id: 'pool',     name: 'Pool',     hero: true },
  { id: 'iclboch',  name: 'ICL Boch', hero: true },
  { id: 'dell',     name: 'Dell',     hero: false },
  { id: 'brite',    name: 'Brite',    hero: false },
  { id: 'sonex',    name: 'Sonex',    hero: false },
  { id: 'faisal',   name: 'Faisal',   hero: false },
  { id: 'kale',     name: 'Kale',     hero: false },
  { id: 'grohe',    name: 'Grohe',    hero: false },
];

// ── Hero Categories (5-card grid on homepage) ───────────────
export const HERO_CATEGORIES = [
  {
    slug: 'toilets',
    no: '01 · Category',
    name: 'Commodes & Toilets',
    hint: 'One Piece · Two Piece · Wall Hung',
    icon: '🚽',
  },
  {
    slug: 'basins',
    no: '02 · Category',
    name: 'Basins',
    hint: 'Pedestal · Wall Hung · Counter Top',
    icon: '🪣',
  },
  {
    slug: 'taps',
    no: '03 · Category',
    name: 'Taps & Fittings',
    hint: 'Bath Sets · Mixers · Muslim Showers · Sensor Taps',
    icon: '🚰',
  },
  {
    slug: 'vanities',
    no: '04 · Category',
    name: 'Vanities',
    hint: 'Aluminum · PVC · LED Mirrors',
    icon: '🪞',
  },
];

// ═══════════════════════════════════════════════════════════
//  BRAND SHOWCASE PANELS (Ceramics Brands)
// ═══════════════════════════════════════════════════════════
export const BRAND_PANELS = [
  {
    id: 'pool',
    label: 'Pool Sanitary Ware',
    title: '34 Years of Excellence\nin Ceramics',
    desc: 'Pool Sanitary has evolved into a premier ceramics brand, committed to exemplary customer care, high-impact research and quality. Their large range spans innovative designs engineered for modern living.',
    badges: [
      { num: '34+', lbl: 'Years' },
      { num: 'SALE', lbl: 'Running' },
      { num: '50+', lbl: 'Products' },
    ],
    products: [
      { name: 'Galaxy Commode (GALAXY)' },
      { name: 'Mobi Commode (MOBI)' },
      { name: 'Porta China Commode' },
      { name: 'Crystal Commode (CRYSTAL)' },
      { name: 'Pool 7 Commode' },
      { name: 'Pool 2 Commode' },
    ],
  },
  {
    id: 'nesco',
    label: 'Nesco Ceramics',
    title: "Pakistan's Leading\nCeramic Manufacturer",
    desc: 'Nesco Ceramics has produced world-class sanitary ware for decades. Known for superior glaze quality, precision engineering and contemporary designs — the perfect blend of form and function.',
    badges: [
      { num: 'ISO', lbl: 'Certified' },
      { num: '30+', lbl: 'Years' },
      { num: '100+', lbl: 'Products' },
    ],
    products: [
      { name: 'Basin Pedestal — Classic' },
      { name: 'One Piece Toilet' },
      { name: 'Wall Hung Basin' },
      { name: 'Squatting Pan' },
      { name: 'Two Piece Toilet' },
      { name: 'Urinal — Wall Mounted' },
    ],
  },
  {
    id: 'porta',
    label: 'Porta Sanitary',
    title: 'Modern Design\nMeets Durability',
    desc: 'Porta is renowned for contemporary sanitary ware designs with premium build quality. Their product range covers everything from stylish basins to complete bathroom suites.',
    badges: [
      { num: '200+', lbl: 'Products' },
      { num: 'PKR', lbl: 'Best Price' },
    ],
    products: [
      { name: 'Designer Commode' },
      { name: 'Art Bowl Basin' },
      { name: 'One Piece Toilet' },
      { name: 'Pedestal Basin' },
      { name: 'Complete Bath Set' },
      { name: 'Squat Pan' },
    ],
  },
  {
    id: 'master',
    label: 'Master Sanitary Ware',
    title: 'Master Crafted\nfor Pakistan',
    desc: 'Master Sanitary Ware brings premium quality sanitary products to Pakistani households. Known for innovative designs and durable construction, Master products define modern bathroom living.',
    badges: [
      { num: '20+', lbl: 'Years' },
      { num: '150+', lbl: 'Products' },
    ],
    products: [
      { name: 'GRACE 1-Piece Commode (OP 02)' },
      { name: 'AROMA 1-Piece Commode (OP 01)' },
      { name: 'FANTASY 1-Piece (OP 06)' },
      { name: 'EDGE 1-Piece Commode (OP 03)' },
      { name: 'AROMA Commode (OP 04)' },
      { name: '1-Piece Commode (OP 07)' },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
//  ALL CATEGORIES — Complete Navigation List
// ═══════════════════════════════════════════════════════════
export const ALL_CATEGORIES = [
  {
    slug: 'toilets',
    icon: '🚽',
    name: 'Commodes & Toilets',
    subs: 'One Piece · Two Piece · Wall Hung',
    image: '/prod-commode.png',
    brands: ['Pool Sanitary Ware', 'Dell Sanitary Ware', 'Brite Sanitary Ware', 'Master Sanitary Ware', 'Nesco Ceramics', 'Porta'],
    subCategories: ['One Piece Toilet', 'Two Piece Toilets', 'Wall Hung Toilets'],
    products: [
      // ── Step-by-Step Order from sanitary.pk ──
      { brand: 'Pool Sanitary Ware', name: 'GALAXY Commode', model: 'GALAXY', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'MOBI Commode', model: 'MOBI', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'PORTA CHINA Commode', model: 'PORTA CHINA', tag: 'Pool' },
      { brand: 'Dell Sanitary Ware', name: 'Dell 2 Commode', model: 'Dell 2', tag: 'Dell' },
      { brand: 'Dell Sanitary Ware', name: 'Belta Commode', model: 'Belta', tag: 'Dell' },
      { brand: 'Dell Sanitary Ware', name: 'Glow Commode', model: 'Glow', tag: 'Dell' },
      { brand: 'Dell Sanitary Ware', name: 'Charlie Commode', model: 'Charlie', tag: 'Dell' },
      { brand: 'Dell Sanitary Ware', name: 'Galaxy Commode', model: 'Galaxy', tag: 'Dell' },
      { brand: 'Dell Sanitary Ware', name: 'Dell Plus Commode', model: 'Dell Plus', tag: 'Dell' },
      { brand: 'Dell Sanitary Ware', name: 'Dell Commode', model: 'Dell', tag: 'Dell' },
      { brand: 'Dell Sanitary Ware', name: 'Flow Commode', model: 'Flow', tag: 'Dell' },
      { brand: 'Pool Sanitary Ware', name: 'CRYSTAL Commode', model: 'CRYSTAL', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'POOL 7 Commode', model: 'POOL 7', tag: 'Pool' },
      { brand: 'Brite Sanitary Ware', name: 'Bravo One Piece Commode', model: 'Bravo', tag: 'Brite' },
      { brand: 'Brite Sanitary Ware', name: 'Brite One Piece Commode', model: 'Brite', tag: 'Brite' },
      { brand: 'Brite Sanitary Ware', name: 'Mobi One Piece Commode', model: 'Mobi', tag: 'Brite' },
      { brand: 'Brite Sanitary Ware', name: 'Galaxy One Piece Commode', model: 'Galaxy', tag: 'Brite' },
      { brand: 'Brite Sanitary Ware', name: 'Vital One Piece Commode', model: 'Vital', tag: 'Brite' },
      { brand: 'Brite Sanitary Ware', name: 'Beauty One Piece Commode', model: 'Beauty', tag: 'Brite' },
      { brand: 'Brite Sanitary Ware', name: 'Delta One Piece Commode', model: 'Delta', tag: 'Brite' },
      { brand: 'Brite Sanitary Ware', name: 'Crystal One Piece Commode', model: 'Crystal', tag: 'Brite' },
      { brand: 'Brite Sanitary Ware', name: 'Decent One Piece Commode', model: 'Decent', tag: 'Brite' },
      { brand: 'Pool Sanitary Ware', name: 'POOL 2 Commode', model: 'POOL 2', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'POOL 4 Commode', model: 'POOL 4', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'DAEWOO Commode', model: 'DAEWOO', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'DIAMOND Commode', model: 'DIAMOND', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'UNIQUE Commode', model: 'UNIQUE', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'Grace Wall Hanging Commode', model: 'Grace', tag: 'Pool' },
      { brand: 'Master Sanitary Ware', name: 'GRACE 1-Piece Commode — Code OP 02', model: 'GRACE', tag: 'Master' },
      { brand: 'Master Sanitary Ware', name: 'AROMA 1-Piece Commode — Code OP 01', model: 'AROMA', tag: 'Master' },
      { brand: 'Master Sanitary Ware', name: 'FANTASY 1-Piece — Code OP 06', model: 'FANTASY', tag: 'Master' },
      { brand: 'Master Sanitary Ware', name: 'EDGE 1-Piece Commode — Code OP 03', model: 'EDGE', tag: 'Master' },
      { brand: 'Master Sanitary Ware', name: 'AROMA One Piece Toilet — Code OP 04', model: 'AROMA II', tag: 'Master' },
      { brand: 'Master Sanitary Ware', name: '1-Piece Commode — Code OP 07', model: 'OP 07', tag: 'Master' },
      // ── Nesco Commodes ──
      { brand: 'Nesco Ceramics', name: 'Vital Commode', model: 'Vital', tag: 'Nesco' },
      { brand: 'Nesco Ceramics', name: 'Teddy Commode', model: 'Teddy', tag: 'Nesco' },
      { brand: 'Nesco Ceramics', name: 'Diamond Commode', model: 'Diamond', tag: 'Nesco' },
      { brand: 'Nesco Ceramics', name: 'Royal Commode', model: 'Royal', tag: 'Nesco' },
      { brand: 'Porta', name: 'Porta HD427TMB Commode', model: 'HD427TMB', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta HD429MB Commode', model: 'HD429MB', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta HD6N Commode', model: 'HD6N', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta HD427TMG Commode', model: 'HD427TMG', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta HD950 Commode', model: 'HD950', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta HD945 Commode', model: 'HD945', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta HD944 Commode', model: 'HD944', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta HD940 Commode', model: 'HD940', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta HD935 Commode', model: 'HD935', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta HD925 Commode', model: 'HD925', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta 827WH Commode', model: '827WH', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta 432WH Commode', model: '432WH', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta 427WHMB Commode', model: '427WHMB', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta HD348WH Commode', model: 'HD348WH', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta HD427WH Commode', model: 'HD427WH', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta HD185N Commode', model: 'HD185N', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta HD104N Commode', model: 'HD104N', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta HD131N Commode', model: 'HD131N', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta HD180N Commode', model: 'HD180N', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta HD113A Commode', model: 'HD113A', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta HD180A Commode', model: 'HD180A', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta HD173N Commode', model: 'HD173N', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta HD177A Commode', model: 'HD177A', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta HD20N Commode', model: 'HD20N', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta HD200N Commode', model: 'HD200N', tag: 'Porta' },
      { brand: 'Porta', name: 'Porta HD229A Commode', model: 'HD229A', tag: 'Porta' },
      { brand: 'ICL Boch', name: 'ICL Boch Premium Commode', model: 'Standard', tag: 'ICL Boch' },
      // ── Kale Commodes ──
      { brand: 'Kale', name: 'Babel Universal WC + Cistern', model: 'Babel', tag: 'Kale' },
      { brand: 'Kale', name: 'Babel Universal WC + Cistern + Ultra Slim Seat', model: 'Babel', tag: 'Kale' },
      { brand: 'Kale', name: 'Babel Back to Wall WC With Bidet Function', model: 'Babel', tag: 'Kale' },
      { brand: 'Kale', name: 'Babel Without Cistern Back To Wall WC', model: 'Babel', tag: 'Kale' },
      { brand: 'Kale', name: 'D-Luna Smart Flow Rimless Wallhung WC Without Bidet Function', model: 'D-Luna', tag: 'Kale' },
      { brand: 'Kale', name: 'D-Luna Smart Flow Rimless Wallhung WC With Bidet', model: 'D-Luna', tag: 'Kale' },
      { brand: 'Kale', name: 'Dove 2.0 Smart Rimless Wallhung WC Without Bidet Function Matte Black-Bronze', model: 'Dove 2.0', tag: 'Kale' },
      { brand: 'Kale', name: 'Dove 2.0 Smart Rimless Wallhung WC Without Bidet Function White-Bronze', model: 'Dove 2.0', tag: 'Kale' },
      { brand: 'Kale', name: 'Dove 2.0 Smart Rimless Wallhung WC Without Bidet Function White-Gold', model: 'Dove 2.0', tag: 'Kale' },
      { brand: 'Kale', name: 'Dove 2.0 Smart Rimless Wallhung WC Without Bidet Function Matte Black-Platinum', model: 'Dove 2.0', tag: 'Kale' },
      { brand: 'Kale', name: 'Dove 2.0 Smart Wall Hung WC + Ultra Slim Smart Seat Black', model: 'Dove 2.0', tag: 'Kale' },
    ],
  },
  {
    slug: 'basins',
    icon: 'https://tse1.mm.bing.net/th/id/OIP.0CFn9WIwYjpzI9cdDpTyaAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    name: 'Basins',
    subs: 'Pedestal · One Piece · Wall Hung',
    image: '/prod-basin.png',
    brands: ['Pool Sanitary Ware', 'Nesco Ceramics', 'Master Sanitary Ware', 'Dell Sanitary Ware', 'Brite Sanitary Ware'],
    subCategories: ['Basins Pedestal', 'One Piece Basins', 'Wall Hung Basin'],
    products: [
      // Pool
      { brand: 'Pool Sanitary Ware', name: 'CRYSTAL Basin Pedestal Basin', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'ROBI Basin Pedestal Basin', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'PORTA CHINA Basin Pedestal Basin', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'Pool 1 Basin Pedestal', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'National Basin Pedestal', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'Royal Basin Pedestal', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'Super Basin Pedestal', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'Sawati Basin Pedestal', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: '12X15 Basin Pedestal', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'Corner 2 in 1 Basin Pedestal', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'POOL 7 Basin Pedestal Basin', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'POOL 3 Basin Pedestal Basin', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'WHISTLE Basin Pedestal Basin', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'Grace Wall Hang Basin', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'Pool 3 Wall Hang Basin', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'Diamond One Piece Basin', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'Pool 1 One Piece Basin', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'Pool 3 One Piece Basin', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'Pool 2 One Piece Basin', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'MAX One Piece Basin', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'DAEWOO One Piece Basin', tag: 'Pool' },
      // Nesco
      { brand: 'Nesco Ceramics', name: 'Basin Pedestal — Classic White', tag: 'Nesco' },
      { brand: 'Nesco Ceramics', name: 'Wall Hung Basin — Modern', tag: 'Nesco' },
      { brand: 'Nesco Ceramics', name: 'One Piece Basin — Premium', tag: 'Nesco' },
      // Porta
      { brand: 'Porta', name: 'Pedestal Basin — Art Design', tag: 'Porta' },
      { brand: 'Porta', name: 'Art Bowl Basin — Stylish', tag: 'Porta' },
      { brand: 'Porta', name: 'One Piece Basin — Porta', tag: 'Porta' },
      { brand: 'Porta', name: 'Wall Hung Basin — Porta', tag: 'Porta' },
      // Master
      { brand: 'Master Sanitary Ware', name: 'Pedestal Basin — Master Classic', tag: 'Master' },
      { brand: 'Master Sanitary Ware', name: 'Wall Hung Basin — Master', tag: 'Master' },
      { brand: 'Master Sanitary Ware', name: 'Under Counter Basin — Master', tag: 'Master' },
      // Dell
      { brand: 'Dell Sanitary Ware', name: 'Pedestal Basin — Dell', tag: 'Dell' },
      { brand: 'Dell Sanitary Ware', name: 'Wall Hung Basin — Dell', tag: 'Dell' },
      // Brite
      { brand: 'Brite Sanitary Ware', name: 'Pedestal Basin — Brite', tag: 'Brite' },
      { brand: 'Brite Sanitary Ware', name: 'Wall Hung Basin — Brite', tag: 'Brite' },
    ],
  },
  {
    slug: 'taps',
    icon: 'https://th.bing.com/th/id/OIP.k99hg_ahbC2WMjmSADSVigHaHa?w=209&h=210&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
    name: 'Taps & Faucets',
    subs: 'Complete Bath Sets · Basin Mixers · Sink Mixer · Sensor Taps · Concealed Sets',
    image: '/prod-taps.png',
    brands: [],
    subCategories: [
      'Complete Single Lever Bath Set',
      'Complete Quarter Round Bath Set',
      'Complete Full Round Bath Set',
      'Luxury Bathroom Shower Sets',
      'Vanity Mixers - Art Bowl Taps',
      'Concealed Shower Set',
      'Basin Mixers',
      'Sink Mixer',
      'Pull Out Kitchen Taps',
      'Sensor Taps',
    ],
    products: [
      { brand: '', name: 'Complete Single Lever Bath Set', tag: 'Popular' },
      { brand: '', name: 'Complete Quarter Round Bath Set', tag: '' },
      { brand: '', name: 'Complete Full Round Bath Set', tag: '' },
      { brand: '', name: 'Luxury Bathroom Shower Set', tag: 'Premium' },
      { brand: '', name: 'Vanity Mixer — Art Bowl Tap', tag: '' },
      { brand: '', name: 'Concealed Shower Set', tag: 'New' },
      { brand: '', name: 'Basin Mixer — Chrome Finish', tag: '' },
      { brand: '', name: 'Basin Mixer — Gold Finish', tag: '' },
      { brand: '', name: 'Sink Mixer — Stainless', tag: '' },
      { brand: '', name: 'Pull Out Kitchen Tap', tag: 'New' },
      { brand: '', name: 'Sensor Tap — Infrared Automatic', tag: 'Smart' },
      { brand: '', name: 'Sensor Tap — Touch Free', tag: 'Smart' },
    ],
  },
  {
    slug: 'muslim-showers',
    icon: '🚿',
    name: 'Muslim Showers',
    subs: 'Hand Shower · Shower Heads · Shower Panels · Concealed Sets',
    image: '/prod-shower.png',
    brands: [],
    subCategories: ['Hand Shower', 'Muslim Shower', 'Shower Heads', 'Shower Panels'],
    products: [
      { brand: '', name: 'Muslim Shower — Standard Chrome', tag: '' },
      { brand: '', name: 'Muslim Shower — Brass Body', tag: '' },
      { brand: '', name: 'Muslim Shower — Gold Finish', tag: 'Premium' },
      { brand: '', name: 'Hand Shower Set — Stainless Steel', tag: '' },
      { brand: '', name: 'Hand Shower — 3-Function', tag: '' },
      { brand: '', name: 'Rain Shower Head — 6 inch', tag: '' },
      { brand: '', name: 'Rain Shower Head — 8 inch Round', tag: '' },
      { brand: '', name: 'Rain Shower Head — 10 inch Square', tag: 'Premium' },
      { brand: '', name: 'Shower Panel — 5 Function', tag: 'New' },
      { brand: '', name: 'Shower Panel — Thermostatic', tag: 'Premium' },
      { brand: '', name: 'Concealed Shower Set — Dual Outlet', tag: '' },
      { brand: '', name: 'Thermostatic Shower Set', tag: 'Premium' },
    ],
  },
  {
    slug: 'accessories',
    icon: 'https://tse3.mm.bing.net/th/id/OIP.83kjQ4i7fNh_mOafwlf6ggAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    name: 'Bathroom Accessories',
    subs: 'Bottle Traps · Basin Waste · Bibcock · Tee-cock · Shower Hose',
    image: '/prod-faucet.png',
    brands: [],
    subCategories: ['Bottle Traps', 'Basin Waste', 'Double Bibcock', 'Tee-cock', 'Shower Hose'],
    products: [
      { brand: '', name: 'Bottle Trap — Chrome P-Trap', tag: '' },
      { brand: '', name: 'Bottle Trap — Brass', tag: '' },
      { brand: '', name: 'Basin Waste — Pop-Up Chrome', tag: '' },
      { brand: '', name: 'Basin Waste — Click Clack', tag: '' },
      { brand: '', name: 'Double Bibcock — Brass', tag: '' },
      { brand: '', name: 'Double Bibcock — Chrome', tag: '' },
      { brand: '', name: 'Tee-cock — 1/2 inch', tag: '' },
      { brand: '', name: 'Tee-cock — 3/4 inch', tag: '' },
      { brand: '', name: 'Shower Hose — 1.5m Stainless', tag: '' },
      { brand: '', name: 'Shower Hose — 2m Anti-Kink', tag: '' },
      { brand: '', name: 'Toilet Seat Cover — Soft Close', tag: '' },
      { brand: '', name: 'Towel Ring — Stainless Steel', tag: '' },
      { brand: '', name: 'Soap Dispenser — Wall Mount', tag: '' },
      { brand: '', name: 'Toilet Paper Holder — Chrome', tag: '' },
    ],
  },
  {
    slug: 'vanities',
    icon: 'https://th.bing.com/th/id/OIP.N17T4UmHBkEdR6U7gnS6MgHaHa?w=183&h=183&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
    name: 'Vanities',
    subs: 'Aluminum · PVC Vanities · Aluminum Bracket Basin · LED Mirrors',
    image: '/prod-vanity.png',
    brands: ['Pool Sanitary Ware', 'Nesco Ceramics', 'Master Sanitary Ware', 'Dell Sanitary Ware', 'Brite Sanitary Ware'],
    subCategories: ['Aluminum Bathroom Vanities', 'PVC Bathroom Vanities', 'Aluminum Bracket Basin', 'Counter Vanities', 'Vanity Bowls'],
    products: [
      { brand: 'Pool Sanitary Ware', name: 'Bowl 1 Counter Vanity', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'Choice Upper Counter Vanity', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'Civic Upper Counter Vanity', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'Diamond Upper Counter Vanity', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'Round Square Upper Counter Vanity', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'Square Upper Counter Vanity', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'OVAL Upper Counter Vanity', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'Pearl Upper Counter Vanity', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'Upper Counter Vanity', tag: 'Pool' },
      { brand: 'Pool Sanitary Ware', name: 'OPERA Counter Vanity', tag: 'Pool' },
      { brand: 'Nesco Ceramics', name: 'Vanity Bowl — Nesco', tag: 'Nesco' },
      { brand: 'Master Sanitary Ware', name: 'Vanity Bowl — Master', tag: 'Master' },
      { brand: 'Dell Sanitary Ware', name: 'Vanity Bowl — Dell', tag: 'Dell' },
      { brand: 'Brite Sanitary Ware', name: 'Vanity Bowl — Brite', tag: 'Brite' },
      { brand: '', name: 'Aluminum Bathroom Vanity — 24 inch', tag: '' },
      { brand: '', name: 'Aluminum Bathroom Vanity — 30 inch', tag: '' },
      { brand: '', name: 'Aluminum Bathroom Vanity — 36 inch', tag: '' },
      { brand: '', name: 'Aluminum Bathroom Vanity — 48 inch', tag: 'Premium' },
      { brand: '', name: 'PVC Bathroom Vanity — 24 inch', tag: '' },
      { brand: '', name: 'PVC Bathroom Vanity — 30 inch', tag: '' },
      { brand: '', name: 'PVC Bathroom Vanity — 36 inch with Basin', tag: 'Sale' },
      { brand: '', name: 'PVC Bathroom Vanity — 48 inch Deluxe', tag: 'Premium' },
      { brand: '', name: 'Aluminum Bracket Basin — Standard', tag: '' },
      { brand: '', name: 'Aluminum Bracket Basin — Heavy Duty', tag: '' },
    ],
  },
  {
    slug: 'mirrors',
    icon: 'https://th.bing.com/th/id/OIP.KLLsDb-iVe7bM1_LHR8WaQHaHp?w=171&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
    name: 'Mirrors',
    subs: 'LED Mirrors · Standard Mirrors · Makeup Mirror',
    image: '/prod-mirror.png',
    brands: [],
    subCategories: ['LED Mirrors', 'Standard Mirrors', 'Makeup Mirror'],
    products: [
      { brand: '', name: 'LED Mirror — 24×32 inch Backlit', tag: 'New' },
      { brand: '', name: 'LED Mirror — 30×36 inch Smart Touch', tag: 'Smart' },
      { brand: '', name: 'LED Mirror — 36×48 inch Sensor', tag: 'Premium' },
      { brand: '', name: 'LED Mirror — 24 inch Round', tag: '' },
      { brand: '', name: 'LED Mirror Cabinet — 24 inch Single Door', tag: '' },
      { brand: '', name: 'LED Mirror Cabinet — 30 inch Double Door', tag: '' },
      { brand: '', name: 'Standard Mirror — 18×24 inch Frameless', tag: '' },
      { brand: '', name: 'Standard Mirror — 24×36 inch Silver Frame', tag: '' },
      { brand: '', name: 'Standard Mirror — 30×42 inch Gold Frame', tag: '' },
      { brand: '', name: 'Makeup Mirror — 7x Magnification', tag: '' },
      { brand: '', name: 'Makeup Mirror — LED Ring Light', tag: 'New' },
    ],
  },
  {
    slug: 'kitchen-ware',
    icon: 'https://th.bing.com/th/id/OIP.Ule3uWS73r5llk7aVlBEyAHaHa?w=203&h=203&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
    name: 'Kitchen Ware',
    subs: 'Handmade Sinks · Kitchen Hood · Kitchen Hob · Accessories',
    image: '/prod-kitchensink.png',
    brands: [],
    subCategories: ['Single Bowl Handmade Sink', 'Double Bowl Handmade Sink', 'Kitchen Hood', 'Kitchen Hob', 'Kitchen Accessories'],
    products: [
      { brand: '', name: 'Single Bowl Handmade Kitchen Sink — Stainless 304', tag: '' },
      { brand: '', name: 'Single Bowl Handmade Sink — 18 inch Deep', tag: '' },
      { brand: '', name: 'Double Bowl Handmade Kitchen Sink — Undermount', tag: '' },
      { brand: '', name: 'Double Bowl Handmade Sink — Overmount', tag: '' },
      { brand: '', name: 'Farmhouse Sink — 30 inch Apron', tag: 'New' },
      { brand: '', name: 'Kitchen Hood — 60cm Stainless', tag: '' },
      { brand: '', name: 'Kitchen Hood — 90cm Auto-Clean', tag: 'Premium' },
      { brand: '', name: 'Kitchen Hob — 2 Burner Glass', tag: '' },
      { brand: '', name: 'Kitchen Hob — 4 Burner Stainless', tag: '' },
      { brand: '', name: 'Kitchen Hob — 5 Burner Premium', tag: 'Premium' },
      { brand: '', name: 'Kitchen Sink Strainer Basket', tag: '' },
      { brand: '', name: 'Pull Out Kitchen Spray Tap', tag: 'New' },
    ],
  },
  {
    slug: 'bath-tubs',
    icon: '🛁',
    name: 'Bath Tubs',
    subs: 'Corner Bath Tubs · Standard/Regular Baths',
    image: '/prod-bathtub.png',
    brands: [],
    subCategories: ['Corner Bath Tubs', 'Standard/Regular Baths'],
    products: [
      { brand: '', name: 'Corner Bath Tub — 1200×1200mm Acrylic', tag: '' },
      { brand: '', name: 'Corner Bath Tub — 1400×1400mm Premium', tag: 'Premium' },
      { brand: '', name: 'Corner Bath Tub — Whirlpool Jets', tag: 'Luxury' },
      { brand: '', name: 'Standard Bath Tub — 1500mm Classic White', tag: '' },
      { brand: '', name: 'Standard Bath Tub — 1600mm Acrylic', tag: '' },
      { brand: '', name: 'Standard Bath Tub — 1700mm Freestanding', tag: 'Premium' },
      { brand: '', name: 'Freestanding Bath Tub — Oval', tag: 'Luxury' },
      { brand: '', name: 'Drop-In Bath Tub — 1600mm', tag: '' },
    ],
  },
  {
    slug: 'pipes-fittings',
    icon: 'https://th.bing.com/th/id/OIP.RdIuIQaMQ8DhMcV7kAJ88QHaIS?w=186&h=209&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
    name: 'Pipes & Fittings',
    subs: 'PPRC Pipes · PPRC Fittings · UPVC Pipes · UPVC Fittings',
    image: '/prod-pprc.png',
    brands: ['Minhas Pipes and Fittings', 'Turk Plast', 'Dura Flow', 'Master Pipes And Fittings'],
    subCategories: ['PPRC PIPES', 'PPRC FITTINGS', 'UPVC PIPES', 'UPVC FITTINGS'],
    products: [
      // ── Minhas PPRC Fittings ──
      { brand: 'Minhas Pipes and Fittings', name: '3D Elbow PPRC — Code 217', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Clamp PPRC — Code 851-854', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Cross Piece PPRC — Code 951-953', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Elbow 45° PPRC — Code 211-218', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'End Cap PPRC — Code 801-809', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Equal Elbow PPRC — Code 200-209', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Equal Tee PPRC — Code 300-309', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Mixer Clamp PPRC — Code 860', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Over Cross PPRC — Code 901-913', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'PPRC Hook — Code 842-846', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Reducer Socket PPRC — Code 180-140', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Reducing Elbow PPRC', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Reducing Tee PPRC — Code 381-395', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Safety Valve PPRC — Code 612', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Screw Plug PPRC — Code 821-831', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Socket PPRC — Code 100-109', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Tee Female Metal Side Brush — Code 331-332', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Union PPRC — Code 421-427', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Elbow Female Metal — Code 240-256', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Tee Female Metal — Code 340-346', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Tee 3D — Code 317', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Socket Female Metal — Code 141-159', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Elbow Male Metal — Code 270-276', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Clamp Elbow Female Metal — Code 251C', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Tee Male Metal — Code 370-376', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Elbow Female Metal 3D — Code 237', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Union PPRC Female Threaded — Code 431-437', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Tee Female Metal 3D — Code 337', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Y Tee — Code 06316-06318-06319', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Socket Male Metal — Code 171-179', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Mixer Clamp Adjustable — Code 862', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Mixer Clamp Fixed — Code 861', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Stop Cock — Code 521-524', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Valve — Code 511-519', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'PPRC No Return Valve — Code 602-603', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Valve With Union Plastic to Plastic — Code 501-509', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Valve With Union Plastic to Metal — Code 551-553', tag: 'Minhas' },
      { brand: 'Minhas Pipes and Fittings', name: 'Union No Return Valve — Code 652-654', tag: 'Minhas' },
      // ── Turk Plast ──
      { brand: 'Turk Plast', name: 'Turk Plast PPRC Pipe — 20mm', tag: 'Turk' },
      { brand: 'Turk Plast', name: 'Turk Plast PPRC Pipe — 25mm', tag: 'Turk' },
      { brand: 'Turk Plast', name: 'Turk Plast PPRC Pipe — 32mm', tag: 'Turk' },
      { brand: 'Turk Plast', name: 'Turk Plast PPRC Elbow 90°', tag: 'Turk' },
      { brand: 'Turk Plast', name: 'Turk Plast PPRC Tee', tag: 'Turk' },
      { brand: 'Turk Plast', name: 'Turk Plast PPRC Ball Valve', tag: 'Turk' },
      // ── Dura Flow ──
      { brand: 'Dura Flow', name: 'Dura Flow PPRC Pipe — 20mm', tag: 'Dura' },
      { brand: 'Dura Flow', name: 'Dura Flow PPRC Pipe — 25mm', tag: 'Dura' },
      { brand: 'Dura Flow', name: 'Dura Flow PPRC Pipe — 32mm', tag: 'Dura' },
      { brand: 'Dura Flow', name: 'Dura Flow PPRC Elbow', tag: 'Dura' },
      { brand: 'Dura Flow', name: 'Dura Flow PPRC Tee', tag: 'Dura' },
      // ── Master Pipes ──
      { brand: 'Master Pipes And Fittings', name: 'Master PPRC Pipe — 20mm', tag: 'Master' },
      { brand: 'Master Pipes And Fittings', name: 'Master PPRC Pipe — 25mm', tag: 'Master' },
      { brand: 'Master Pipes And Fittings', name: 'Master PPRC Elbow 90°', tag: 'Master' },
      { brand: 'Master Pipes And Fittings', name: 'Master PPRC Equal Tee', tag: 'Master' },
      { brand: 'Master Pipes And Fittings', name: 'Master PPRC Ball Valve', tag: 'Master' },
      // ── UPVC ──
      { brand: '', name: 'UPVC Pipe — 2 inch Drainage', tag: 'UPVC' },
      { brand: '', name: 'UPVC Pipe — 3 inch Drainage', tag: 'UPVC' },
      { brand: '', name: 'UPVC Pipe — 4 inch Drainage', tag: 'UPVC' },
      { brand: '', name: 'UPVC Elbow 90° — 2 inch', tag: 'UPVC' },
      { brand: '', name: 'UPVC Tee — 3 inch', tag: 'UPVC' },
      { brand: '', name: 'UPVC P-Trap — 2 inch', tag: 'UPVC' },
      { brand: '', name: 'UPVC Floor Drain — 4 inch', tag: 'UPVC' },
    ],
  },

  {
    slug: 'flush-tanks',
    icon: 'https://th.bing.com/th/id/OIP.RaYu4aitQX7n5EH2bdoJDgHaHa?w=178&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
    name: 'Flush Tanks',
    subs: 'Concealed Cistern · Wall Hung · Standard Flush',
    image: '/prod-commode.png',
    brands: [],
    subCategories: ['Concealed Cistern', 'Wall Hung Cistern', 'Standard Flush Tank'],
    products: [
      { brand: '', name: 'Standard Flush Tank — 8L White', tag: '' },
      { brand: '', name: 'Standard Flush Tank — 10L', tag: '' },
      { brand: '', name: 'Dual Flush Cistern — 6/3L', tag: 'Sale' },
      { brand: '', name: 'Concealed Cistern — European Style', tag: 'New' },
      { brand: '', name: 'Wall Hung Cistern — Slim Line', tag: '' },
      { brand: '', name: 'In-Wall Cistern Frame — Complete Set', tag: 'Premium' },
    ],
  },
];

// ── Featured Products (Homepage) ────────────────────────────
export const FEATURED_PRODUCTS = [
  {
    icon: '🚽',
    brand: 'Nesco Ceramics',
    brandTag: 'Premium',
    name: 'Royal Commode — Floor Standing',
    category: 'toilets',
    image: '/popular-commode.png',
  },
  {
    icon: '🪣',
    brand: 'Nesco Ceramics',
    brandTag: 'Nesco',
    name: 'Basin Pedestal — Classic White',
    category: 'basins',
    image: '/popular-basin.png',
  },
  {
    icon: '🔧',
    brand: 'Complete Bath Sets',
    brandTag: 'New',
    name: 'Single Lever Bath Set — Gold Finish',
    category: 'taps',
    image: '/popular-taps.png',
  },
  {
    icon: '🪞',
    brand: 'Signature Collection',
    brandTag: 'Premium',
    name: 'Modern Vanity Cabinet',
    category: 'vanities',
    image: '/popular-vanity.png',
  },
];

// ── Why Us ──────────────────────────────────────────────────
export const WHY_US = [
  {
    no: '01',
    title: 'Genuine Products',
    desc: 'Every product is 100% genuine, sourced directly from authorized distributors of Pool, Nesco, Porta, Master, Dell, Brite and other top brands. No counterfeits, ever.',
  },
  {
    no: '02',
    title: 'Expert Guidance',
    desc: 'Our experienced team helps you choose the right products for your bathroom, kitchen or plumbing project — ensuring perfect fit and function every time.',
  },
  {
    no: '03',
    title: 'Competitive Pricing',
    desc: 'Some of the best prices in Lahore & Multan with special contractor discounts and bulk rates for builders, plumbers and developers.',
  },
  {
    no: '04',
    title: 'Vast Selection',
    desc: 'From budget-friendly options to luxury designer pieces — 500+ products across ceramics, fittings, pipes, vanities, showers and more.',
  },
  {
    no: '05',
    title: 'Lahore & Multan',
    desc: 'Serving both Lahore and Multan — two store locations so you get expert advice and premium products wherever you are in Punjab.',
  },
  {
    no: '06',
    title: 'After-Sale Support',
    desc: "Our relationship doesn't end at the sale. Ongoing support, installation guidance and help with replacements and warranty matters.",
  },
];

export const LEGACY_FEATURES = [
  'Pool, Nesco, Porta & Master ceramics always in stock',
  'Complete PPRC & UPVC pipe systems — Minhas, Turk Plast, Dura Flow',
  'Competitive pricing & bulk contractor discounts',
  'Expert guidance on every purchase',
  'Delivery across Lahore & Multan',
  'Serving Punjab since Est. 1997',
];

// ── Product-Level Image Resolver ────────────────────────────
export function getProductImage(slug, name = '', brand = '') {
  const n = name.toLowerCase();
  const b = brand.toLowerCase();
  
  if (slug === 'toilets' || slug === 'commodes-toilets') {
    // ── KALE ──
    if (b.includes('kale')) {
      if (n.includes('babel universal')) return 'https://cdn.kale.com.tr/0/0/babel-universal-wc-cisternultra-slim-seat/53efc084-a35c-4200-a835-b829ca080479/456/2';
      if (n.includes('babel back to wall wc with bidet')) return 'https://cdn.kale.com.tr/0/0/babel-back-to-wall-wc-with-bidet-function/c92db0b3-aa93-4885-ac2e-cb7f0ff527ba/456/2';
      if (n.includes('babel without cistern')) return 'https://cdn.kale.com.tr/0/0/babel-without-cistern-back-to-wall-wc/7fc79733-036c-4bdd-b8b1-26bc2868f036/456/2';
      if (n.includes('d-luna') && n.includes('without bidet')) return 'https://cdn.kale.com.tr/0/0/d-luna-smart-flow-rimless-wallhung-wc-without-bidet-function/17ae82a1-de9e-4185-9aee-b698fc3d1904/456/2';
      if (n.includes('d-luna') && n.includes('with bidet')) return 'https://cdn.kale.com.tr/0/0/d-luna-smart-flow-rimless-wallhung-wc-with-bidet-function/cadb9f8b-643b-449d-a0d6-db1d073cdf7c/456/2';
      if (n.includes('dove 2.0') && n.includes('white-bronze')) return 'https://cdn.kale.com.tr/0/0/dove-2/5be51c2d-1066-43ea-89f9-fb4d8403f879/456/2';
      if (n.includes('dove 2.0') && n.includes('matte black-bronze')) return 'https://cdn.kale.com.tr/0/0/dove-2/993c0952-eabc-4120-a167-e8a3ec70f214/456/2';
      if (n.includes('dove 2.0') && n.includes('white-gold')) return 'https://cdn.kale.com.tr/0/0/dove-2/998737b4-02ca-4c4d-af7d-ca5c2ee010a1/456/2';
      if (n.includes('dove 2.0') && n.includes('matte black-platinum')) return 'https://cdn.kale.com.tr/0/0/dove-2/01363594-db50-416f-a991-afa9219dd94a/456/2';
    }

    // ── POOL SANITARY WARE ──
    if (b.includes('pool')) {
      if (n.includes('pool 4')) return 'data:image/webp;base64,UklGRiAOAABXRUJQVlA4IBQOAABwYgCdASo7ARcBPp1Kn0wlpCoqpbPZyVATiWluvTmafGYqo4xo6OxTbec8BpgHoV9L9kC51XSZv1O0f44ZGtnpk1/uXoXTeler6v/s/YA/Kn/U9WD/n86/1v7BvSo9GD9mSR74uY6rKt9/AMx88Ia+GuMi4tzA7GHQ1PtWU+vNq80Xx/u+5gWMtYnSH4+5toElKbbrwJ7Nhjo5q8ow4/BZTIN4v8p5sA3crZfULQb45z6XbWMREdcf55ASbv1IQGdfxJYcGD52w9RYEzceoOxIZmKUTeiWT7ZJzlXraabj1OUhve9DEc+yPRR4sJjjwL+JCRdZQO9wzg9Y3+PBqYnKHhLqTNuRQ5xtD2X6fq0LCfVL8mMkxJBrwlsVb+N+4Qz8jPr7R2twM/BB4+8MS0FKpt/LMlg8SVqHzpEZiISYU6XZD39ntdN30dvfs+s/i1Sl0mt1RavN+8PMFFJdLF/J5mBvrWE+upkHHE2hOh36Lku3ZlQ+teD+bSyrRbASckSMBRO2WCZrEXN9Ep0qMgQbvhv+x9yX//lu16Ze/O2bhnXMCIoPaQLdvCa7MTSfJLf6R9j+BCibz7m/MJmGPzPsjLaOFOHUrYJy2NwMX0HR702h8xD+MR//59RBQ7vvxy/q2TNWyHIHymW+1ONkhIhrOSF/j/wlyRou8XQfI/rPGIsMx1//3yfqGN8KIAdemebvKNmOlg75puTUdhBScrE/rEMDerieV1cJezLDr4fNgxv9NC7/h3M2TPv/s/Pe1aaqMmKvtEKY6tbJaTPcPg1gRYfIovTVwPzgyTfalHfzDp4iJYjojOpFDOsZFYSu2AjhBuytS5GWVudsuMvysCs0s27rcLSRwCwtKGf8BKfYuVsr0E6sYqvk5d1IpAnMcROEGOM0vRPFPu56p4/M/H6PXGF3ytMYOm60vZj/wa19WTVBBFO53GcsVLO+7Z4f8GTB4mLIA8OYZ119hTioIdzkHYIdli2I1hT0rEbvQ0H4HL2IPPxBspMvRyDsu+Awf+psoQ+MdEhWu3v4CW7nH2FfFrQfZ3/dR1cOXIAAAP720W5Lg6hnooXF9IB2nnNmLiwruhe6J91gr1fbld4ujy5blEf2LpDW6WQClRncMkwtJh7ng2qDkYDY/cKi8It0B5rhHD773VJdnxDVR1xQgDg/J+Xvvf98RegYBj3Es+G4MNCRc9875kttzSqlQDHiq4dFCuVM9hfBgpFJYGSEmM/shX62bcRrmaausVs4tm/83Shd/KxpYYb+J64xFihbv02C59Ammlx2hoH6gIef8fkn6S2lW5RSngRJP9we1Db+7SwCOiwoX1pZKYXume01XGoutftlzF1bSzI2RlhpfYVn/HpPGWm6bZrVZvJ2CRcI+n93p/2W7//DPu9h0GCSTNqfedQqRj7kp+fpxE7NBjxmBX7fxWy1/oL1w/QOpPQRAYwvR9n7AmasN1sLaaC9wUAEgbI9tFAQcrN6NJMHbZ2c4HvUfrkqKRwf+bjpn85X9G6+fB/Xif+puJEdon5ak2io3nzg/NRZ+J5s/9r4q0aHLMZTE48fA36YYTtWr6Z/jkycWp9Bn9li7iPr/84rYGdNR3mea648UAbdcB+fv7cPIJi7V7kJerNbAOzyHeHVW5zidjcMeP2Vda+5qaA/dw9pc2d/4M24059WewyL+/rbkEcNw7cC5Wy8+uufvXnOvdpQQnPFyf3yVBnpC8zsoGc/e1CTDFXFPRGxG464hz6AkcSXE8LPn04XcpXTW74cZmtJKxXQwRrc0ILOUw5ruJt+VVXAyYK3ZwvWvfHcbOwcEbtTHkYAACnHUhHZktKZ7TbMGvCuVa20dd7Uqf+x51hbl9MwNtJhkC9OvRT5/pv/I8/A0BxCa5WNVs2VLyLUonKTnvd4n/5rfblrUQFtB1dBUslA/J//Fe9aebeTtnOK4YER3ld+5jcUHH/EgXRiN/63mtY+1ypNJrQAFZcNKR5xsy1MZsr7aRfQO1kuY7PLNAuYbKfs20iBmwXibDfvKBPnv0it2deEZUfCwf/zWDZLCziMluyMX1Nw056wfnm2T9fx+fBDxgtwLz2KYrkku1Iqd22Eb/qWlKqO90jk+HMEhAN75GuoY+kZjG/Zvzhz90SUkrDnoYqcWixDYvHDfrteubmORX3bdrqG/P9Kixgq2TfMZa4KfjKntRHxMHuYVF1qGrpZbRSU5eo23DJgPGBMf0jDffelldziEPFyZHGzO2vfNo48TMQ6R1Ft0Ds+uiQsKrijErPgrRCvNzoGuioUSRljQ8JD1mIzYx+zx3ypavD0b8mnTV4wXJDqCK2fDNq2HNKph/tDo3mgX441u7WXCgcVbsltHPJMBRnmUXf8ll4f07o3FEBK3+m8Qc0Yn0GFNB8SrzJAbJw+kkTZHuNR+RMcOtxVsSymbfOwtQikro9ja8fWMDOdDg9S+KwuDcJb6EUF1t1dcC9I8Rvp5V5sIfqeXN6sRIqb5+GnBpNSbPXJd/1gEhAw7f3q8+4WpzaGN6UDormvEaUDGsL7imHorkQooEQyp35GrBc9869ZligRrI4ejmPdFTaf+ZembZ24q9azoxoQ+MqifeocVRuMnBzjALJvaT04UaB6f3nythhCPeRsdZ1tRwhR4zXMX8IGf7JIuE7e3igrBUENnRp4RSJYnhR3dVAPiHYr77YWxFpe/FvsYBZ0zkzmvVyqrxhHJkmz/1XVYT92sq5zB1/QqmXgLES4raZujcNEtJKOcp5hgd1xBT0dYVbeil5jJ+qZxx3wqLhBfFW/KIDxbK6HAZdMgcu/fXh4gjGWTrc4zbTnKyie1dLfHENK42MAq+S4OdjUdVY6I0Umr3WHx4o0js3J6F+Dbki+kcT6Oi+eIG8PNrELIU2AANBfCxNteA3OLQ0SC6xzEWPgPjpWyAO8JvECOlN5+lUnfcdkX670oIpBRlQKrpc0PBJuq6tEJYfyE3I3YrIecS6m9occmmaSp9MHj2MhOoWexAbDfh6CCv1VP3dkYb94vMKIjz64tSI/dmKW/d4QeHP00wh1WY9t/AiefNbO6JzHJy4ABZMmH6C5wHspXDfIOuEeTSmhMxVzqkvTNRJXVOHjakaMGFKf63HGamEa2yonXzFrfN5LQFtsLlkzBkwVNWNskqylg8xim7Lp1+Opz38Q4cLkib8hAoKXwmb2pOsvVkUybN0Pxx4rtQmNvBAFGp5CUSnBfSE+L/iK3+g5KpHWnt5I0rktReaUd5RIGzrkKgisWu7WV1Bono+OP1/YHrY4uVzNzNnPdbTpNuSwaTFzyyrA2AH6hkrDYCkB0MY+rvFx6vKXaIFyX7vpxQx53bjaxcsPpCJ2opRqO+xi9JVcUvk8P0Tc2X5Ml3rBYxV5pkdHh1T20522xRVZUZG1m1YgF+E5bSmbRDWKESktRuArluxgeVG+YOG026oZvllUaIQlO1gTtq6yB1xgMe3jFA9SIy/MscdfWxJQYh8RYAGWUOUOanmA+XEiXYFsKv8OsNREyedzjtRilVsvZD63qxBJahU1ufggt/JyT5sSAWW9u6gRVzFeAsLJ3w8AC7R8ebjpbi14Um5kLGupOvCDqgi81fS7v9sOJF1bxLMsm9q4edaPT6o17dGtIDPen9WQ2GUIb/kRL9/o+aL6vPObbnPDJ4IVU0KAXmM9gCfs6fg1IQIm3eabCP2r5uS2vokOI4MQywwOV4VeMgLWMfExK2x3MrjA26itUDgtK12OKYI5twjf5MUSqu8H4gPbSFGODlYbobb9T55HxnzpI53zQqlBwL6kflY3QDh3mvPVK51Co1riryvm6B1mgHn3ARbFwrclCd3yZzcYG1NyKWwe3516US4OytzxHmehEWTgahMdpyrZJO7Rtg8BzNf5rg/jhr11B26sp3iZfBBwjvb9jVZqkJReGDXq85gZkvL2p0xMT2YMDBDCCh5HhLOzSOMuDuqnXmjzQuK4JaogWonlgQzjFzd/v2Qis0cfcgwq/45ibvEGxFrCpM1LTGx01jSh1vq6HOnCVzCqUfy4w6lHQr+puxUZw6zwfwvYnRY7G4a3ijYzegUZ3X8GiW95iQtuc14IJoP+zFPIUlNxMBNrAL7GOGYqcSi4XCRDSoF0oXc2Ul74t8IehUtHZZFNMobIZz7EfSp1+Up36YBmgmnwueAjDFPUEP6wULIcnRlDRAMUWchD8JMFyBDEw7Hi3bIlWvo5w4jFbpm9B0/3ZnXOTRdnHE7V7mxHLiKSgqqcEwpC3QrQkP95021oVBbIrEct3UB854WVxZIJLygGRmryV+FQ0lvF87rKY0gbjlUy0afZlVjATv7UnbngHl8/sYkUoyJ9rxt0txzesS9sopJAvs3qKuwe0BiQ3NVMUfKd60+g7Gyi3a08z3HY82stpKl7A6qqOTONrTbaRT8fsWXCAcNW93d/9TYD9JGILEZEIBHdsjkiQ86miB0IHaFWUBZi5uDvd9+HHoK/nrU9Q7vg6Rp+m+YHaLPeM7W8dQFWakgGMhaz7fLqNVNfAgUgpSz00fA9TnzQ/zA0ZRkX4jxi24emwGshK1T5HFRdKn6QNmRLravbBV988s6PZRDa4a3P7OyZC9R8mDN/BW38qepggJXRHuUUim8qiVp6FQEDCngnmoisS9x+OwF6xr80iQPzhXxq/z5XDfYMbDe+OiBbdKnS/bRPbS+ILJF9pdXpy4JlGEcypzqo2ZiMoNGOhQwmjEHubOXyyVDxp+m2kD1K8rDfidoI7tzVwSEJemEqv/AlBX5eTMPZAxA69AFnsYBsUIJZSLSwQAAA';
      if (n.includes('daewoo')) return 'https://tse2.mm.bing.net/th/id/OIP.M0ZOqAIDTg2Wa3cq9ruXCQHaGj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3';
      if (n.includes('diamond')) return 'https://th.bing.com/th/id/OIP.wbA1LJtWB8_gIsCXzUHRlgHaGj?w=211&h=187&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('unique')) return 'https://th.bing.com/th/id/OIP.Rm_AGPw1B-u2CDM1PNUUTgHaGj?w=217&h=192&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('grace')) return 'https://th.bing.com/th/id/OIP.B85awH0pVXMECSZf4t7mFwHaHa?w=175&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('galaxy')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/Galaxy-Commode-Pool-Sanitary-Ware.jpg';
      if (n.includes('mobi')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/Mobi-Commode-Pool-Sanitary-Ware.jpg';
      if (n.includes('porta china')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/Porta-China-Commode-Pool-Sanitary-Ware1.jpg';
      if (n.includes('crystal')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/Crystal-Commode-Pool-Sanitary-Ware.jpg';
      if (n.includes('pool 7') || n.includes('7')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/Pool-7-Commode-Pool-Sanitary-Ware.jpg';
      if (n.includes('pool 2') || n.includes('2')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/Pool-2-Commode-Pool-Sanitary-Ware.jpg';
    }
    
    // ── DELL SANITARY WARE ──
    if (b.includes('dell')) {
      if (n.includes('dell 2')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/Dell_2_Commode_Dell_Sanitary_Ware2.jpg';
      if (n.includes('belta')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/belta-commode-dell-sanitary-ware.jpg';
      if (n.includes('glow')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/glow-commode-dell-sanitary-ware.jpg';
      if (n.includes('charlie')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/charlie-commode-dell-sanitary-ware.png';
      if (n.includes('galaxy')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/galaxy-commode-dell-sanitary-ware.jpg';
      if (n.includes('dell plus')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/Dell_Plus_Commode_Dell_Sanitary_Ware1.jpg';
      if (n.includes('dell') && !n.includes('plus') && !n.includes('2')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/dell-commode-dell-sanitary-ware.jpg';
      if (n.includes('flow')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/flow-commode-dell-sanitary-ware.jpg';
    }
    
    // ── TOTAL SANITARY WARE ──
    if (b.includes('total')) {
      if (n.includes('mira')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/MIRA1.jpg';
      if (n.includes('bravo')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/BRAVO2.jpg';
      if (n.includes('flora')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/FLORA2.jpg';
      if (n.includes('total one')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/TOTAL-ONE1.jpg';
      if (n.includes('total plus')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/TOTAL-PLUS1.jpg';
      if (n.includes('porta')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/PORTA2.jpg';
      if (n.includes('alpha')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/ALPHA2.jpg';
    }
    
    // ── BRITE SANITARY WARE ──
    if (b.includes('brite')) {
      if (n.includes('bravo')) return 'https://th.bing.com/th/id/OIP.WfyIvAb1CPi4Fu2lKcqh0wHaHa?w=194&h=194&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('brite')) return 'https://th.bing.com/th/id/OIP.4XpubcYr7-s3bCupfzDHKAHaHa?w=188&h=188&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('mobi')) return 'https://th.bing.com/th/id/OIP.QL3O2qbckAUMU59p6UZ4XQHaHa?w=188&h=188&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('galaxy')) return 'https://th.bing.com/th/id/OIP.elaD-FAqAD1zS1eTsyIEiwHaHa?w=188&h=188&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('vital')) return 'https://th.bing.com/th/id/OIP.HAEDQ78KKaRnotrctWesYwHaHa?w=184&h=184&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('beauty')) return 'https://th.bing.com/th/id/OIP._1kGJk8qnOCcuyu42MPnWwHaHa?w=188&h=188&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('delta')) return 'https://th.bing.com/th/id/OIP.ny_C3X8aTUtIphS7f_dGPwHaHa?w=187&h=188&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('crystal')) return 'https://th.bing.com/th/id/OIP.Kkm_0kGrrdAKjuUH5-EecAHaHa?w=188&h=188&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('decent')) return 'https://th.bing.com/th/id/OIP.8npgEhImzLLxmjaVzksXYQHaHa?w=191&h=191&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
    }
    
    // ── MASTER SANITARY WARE ──
    if (b.includes('master')) {
      if (n.includes('grace')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/19-2.jpg';
      if (n.includes('aroma 1-piece') || n.includes('aroma')) {
        if (n.includes('op 04') || n.includes('toilet commode')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/19-4.jpg';
        return 'https://www.sanitary.pk/admin/assets/uploaded_images/19-1.jpg';
      }
      if (n.includes('fantasy')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/20-2.jpg';
      if (n.includes('edge')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/19-3.jpg';
      if (n.includes('op 07') || n.includes('1-piece commode')) return 'https://www.sanitary.pk/admin/assets/uploaded_images/20-3.jpg';
    }
    
    // ── NESCO CERAMICS ──
    if (b.includes('nesco')) {
      if (n.includes('vital')) return '/nesco-vital.jpg';
      if (n.includes('teddy')) return '/nesco-teddy.jpg';
      if (n.includes('diamond')) return '/nesco-diamond.jpg';
      if (n.includes('royal')) return '/nesco-royal.png';
    }

    // ── PORTA ──
    if (b.includes('porta')) {
      if (n.includes('hd427tmb')) return 'https://porta.pk/wp-content/uploads/2026/04/HD427TMB.jpg';
      if (n.includes('hd429mb')) return 'https://porta.pk/wp-content/uploads/2026/04/HD429MB.jpg';
      if (n.includes('hd6n')) return 'https://porta.pk/wp-content/uploads/2026/04/HD6N.jpg';
      if (n.includes('hd427tmg')) return 'https://porta.pk/wp-content/uploads/2026/04/HD427TMG.jpg';
      if (n.includes('hd950')) return 'https://porta.pk/wp-content/uploads/2026/04/HD950.jpg';
      if (n.includes('hd945')) return 'https://porta.pk/wp-content/uploads/2026/04/HD945.jpg';
      if (n.includes('hd944')) return 'https://porta.pk/wp-content/uploads/2026/04/HD944.jpg';
      if (n.includes('hd940')) return 'https://porta.pk/wp-content/uploads/2026/04/HD940.jpg';
      if (n.includes('hd935')) return 'https://porta.pk/wp-content/uploads/2026/04/HD935.jpg';
      if (n.includes('hd925')) return 'https://porta.pk/wp-content/uploads/2026/04/HD925.jpg';
      if (n.includes('827wh')) return 'https://porta.pk/wp-content/uploads/2025/03/827Wh-2.jpg';
      if (n.includes('432wh')) return 'https://porta.pk/wp-content/uploads/2025/05/432WH-e1748498544809.jpg';
      if (n.includes('427whmb')) return 'https://porta.pk/wp-content/uploads/2024/09/Wall-Hung-Wc-427WHMB-1.jpg';
      if (n.includes('hd348wh')) return 'https://porta.pk/wp-content/uploads/2024/09/Wall-Hung-WC-HD317WH-2.jpg';
      if (n.includes('hd427wh')) return 'https://porta.pk/wp-content/uploads/2024/09/Wall-Hung-WC-HD427WH-1.jpg';
      if (n.includes('hd185n')) return 'https://porta.pk/wp-content/uploads/2024/09/One-Piece-WC-HD185N-1.jpg';
      if (n.includes('hd104n')) return 'https://porta.pk/wp-content/uploads/2024/09/One-Piece-WC-HD104N.jpg';
      if (n.includes('hd131n')) return 'https://porta.pk/wp-content/uploads/2024/09/One-Piece-WC-HD131N-2.jpg';
      if (n.includes('hd180n')) return 'https://porta.pk/wp-content/uploads/2024/09/One-Piece-WC-HD180N-2.jpg';
      if (n.includes('hd113a')) return 'https://porta.pk/wp-content/uploads/2024/09/One-Piece-WC-HD113A-1.jpg';
      if (n.includes('hd180a')) return 'https://porta.pk/wp-content/uploads/2024/09/One-Piece-WC-HD180A-1.jpg';
      if (n.includes('hd173n')) return 'https://porta.pk/wp-content/uploads/2024/09/One-Piece-WC-HD173N-1.jpg';
      if (n.includes('hd177a')) return 'https://porta.pk/wp-content/uploads/2024/09/one_piece-WC-HD177A_white-bg.jpg';
      if (n.includes('hd20n')) return 'https://porta.pk/wp-content/uploads/2025/04/HD20N.jpg';
      if (n.includes('hd200n')) return 'https://porta.pk/wp-content/uploads/2024/09/Two-Piece-Toilet-HD200N-1.jpg';
      if (n.includes('hd229a')) return 'https://porta.pk/wp-content/uploads/2024/09/Two-Piece-Toilet-HD229A-1.jpg';
    }
  } else if (slug === 'basins' || slug === 'vanities') {
    if (b.includes('pool')) {
      if (n.includes('crystal')) return 'https://th.bing.com/th/id/OIP.DVdcPQZhntiUGpPrnaTOkQHaGj?w=215&h=191&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('robi')) return 'https://th.bing.com/th/id/OIP.vdldCrBv6kjXO0lPoiTTXAHaGj?w=211&h=187&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('porta china')) return 'https://th.bing.com/th/id/OIP.AJkA3iiZ1sCOADTQFLbvHgHaGj?w=200&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('pool 1') && n.includes('one piece')) return 'https://th.bing.com/th/id/OIP.Cv7aGZKdHrFlklt06dXI1AHaGj?w=237&h=210&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('pool 1') && n.includes('pedestal')) return 'https://th.bing.com/th/id/OIP.oHTc-c5UQWx2UJ9mcP0_6gHaGj?w=203&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('national')) return 'https://th.bing.com/th/id/OIP.JQo2k7s0cSATwkspsauwOQHaGj?w=203&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('royal')) return 'https://th.bing.com/th/id/OIP.9PbfGaKb2HI7NpRxaeo7IAHaGj?w=210&h=186&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('super')) return 'https://th.bing.com/th/id/OIP.s_ubS9qc5_0s1vIaCj9_igHaGj?w=211&h=187&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('sawati')) return 'https://th.bing.com/th/id/OIP.GUpnkIp2FQxvtl_rEbbXkgHaGj?w=197&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('12x15')) return 'data:image/webp;base64,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';
      if (n.includes('corner 2 in 1')) return 'https://th.bing.com/th/id/OIP.-10vXJDVjqfGzlAgxwS9aAHaGj?w=215&h=191&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('grace wall hang')) return 'https://th.bing.com/th/id/OIP.cbEk37pP8He-QSGgOk2JsAHaGj?w=209&h=185&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('pool 3') && n.includes('wall hang')) return 'https://th.bing.com/th/id/OIP.onvj6D-9EwBqvYAB7EL7dwHaGj?w=196&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('pool 3') && n.includes('pedestal')) return 'https://th.bing.com/th/id/OIP.Tv24xiWR60lrnFB-O-udNAHaGj?w=209&h=185&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('pool 3') && n.includes('one piece')) return 'https://th.bing.com/th/id/OIP.uQtLKF-w73_MolyxVQ6avAHaGj?w=226&h=200&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('diamond one piece')) return 'https://th.bing.com/th/id/OIP.17eIC-J4C-ILWWPXfjjfCQHaGj?w=214&h=190&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('pool 2') && n.includes('one piece')) return 'https://th.bing.com/th/id/OIP.vN1zLZptl_gMABX6p0iAxAHaGj?w=207&h=184&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('max')) return 'https://th.bing.com/th/id/OIP.xebgWmt4pkev9Ua139IoNQHaGj?w=206&h=183&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('daewoo')) return 'https://th.bing.com/th/id/OIP.4o8fiHVSlhbZEZeNrh-o7QHaGj?w=198&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('pool 7') && n.includes('pedestal')) return 'https://th.bing.com/th/id/OIP.UeHvg4luTp2w2XxFyBr4cwHaGj?w=220&h=195&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('whistle')) return 'https://th.bing.com/th/id/OIP.Jyt8gO8KYI1SAJ_O2JBGcwHaGj?w=220&h=195&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('bowl 1')) return 'https://th.bing.com/th/id/OIP.CIzPpwBXujrJgzRqML1WRAHaHa?w=163&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('choice')) return 'https://th.bing.com/th/id/OIP._X5V9zERS1vu1unMxfyQ2wHaHa?w=163&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('civic')) return 'https://th.bing.com/th/id/OIP.-UVgViklgkfbq6x422cFLwHaHa?w=172&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('diamond upper')) return 'https://th.bing.com/th/id/OIP.Dj5Pw42DtqpPK5we5I90MwHaHa?w=169&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('round square')) return 'https://th.bing.com/th/id/OIP.ThfQ8k0ACLazL7AaU_dSowHaHX?w=146&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('square upper')) return 'https://th.bing.com/th/id/OIP.5VVWPFM4B2NwN0juPVFceQHaHa?w=159&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('oval upper')) return 'https://th.bing.com/th/id/OIP.fpao4PNmAnLwVU0Hj7uKrgHaHX?w=169&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n.includes('pearl')) return 'https://th.bing.com/th/id/OIP.VIHBCD7X7GOFAmg6Ajjq3wHaHX?w=172&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
      if (n === 'upper counter vanity') return 'data:image/webp;base64,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';
      if (n.includes('opera')) return 'https://th.bing.com/th/id/OIP.U-JDJT_ROcu_0k6kalOYeAHaHK?w=162&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3';
    }
  }
  return '';
}
