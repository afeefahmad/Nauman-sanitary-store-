import { createContext, useContext, useState, useEffect } from 'react';
import {
  ALL_CATEGORIES,
  HERO_CATEGORIES as INITIAL_HERO,
  CONTACT as INITIAL_CONTACT,
  TICKER_ITEMS as INITIAL_TICKER,
  STATS as INITIAL_STATS,
  BRANDS as INITIAL_BRANDS
} from '../data/categories';

import { API_BASE } from '../utils/apiConfig';

const CatalogContext = createContext();

export function CatalogProvider({ children }) {
  const ensureProductIds = (cats) => {
    if (!Array.isArray(cats)) return cats;
    return cats.map(cat => ({
      ...cat,
      products: (cat.products || []).map((p, idx) => {
        const generatedId = p.id || `${cat.slug || 'prod'}-${(p.brand || 'nobrand')}-${(p.name || 'item')}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        return {
          ...p,
          id: generatedId || `prod-${idx}-${Date.now()}`
        };
      })
    }));
  };

  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('ns_catalog_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return ensureProductIds(parsed);
      }
    } catch (e) {}
    return ensureProductIds(ALL_CATEGORIES);
  });

  const [heroCategories, setHeroCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('ns_catalog_hero');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_HERO;
  });

  const [contact, setContact] = useState(() => {
    try {
      const saved = localStorage.getItem('ns_catalog_contact');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_CONTACT;
  });

  const [tickerItems, setTickerItems] = useState(() => {
    try {
      const saved = localStorage.getItem('ns_catalog_ticker');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_TICKER;
  });

  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('ns_catalog_stats');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_STATS;
  });

  const [brands, setBrands] = useState(() => {
    try {
      const saved = localStorage.getItem('ns_catalog_brands');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return INITIAL_BRANDS;
  });
  
  const [isLoading, setIsLoading] = useState(true);

  // Helper to update state + localStorage safely
  const saveCategories = (cats) => {
    const sanitized = ensureProductIds(cats);
    setCategories(sanitized);
    try { localStorage.setItem('ns_catalog_categories', JSON.stringify(sanitized)); } catch (e) {}
  };

  const saveBrands = (bList) => {
    setBrands(bList);
    try { localStorage.setItem('ns_catalog_brands', JSON.stringify(bList)); } catch (e) {}
  };

  // Initial Fetch
  useEffect(() => {
    async function loadData() {
      try {
        const [catsRes, heroRes, contactRes, tickerRes, statsRes, brandsRes] = await Promise.all([
          fetch(`${API_BASE}/categories`),
          fetch(`${API_BASE}/hero`),
          fetch(`${API_BASE}/contact`),
          fetch(`${API_BASE}/ticker`),
          fetch(`${API_BASE}/stats`),
          fetch(`${API_BASE}/brands`)
        ]);
        
        if (catsRes.ok) {
          const cData = await catsRes.json();
          if (Array.isArray(cData) && cData.length > 0) saveCategories(cData);
        }
        if (heroRes.ok) {
          const hData = await heroRes.json();
          setHeroCategories(hData);
          try { localStorage.setItem('ns_catalog_hero', JSON.stringify(hData)); } catch (e) {}
        }
        if (contactRes.ok) {
          const ctnData = await contactRes.json();
          setContact(ctnData);
          try { localStorage.setItem('ns_catalog_contact', JSON.stringify(ctnData)); } catch (e) {}
        }
        if (tickerRes.ok) {
          const tData = await tickerRes.json();
          setTickerItems(tData);
          try { localStorage.setItem('ns_catalog_ticker', JSON.stringify(tData)); } catch (e) {}
        }
        if (statsRes.ok) {
          const sData = await statsRes.json();
          setStats(sData);
          try { localStorage.setItem('ns_catalog_stats', JSON.stringify(sData)); } catch (e) {}
        }
        if (brandsRes.ok) {
          const fetchedBrands = await brandsRes.json();
          if (Array.isArray(fetchedBrands)) {
            saveBrands(fetchedBrands);
          }
        }
      } catch (err) {
        console.warn("Backend API offline, using cached catalog data.");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const refreshTicker = async () => {
    try {
      const res = await fetch(`${API_BASE}/ticker`);
      const t = await res.json();
      setTickerItems(t);
      try { localStorage.setItem('ns_catalog_ticker', JSON.stringify(t)); } catch (e) {}
    } catch (e) { console.error(e); }
  };

  const refreshStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      const s = await res.json();
      setStats(s);
      try { localStorage.setItem('ns_catalog_stats', JSON.stringify(s)); } catch (e) {}
    } catch (e) { console.error(e); }
  };

  const refreshBrands = async () => {
    try {
      const res = await fetch(`${API_BASE}/brands`);
      const b = await res.json();
      saveBrands(b);
    } catch (e) { console.error(e); }
  };

  const refreshHeroCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/hero`);
      const h = await res.json();
      setHeroCategories(h);
      try { localStorage.setItem('ns_catalog_hero', JSON.stringify(h)); } catch (e) {}
    } catch (e) { console.error(e); }
  };

  // Update Methods
  const updateContact = async (newData) => {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });
      const data = await res.json();
      setContact(data);
      try { localStorage.setItem('ns_catalog_contact', JSON.stringify(data)); } catch (e) {}
    } catch (e) { console.error(e); }
  };

  const updateTicker = async (items) => {
    setTickerItems(items);
    try { localStorage.setItem('ns_catalog_ticker', JSON.stringify(items)); } catch (e) {}
  };

  const updateStats = async (items) => {
    setStats(items);
    try { localStorage.setItem('ns_catalog_stats', JSON.stringify(items)); } catch (e) {}
  };

  const updateBrands = async (items) => {
    saveBrands(items);
  };

  const deleteBrand = async (brandId, brandName) => {
    const targetParam = brandId ? encodeURIComponent(brandId) : encodeURIComponent(brandName || '');
    const cleanTargetName = (brandName || '').trim().toLowerCase();
    const cleanId = (brandId || '').toString().trim().toLowerCase();

    try {
      if (targetParam) {
        await fetch(`${API_BASE}/brands/${targetParam}?name=${encodeURIComponent(brandName || '')}`, { method: 'DELETE' });
      }
    } catch (e) {
      console.error(e);
    }

    const newBrands = (brands || []).filter(b => {
      if (cleanId && b.id && b.id.toString().trim().toLowerCase() === cleanId) return false;
      if (cleanTargetName && b.name && b.name.trim().toLowerCase() === cleanTargetName) return false;
      return true;
    });
    saveBrands(newBrands);

    if (cleanTargetName) {
      const newCategories = categories.map(cat => ({
        ...cat,
        brands: (cat.brands || []).filter(b => (b || '').trim().toLowerCase() !== cleanTargetName),
        products: (cat.products || []).filter(p => (p.brand || '').trim().toLowerCase() !== cleanTargetName)
      }));
      saveCategories(newCategories);
    }
  };

  const updateHeroCategories = async (items) => {
    setHeroCategories(items);
    try { localStorage.setItem('ns_catalog_hero', JSON.stringify(items)); } catch (e) {}
  };

  // Product management
  const addProduct = async (categorySlug, product) => {
    try {
      await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...product, categorySlug })
      });
    } catch (e) { console.error(e); }

    // Optimistic + Persistent update
    const newCategories = categories.map(cat => {
      if (cat.slug === categorySlug) {
        return { ...cat, products: [product, ...(cat.products || [])] };
      }
      return cat;
    });
    saveCategories(newCategories);
  };

  const deleteProduct = async (categorySlug, productId, productName) => {
    try {
      const target = productId ? encodeURIComponent(productId) : encodeURIComponent(productName || '');
      await fetch(`${API_BASE}/products/${target}`, { method: 'DELETE' });
    } catch (e) { console.error(e); }

    const cleanName = (productName || '').trim().toLowerCase();
    const newCategories = categories.map(cat => ({
      ...cat,
      products: (cat.products || []).filter(p => {
        if (productId && p.id === productId) return false;
        if (cleanName && p.name && p.name.trim().toLowerCase() === cleanName) return false;
        return true;
      })
    }));
    saveCategories(newCategories);
  };

  const deleteProductsBulk = async (productIds = [], productNames = []) => {
    try {
      await fetch(`${API_BASE}/products/delete-bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: productIds, names: productNames })
      });
    } catch (e) { console.error(e); }

    const idSet = new Set(productIds);
    const nameSet = new Set(productNames.map(n => n.trim().toLowerCase()));

    const newCategories = categories.map(cat => ({
      ...cat,
      products: (cat.products || []).filter(p => {
        if (p.id && idSet.has(p.id)) return false;
        if (p.name && nameSet.has(p.name.trim().toLowerCase())) return false;
        return true;
      })
    }));
    saveCategories(newCategories);
  };

  const updateProduct = async (oldCategorySlug, newCategorySlug, productId, productData) => {
    try {
      await fetch(`${API_BASE}/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...productData, categorySlug: newCategorySlug })
      });
    } catch (e) { console.error(e); }

    const targetCategorySlug = (newCategorySlug && newCategorySlug !== 'all') 
      ? newCategorySlug 
      : ((oldCategorySlug && oldCategorySlug !== 'all') ? oldCategorySlug : 'toilets');

    const newCategories = categories.map(cat => {
      const filteredProducts = (cat.products || []).filter(p => p.id !== productId);
      if (cat.slug === targetCategorySlug) {
        const existingProd = (cat.products || []).find(p => p.id === productId);
        const updatedProd = existingProd ? { ...existingProd, ...productData } : { id: productId, ...productData };
        return { ...cat, products: [updatedProd, ...filteredProducts] };
      }
      return { ...cat, products: filteredProducts };
    });

    saveCategories(newCategories);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading Catalog...</div>;
  }

  return (
    <CatalogContext.Provider value={{
      categories,
      addProduct,
      deleteProduct,
      deleteProductsBulk,
      updateProduct,
      
      CONTACT: contact, 
      contact,
      updateContact,
      
      TICKER_ITEMS: tickerItems, 
      tickerItems,
      updateTicker,
      refreshTicker,
      
      STATS: stats, 
      stats,
      updateStats,
      refreshStats,
      
      BRANDS: brands, 
      brands,
      updateBrands,
      deleteBrand,
      refreshBrands,
      
      HERO_CATEGORIES: heroCategories, 
      heroCategories,
      updateHeroCategories,
      refreshHeroCategories
    }}>
      {children}
    </CatalogContext.Provider>
  );
}

export const useCatalog = () => useContext(CatalogContext);
