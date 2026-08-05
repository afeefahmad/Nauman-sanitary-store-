import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCatalog } from '../../context/CatalogContext';
import { useToast } from '../../context/ToastContext';
import { Save, Plus, Trash2, Edit } from 'lucide-react';

export default function ContentManagement() {
  const location = useLocation();
  const path = location.pathname.split('/').pop(); // 'contact', 'ticker', 'stats', 'brands', 'hero'

  const { contact, updateContact, tickerItems, updateTicker, stats, updateStats, brands, updateBrands, heroCategories, updateHeroCategories } = useCatalog();

  const renderContent = () => {
    switch (path) {
      case 'contact':
        return <ContactManager data={contact} updateData={updateContact} />;
      case 'ticker':
        return <TickerManager data={tickerItems} updateData={updateTicker} />;
      case 'stats':
        return <StatsManager data={stats} updateData={updateStats} />;
      case 'brands':
        return <BrandsManager data={brands} updateData={updateBrands} />;
      case 'hero':
        return <HeroManager data={heroCategories} updateData={updateHeroCategories} />;
      default:
        return <div>Select a module from the sidebar.</div>;
    }
  };

  const titleMap = {
    contact: 'Contact Management',
    ticker: 'Announcements',
    stats: 'Statistics',
    brands: 'Brands Management',
    hero: 'Shop by Category'
  };

  return (
    <div className="bg-card border shadow-sm rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6">{titleMap[path] || 'Content Management'}</h2>
      {renderContent()}
    </div>
  );
}

// ---------------------------------------------------------
// Sub-Managers
// ---------------------------------------------------------

function ContactManager({ data, updateData }) {
  const [formData, setFormData] = useState(data || {});
  const { addToast } = useToast();
  
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSave = (e) => {
    e.preventDefault();
    updateData(formData);
    addToast('Contact info saved successfully! 💾', 'success');
  };

  return (
    <form onSubmit={handleSave} className="space-y-4 max-w-lg">
      <div>
        <label className="block text-sm font-medium mb-1">Owner Name</label>
        <input name="owner" value={formData.owner || ''} onChange={handleChange} className="w-full h-10 px-3 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Phone Number (Raw)</label>
        <input name="phone" value={formData.phone || ''} onChange={handleChange} className="w-full h-10 px-3 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Phone Number (Formatted)</label>
        <input name="phoneFormatted" value={formData.phoneFormatted || ''} onChange={handleChange} className="w-full h-10 px-3 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">WhatsApp URL</label>
        <input name="whatsappUrl" value={formData.whatsappUrl || ''} onChange={handleChange} className="w-full h-10 px-3 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
      </div>
      <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 flex items-center gap-2 shadow-sm">
        <Save className="w-4 h-4" /> Save Contact Info
      </button>
    </form>
  );
}

function TickerManager({ data, updateData }) {
  const [items, setItems] = useState(data || []);
  const [newItem, setNewItem] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const { addToast, confirmAction } = useToast();

  const handleSave = async (e) => {
    e.preventDefault();
    if (!newItem) return;

    if (editingIndex !== null) {
      const updated = [...items];
      updated[editingIndex] = newItem;
      updateData(updated);
      setItems(updated);
      addToast('Announcement updated! ✏️', 'info');
      setEditingIndex(null);
    } else {
      updateData([...items, newItem]);
      setItems([...items, newItem]);
      addToast('Announcement added! 📣', 'success');
    }
    setNewItem('');
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setNewItem(items[index]);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setNewItem('');
  };

  const remove = (index) => {
    confirmAction({
      title: 'Delete Announcement',
      message: `Are you sure you want to delete this announcement: "${items[index]}"?`,
      confirmText: 'Delete Announcement',
      onConfirm: () => {
        const updated = items.filter((_, i) => i !== index);
        updateData(updated);
        setItems(updated);
        addToast('Announcement removed! 🗑️', 'info');
        if (editingIndex === index) cancelEdit();
      }
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSave} className="flex gap-3 items-end">
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {editingIndex !== null ? 'Edit Announcement' : 'New Announcement'}
          </label>
          <input required value={newItem} onChange={e => setNewItem(e.target.value)} placeholder="E.g. Free delivery on orders above PKR 5000" className="w-full h-10 px-3 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        {editingIndex !== null ? (
          <div className="flex gap-2">
            <button type="submit" className="h-10 bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-md font-medium flex items-center gap-2 whitespace-nowrap shadow-sm">
              <Edit className="w-4 h-4" /> Update
            </button>
            <button type="button" onClick={cancelEdit} className="h-10 bg-muted hover:bg-muted/80 text-foreground px-3 rounded-md font-medium">
              Cancel
            </button>
          </div>
        ) : (
          <button type="submit" className="h-10 bg-primary text-primary-foreground px-4 rounded-md font-medium hover:bg-primary/90 flex items-center gap-2 whitespace-nowrap shadow-sm">
            <Plus className="w-4 h-4" /> Add
          </button>
        )}
      </form>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className={`flex justify-between items-center p-3 border rounded-md transition-colors ${editingIndex === i ? 'bg-blue-50/50 dark:bg-blue-950/30 border-blue-300' : 'bg-muted/20 hover:bg-muted/30'}`}>
            <span className="text-sm font-medium">{item}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => startEdit(i)} type="button" className="text-blue-500 hover:bg-blue-500/10 p-2 rounded-md transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
              <button onClick={() => remove(i)} type="button" className="text-destructive hover:bg-destructive/10 p-2 rounded-md transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatsManager({ data, updateData }) {
  const [items, setItems] = useState(data || []);
  const [val, setVal] = useState('');
  const [lbl, setLbl] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const { addToast, confirmAction } = useToast();

  const handleSave = (e) => {
    e.preventDefault();
    if (!val || !lbl) return;

    if (editingIndex !== null) {
      const updated = [...items];
      updated[editingIndex] = { value: val, label: lbl };
      updateData(updated);
      setItems(updated);
      addToast('Statistic updated! ✏️', 'info');
      setEditingIndex(null);
    } else {
      const updated = [...items, { value: val, label: lbl }];
      updateData(updated);
      setItems(updated);
      addToast('Stat added! 📊', 'success');
    }
    setVal(''); setLbl('');
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setVal(items[index].value);
    setLbl(items[index].label);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setVal(''); setLbl('');
  };

  const remove = (index) => {
    confirmAction({
      title: 'Delete Statistic',
      message: `Are you sure you want to delete statistic "${items[index]?.label}" (${items[index]?.value})?`,
      confirmText: 'Delete Statistic',
      onConfirm: () => {
        const updated = items.filter((_, i) => i !== index);
        updateData(updated);
        setItems(updated);
        addToast('Statistic removed! 🗑️', 'info');
        if (editingIndex === index) cancelEdit();
      }
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSave} className="flex gap-3 items-end">
        <div className="flex flex-col gap-1 w-40">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Value</label>
          <input required value={val} onChange={e => setVal(e.target.value)} placeholder="E.g. 10k+" className="w-full h-10 px-3 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Label</label>
          <input required value={lbl} onChange={e => setLbl(e.target.value)} placeholder="E.g. Happy Customers" className="w-full h-10 px-3 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        {editingIndex !== null ? (
          <div className="flex gap-2">
            <button type="submit" className="h-10 bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-md font-medium flex items-center gap-2 whitespace-nowrap shadow-sm">
              <Edit className="w-4 h-4" /> Update
            </button>
            <button type="button" onClick={cancelEdit} className="h-10 bg-muted hover:bg-muted/80 text-foreground px-3 rounded-md font-medium">
              Cancel
            </button>
          </div>
        ) : (
          <button type="submit" className="h-10 bg-primary text-primary-foreground px-4 rounded-md font-medium hover:bg-primary/90 flex items-center gap-2 whitespace-nowrap shadow-sm">
            <Plus className="w-4 h-4" /> Add
          </button>
        )}
      </form>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <div key={i} className={`relative p-4 border rounded-lg text-center transition-colors group ${editingIndex === i ? 'bg-blue-50/50 dark:bg-blue-950/30 border-blue-300' : 'bg-muted/10 hover:bg-muted/20'}`}>
            <div className="absolute top-2 right-2 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
              <button onClick={() => startEdit(i)} type="button" className="text-blue-500 hover:bg-blue-500/10 p-1.5 rounded-md" title="Edit"><Edit className="w-3.5 h-3.5" /></button>
              <button onClick={() => remove(i)} type="button" className="text-destructive hover:bg-destructive/10 p-1.5 rounded-md" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
            <div className="text-2xl font-bold mt-2">{item.value}</div>
            <div className="text-sm text-muted-foreground">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandsManager({ data, updateData }) {
  const [items, setItems] = useState(data || []);
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const { addToast, confirmAction } = useToast();

  const startEdit = (item) => {
    setEditingId(item.id);
    setName(item.name);
    setFile(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName('');
    setFile(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name) {
      addToast('Brand name is required!', 'error');
      return;
    }

    try {
      let logoUrl = null;
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        const uploadRes = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: formData
        });
        const uploadData = await uploadRes.json();
        logoUrl = uploadData.url;
      }

      if (editingId) {
        const existingBrand = items.find(b => b.id === editingId);
        const finalLogo = logoUrl || existingBrand?.logo || '';

        await fetch(`http://localhost:5000/api/brands/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, logo: finalLogo })
        });

        const updated = items.map(b => b.id === editingId ? { ...b, name, logo: finalLogo } : b);
        updateData(updated);
        setItems(updated);
        addToast(`Brand "${name}" updated! ✏️`, 'info');
        cancelEdit();
      } else {
        if (!file) {
          addToast('Brand logo image is required when creating a new brand!', 'error');
          return;
        }
        const res = await fetch('http://localhost:5000/api/brands', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, logo: logoUrl })
        });
        const dbBrand = await res.json();

        const updated = [...items, dbBrand];
        updateData(updated);
        setItems(updated);
        addToast(`Brand "${name}" added successfully! 🏷️`, 'success');
        setName(''); setFile(null);
      }
    } catch (err) {
      console.error(err);
      addToast('Operation failed!', 'error');
    }
  };

  const remove = async (id, index, brandName) => {
    confirmAction({
      title: 'Delete Brand',
      message: `Are you sure you want to delete brand "${brandName || 'this brand'}"?`,
      confirmText: 'Delete Brand',
      onConfirm: async () => {
        try {
          await fetch(`http://localhost:5000/api/brands/${id}`, { method: 'DELETE' });
          const updated = items.filter((_, i) => i !== index);
          updateData(updated);
          setItems(updated);
          addToast(`Brand "${brandName || ''}" deleted! 🗑️`, 'info');
          if (editingId === id) cancelEdit();
        } catch (err) {
          console.error(err);
          addToast('Delete failed!', 'error');
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSave} className="flex flex-col md:flex-row gap-3 items-end">
        <div className="flex flex-col gap-1 flex-1 w-full">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Brand Name</label>
          <input required value={name} onChange={e => setName(e.target.value)} placeholder="E.g. Porta" className="w-full h-10 px-3 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div className="flex flex-col gap-1 flex-1 w-full">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {editingId ? 'New Logo (Optional)' : 'Brand Logo'}
          </label>
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="w-full h-10 px-3 py-1.5 border rounded-md bg-background file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
        </div>
        {editingId ? (
          <div className="flex gap-2 w-full md:w-auto">
            <button type="submit" className="h-10 bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-md font-medium flex items-center justify-center gap-2 whitespace-nowrap shadow-sm flex-1 md:flex-none">
              <Edit className="w-4 h-4" /> Update Brand
            </button>
            <button type="button" onClick={cancelEdit} className="h-10 bg-muted hover:bg-muted/80 text-foreground px-3 rounded-md font-medium">
              Cancel
            </button>
          </div>
        ) : (
          <button type="submit" className="h-10 w-full md:w-auto bg-primary text-primary-foreground px-4 rounded-md font-medium hover:bg-primary/90 flex items-center justify-center gap-2 whitespace-nowrap shadow-sm">
            <Plus className="w-4 h-4" /> Add Brand
          </button>
        )}
      </form>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <div key={item.id || i} className={`relative p-4 border rounded-lg flex flex-col items-center justify-center transition-colors group ${editingId === item.id ? 'bg-blue-50/50 dark:bg-blue-950/30 border-blue-300' : 'bg-muted/10 hover:bg-muted/20'}`}>
            <div className="absolute top-2 right-2 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
              <button onClick={() => startEdit(item)} type="button" className="text-blue-500 hover:bg-blue-500/10 p-1.5 rounded-md" title="Edit"><Edit className="w-3.5 h-3.5" /></button>
              <button onClick={() => remove(item.id, i, item.name)} type="button" className="text-destructive hover:bg-destructive/10 p-1.5 rounded-md" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
            {item.logo ? (
              <img src={item.logo} alt={item.name} className="h-12 w-auto object-contain mb-2" onError={(e) => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex'; }} />
            ) : null}
            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary font-bold text-lg items-center justify-center mb-2" style={{ display: item.logo ? 'none' : 'flex' }}>{item.name?.charAt(0)?.toUpperCase()}</div>
            <div className="text-sm font-medium">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroManager({ data, updateData }) {
  const [items, setItems] = useState(data || []);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [file, setFile] = useState(null);
  const [slug, setSlug] = useState('');
  const [editingId, setEditingId] = useState(null);
  const { addToast, confirmAction } = useToast();

  const startEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title || '');
    setSubtitle(item.subtitle || '');
    setSlug(item.slug || '');
    setFile(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle(''); setSubtitle(''); setSlug(''); setFile(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title || !slug) {
      addToast('Title and Slug are required!', 'error');
      return;
    }

    try {
      let imgUrl = null;
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        const uploadRes = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: formData
        });
        const uploadData = await uploadRes.json();
        imgUrl = uploadData.url;
      }

      if (editingId) {
        const existingHero = items.find(h => h.id === editingId);
        const finalImg = imgUrl || existingHero?.img || '';

        await fetch(`http://localhost:5000/api/hero/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, subtitle, img: finalImg, slug })
        });

        const updated = items.map(h => h.id === editingId ? { ...h, title, subtitle, img: finalImg, slug } : h);
        updateData(updated);
        setItems(updated);
        addToast(`Category card "${title}" updated! ✏️`, 'info');
        cancelEdit();
      } else {
        if (!file) {
          addToast('Image is required when creating a new category card!', 'error');
          return;
        }
        const res = await fetch('http://localhost:5000/api/hero', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, subtitle, img: imgUrl, slug })
        });
        const dbHero = await res.json();

        const updated = [...items, dbHero];
        updateData(updated);
        setItems(updated);
        addToast(`Category card "${title}" added! 🏷️`, 'success');
        cancelEdit();
      }
    } catch (err) {
      console.error(err);
      addToast('Operation failed!', 'error');
    }
  };

  const remove = async (id, index, heroTitle) => {
    confirmAction({
      title: 'Delete Category Card',
      message: `Are you sure you want to delete "${heroTitle || 'this category card'}"?`,
      confirmText: 'Delete Card',
      onConfirm: async () => {
        try {
          await fetch(`http://localhost:5000/api/hero/${id}`, { method: 'DELETE' });
          const updated = items.filter((_, i) => i !== index);
          updateData(updated);
          setItems(updated);
          addToast(`Category card "${heroTitle || ''}" removed! 🗑️`, 'info');
          if (editingId === id) cancelEdit();
        } catch (err) {
          console.error(err);
          addToast('Delete failed!', 'error');
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSave} className="flex flex-col gap-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Title</label>
            <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="E.g. Modern Toilets" className="w-full h-10 px-3 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subtitle</label>
            <input value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="E.g. Premium Sanitaryware" className="w-full h-10 px-3 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 items-end">
          <div className="flex flex-col gap-1 flex-1 w-full">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {editingId ? 'New Image (Optional)' : 'Image'}
            </label>
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="w-full h-10 px-3 py-1.5 border rounded-md bg-background file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
          </div>
          <div className="flex flex-col gap-1 flex-1 w-full">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Target Slug</label>
            <input required value={slug} onChange={e => setSlug(e.target.value)} placeholder="E.g. toilets" className="w-full h-10 px-3 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          {editingId ? (
            <div className="flex gap-2 w-full md:w-auto">
              <button type="submit" className="h-10 bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-md font-medium flex items-center justify-center gap-2 whitespace-nowrap shadow-sm flex-1 md:flex-none">
                <Edit className="w-4 h-4" /> Update Category
              </button>
              <button type="button" onClick={cancelEdit} className="h-10 bg-muted hover:bg-muted/80 text-foreground px-3 rounded-md font-medium">
                Cancel
              </button>
            </div>
          ) : (
            <button type="submit" className="h-10 w-full md:w-auto bg-primary text-primary-foreground px-4 rounded-md font-medium hover:bg-primary/90 flex items-center justify-center gap-2 whitespace-nowrap shadow-sm">
              <Plus className="w-4 h-4" /> Add Category
            </button>
          )}
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div key={item.id || i} className={`relative p-4 border rounded-xl h-32 flex flex-col justify-end bg-cover bg-center overflow-hidden shadow-sm group ${editingId === item.id ? 'ring-2 ring-blue-500' : ''}`} style={{backgroundImage: `url(${item.img})`}}>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
            <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10 opacity-80 group-hover:opacity-100 transition-all">
              <button onClick={() => startEdit(item)} type="button" className="text-white bg-blue-600/80 hover:bg-blue-600 p-1.5 rounded-lg shadow-md" title="Edit"><Edit className="w-4 h-4" /></button>
              <button onClick={() => remove(item.id, i, item.title)} type="button" className="text-white bg-red-600/80 hover:bg-red-600 p-1.5 rounded-lg shadow-md" title="Delete"><Trash2 className="w-4 h-4" /></button>
            </div>
            <div className="relative z-10 text-white">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm opacity-80">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
