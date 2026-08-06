import { createContext, useContext, useState, useEffect } from 'react';

const CatalogContext = createContext();

const API_BASE = 'http://localhost:5000/api';

export function CatalogProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [heroCategories, setHeroCategories] = useState([]);
  const [contact, setContact] = useState({});
  const [tickerItems, setTickerItems] = useState([]);
  const [stats, setStats] = useState([]);
  const [brands, setBrands] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);

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
        
        const c = await catsRes.json();
        const h = await heroRes.json();
        const cnt = await contactRes.json();
        const t = await tickerRes.json();
        const s = await statsRes.json();
        const b = await brandsRes.json();

        setCategories(c);
        setHeroCategories(h);
        setContact(cnt);
        setTickerItems(t);
        setStats(s);
        setBrands(b);
      } catch (err) {
        console.error("Error loading data from backend:", err);
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
    } catch (e) { console.error(e); }
  };

  const refreshStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      const s = await res.json();
      setStats(s);
    } catch (e) { console.error(e); }
  };

  const refreshBrands = async () => {
    try {
      const res = await fetch(`${API_BASE}/brands`);
      const b = await res.json();
      setBrands(b);
    } catch (e) { console.error(e); }
  };

  const refreshHeroCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/hero`);
      const h = await res.json();
      setHeroCategories(h);
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
    } catch (e) { console.error(e); }
  };

  const updateTicker = async (items) => {
    setTickerItems(items);
  };

  const updateStats = async (items) => {
    setStats(items);
  };

  const updateBrands = async (items) => {
    setBrands(items);
  };

  const updateHeroCategories = async (items) => {
    setHeroCategories(items);
  };

  // Product management
  const addProduct = async (categorySlug, product) => {
    try {
      await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...product, categorySlug })
      });
      // Optimistic update
      const newCategories = categories.map(cat => {
        if (cat.slug === categorySlug) {
          return { ...cat, products: [product, ...cat.products] };
        }
        return cat;
      });
      setCategories(newCategories);
    } catch (e) { console.error(e); }
  };

  const deleteProduct = async (categorySlug, productId) => {
    try {
      await fetch(`${API_BASE}/products/${productId}`, { method: 'DELETE' });
      const newCategories = categories.map(cat => {
        return { ...cat, products: (cat.products || []).filter(p => p.id !== productId) };
      });
      setCategories(newCategories);
    } catch (e) { console.error(e); }
  };

  const deleteProductsBulk = async (productIds) => {
    try {
      await fetch(`${API_BASE}/products/delete-bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: productIds })
      });
      const idSet = new Set(productIds);
      const newCategories = categories.map(cat => ({
        ...cat,
        products: (cat.products || []).filter(p => !idSet.has(p.id))
      }));
      setCategories(newCategories);
    } catch (e) { console.error(e); }
  };

  const updateProduct = async (oldCategorySlug, newCategorySlug, productId, productData) => {
    try {
      await fetch(`${API_BASE}/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...productData, categorySlug: newCategorySlug })
      });
      
      let newCategories = [...categories];
      if (oldCategorySlug === newCategorySlug) {
        newCategories = newCategories.map(cat => {
          if (cat.slug === newCategorySlug) {
            return { ...cat, products: cat.products.map(p => p.id === productId ? { ...p, ...productData } : p) };
          }
          return cat;
        });
      } else {
        let movedProduct = null;
        newCategories = newCategories.map(cat => {
          if (cat.slug === oldCategorySlug) {
            movedProduct = cat.products.find(p => p.id === productId);
            return { ...cat, products: cat.products.filter(p => p.id !== productId) };
          }
          return cat;
        });
        newCategories = newCategories.map(cat => {
          if (cat.slug === newCategorySlug) {
            return { ...cat, products: [{ ...movedProduct, ...productData }, ...cat.products] };
          }
          return cat;
        });
      }
      setCategories(newCategories);
    } catch (e) { console.error(e); }
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
