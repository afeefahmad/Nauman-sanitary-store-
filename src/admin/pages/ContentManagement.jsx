import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCatalog } from '../../context/CatalogContext';
import { useToast } from '../../context/ToastContext';
import { Save, Plus, Trash2, Edit, X } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

export default function ContentManagement() {
  const location = useLocation();
  const path = location.pathname.split('/').pop(); // 'contact', 'ticker', 'stats', 'brands', 'hero'

  const {
    contact, updateContact,
    tickerItems, refreshTicker,
    stats, refreshStats,
    brands, refreshBrands,
    heroCategories, refreshHeroCategories
  } = useCatalog();

  const renderContent = () => {
    switch (path) {
      case 'contact':
        return <ContactManager data={contact} updateData={updateContact} />;
      case 'ticker':
        return <TickerManager data={tickerItems} refreshData={refreshTicker} />;
      case 'stats':
        return <StatsManager data={stats} refreshData={refreshStats} />;
      case 'brands':
        return <BrandsManager data={brands} refreshData={refreshBrands} />;
      case 'hero':
        return <HeroManager data={heroCategories} refreshData={refreshHeroCategories} />;
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
  
  const handleSave = async (e) => {
    e.preventDefault();
    await updateData(formData);
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

function TickerManager({ data, refreshData }) {
  const [newItem, setNewItem] = useState('');
  const [editModal, setEditModal] = useState(null); // { id, message }
  const { addToast, confirmAction } = useToast();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    try {
      await fetch(`${API_BASE}/ticker`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newItem.trim() })
      });
      await refreshData();
      addToast('Announcement added! 📣', 'success');
      setNewItem('');
    } catch (err) {
      console.error(err);
      addToast('Failed to add announcement!', 'error');
    }
  };

  const handleModalSave = async (e) => {
    e.preventDefault();
    if (!editModal || !editModal.message?.trim()) return;
    try {
      await fetch(`${API_BASE}/ticker/${editModal.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: editModal.message.trim() })
      });
      await refreshData();
      addToast('Announcement updated! ✏️', 'info');
      setEditModal(null);
    } catch (err) {
      console.error(err);
      addToast('Failed to update announcement!', 'error');
    }
  };

  const remove = (id, messageText) => {
    confirmAction({
      title: 'Delete Announcement',
      message: `Are you sure you want to delete this announcement: "${messageText}"?`,
      confirmText: 'Delete Announcement',
      onConfirm: async () => {
        try {
          await fetch(`${API_BASE}/ticker/${id}`, { method: 'DELETE' });
          await refreshData();
          addToast('Announcement removed! 🗑️', 'info');
          if (editModal?.id === id) setEditModal(null);
        } catch (err) {
          console.error(err);
          addToast('Failed to delete announcement!', 'error');
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
        <div className="flex flex-col gap-1 flex-1 w-full">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            New Announcement
          </label>
          <input required value={newItem} onChange={e => setNewItem(e.target.value)} placeholder="E.g. Free delivery on orders above PKR 5000" className="w-full h-10 px-3 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <button type="submit" className="h-10 w-full sm:w-auto bg-primary text-primary-foreground px-4 rounded-md font-medium hover:bg-primary/90 flex items-center justify-center gap-2 whitespace-nowrap shadow-sm">
          <Plus className="w-4 h-4" /> Add
        </button>
      </form>

      <ul className="space-y-2">
        {(data || []).map((item, i) => {
          const itemText = typeof item === 'object' ? item.message : item;
          const itemId = typeof item === 'object' ? item.id : i;
          return (
            <li key={itemId} className="flex justify-between items-center p-3 border rounded-md transition-colors bg-muted/20 hover:bg-muted/30">
              <span className="text-sm font-medium">{itemText}</span>
              <div className="flex items-center gap-1">
                <button onClick={() => setEditModal({ id: itemId, message: itemText })} type="button" className="text-blue-500 hover:bg-blue-500/10 p-2 rounded-md transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
                <button onClick={() => remove(itemId, itemText)} type="button" className="text-destructive hover:bg-destructive/10 p-2 rounded-md transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Edit Announcement Modal */}
      {editModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-background border rounded-2xl max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4 relative">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 text-primary font-bold text-lg">
                <Edit className="w-5 h-5" />
                <span>Edit Announcement</span>
              </div>
              <button onClick={() => setEditModal(null)} className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleModalSave} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Announcement Text</label>
                <input required type="text" value={editModal.message} onChange={e => setEditModal({ ...editModal, message: e.target.value })} className="w-full h-10 px-3 rounded-lg border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setEditModal(null)} className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg text-sm font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-sm font-medium">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatsManager({ data, refreshData }) {
  const [val, setVal] = useState('');
  const [lbl, setLbl] = useState('');
  const [editModal, setEditModal] = useState(null); // { id, value, label }
  const { addToast, confirmAction } = useToast();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!val || !lbl) return;
    try {
      await fetch(`${API_BASE}/stats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: val, label: lbl })
      });
      await refreshData();
      addToast('Stat added! 📊', 'success');
      setVal(''); setLbl('');
    } catch (err) {
      console.error(err);
      addToast('Failed to add statistic!', 'error');
    }
  };

  const handleModalSave = async (e) => {
    e.preventDefault();
    if (!editModal || !editModal.value || !editModal.label) return;
    try {
      await fetch(`${API_BASE}/stats/${editModal.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: editModal.value, label: editModal.label })
      });
      await refreshData();
      addToast('Statistic updated! ✏️', 'info');
      setEditModal(null);
    } catch (err) {
      console.error(err);
      addToast('Failed to update statistic!', 'error');
    }
  };

  const remove = (id, statLabel, statValue) => {
    confirmAction({
      title: 'Delete Statistic',
      message: `Are you sure you want to delete statistic "${statLabel}" (${statValue})?`,
      confirmText: 'Delete Statistic',
      onConfirm: async () => {
        try {
          await fetch(`${API_BASE}/stats/${id}`, { method: 'DELETE' });
          await refreshData();
          addToast('Statistic removed! 🗑️', 'info');
          if (editModal?.id === id) setEditModal(null);
        } catch (err) {
          console.error(err);
          addToast('Failed to delete statistic!', 'error');
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
        <div className="flex flex-col gap-1 w-full sm:w-40">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Value</label>
          <input required value={val} onChange={e => setVal(e.target.value)} placeholder="E.g. 10k+" className="w-full h-10 px-3 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div className="flex flex-col gap-1 flex-1 w-full">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Label</label>
          <input required value={lbl} onChange={e => setLbl(e.target.value)} placeholder="E.g. Happy Customers" className="w-full h-10 px-3 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <button type="submit" className="h-10 w-full sm:w-auto bg-primary text-primary-foreground px-4 rounded-md font-medium hover:bg-primary/90 flex items-center justify-center gap-2 whitespace-nowrap shadow-sm">
          <Plus className="w-4 h-4" /> Add
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(data || []).map((item, i) => (
          <div key={item.id || i} className="relative p-4 border rounded-lg text-center transition-colors group bg-muted/10 hover:bg-muted/20">
            <div className="absolute top-2 right-2 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
              <button onClick={() => setEditModal({ id: item.id, value: item.value, label: item.label })} type="button" className="text-blue-500 hover:bg-blue-500/10 p-1.5 rounded-md" title="Edit"><Edit className="w-3.5 h-3.5" /></button>
              <button onClick={() => remove(item.id, item.label, item.value)} type="button" className="text-destructive hover:bg-destructive/10 p-1.5 rounded-md" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
            <div className="text-2xl font-bold mt-2">{item.value}</div>
            <div className="text-sm text-muted-foreground">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Edit Stat Modal */}
      {editModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-background border rounded-2xl max-w-md w-full p-4 sm:p-6 shadow-2xl space-y-4 relative">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 text-primary font-bold text-lg">
                <Edit className="w-5 h-5" />
                <span>Edit Statistic</span>
              </div>
              <button onClick={() => setEditModal(null)} className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleModalSave} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Value</label>
                <input required type="text" value={editModal.value} onChange={e => setEditModal({ ...editModal, value: e.target.value })} placeholder="E.g. 10k+" className="w-full h-10 px-3 rounded-lg border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Label</label>
                <input required type="text" value={editModal.label} onChange={e => setEditModal({ ...editModal, label: e.target.value })} placeholder="E.g. Happy Customers" className="w-full h-10 px-3 rounded-lg border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setEditModal(null)} className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg text-sm font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-sm font-medium">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function BrandsManager({ data, refreshData }) {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [editModal, setEditModal] = useState(null); // { id, name, logo, file: null }
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast, confirmAction } = useToast();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name) {
      addToast('Brand name is required!', 'error');
      return;
    }
    if (!file) {
      addToast('Brand logo image is required when creating a new brand!', 'error');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', file);
      const uploadRes = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData
      });
      const uploadData = await uploadRes.json();
      const logoUrl = uploadData.url;

      await fetch(`${API_BASE}/brands`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, logo: logoUrl })
      });

      await refreshData();
      addToast(`Brand "${name}" added successfully! 🏷️`, 'success');
      setName(''); setFile(null);
    } catch (err) {
      console.error(err);
      addToast('Operation failed!', 'error');
    }
  };

  const handleModalSave = async (e) => {
    e.preventDefault();
    if (!editModal || !editModal.name) return;
    setIsSubmitting(true);
    try {
      let logoUrl = editModal.logo;
      if (editModal.file) {
        const formData = new FormData();
        formData.append('image', editModal.file);
        const uploadRes = await fetch(`${API_BASE}/upload`, {
          method: 'POST',
          body: formData
        });
        const uploadData = await uploadRes.json();
        logoUrl = uploadData.url;
      }

      await fetch(`${API_BASE}/brands/${editModal.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editModal.name, logo: logoUrl })
      });

      await refreshData();
      addToast(`Brand "${editModal.name}" updated! ✏️`, 'info');
      setEditModal(null);
    } catch (err) {
      console.error(err);
      addToast('Failed to update brand!', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const remove = async (id, brandName) => {
    confirmAction({
      title: 'Delete Brand',
      message: `Are you sure you want to delete brand "${brandName || 'this brand'}"?`,
      confirmText: 'Delete Brand',
      onConfirm: async () => {
        try {
          await fetch(`${API_BASE}/brands/${id}`, { method: 'DELETE' });
          await refreshData();
          addToast(`Brand "${brandName || ''}" deleted! 🗑️`, 'info');
          if (editModal?.id === id) setEditModal(null);
        } catch (err) {
          console.error(err);
          addToast('Delete failed!', 'error');
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-3 items-end">
        <div className="flex flex-col gap-1 flex-1 w-full">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Brand Name</label>
          <input required value={name} onChange={e => setName(e.target.value)} placeholder="E.g. Porta" className="w-full h-10 px-3 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div className="flex flex-col gap-1 flex-1 w-full">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Brand Logo</label>
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="w-full h-10 px-3 py-1.5 border rounded-md bg-background file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
        </div>
        <button type="submit" className="h-10 w-full md:w-auto bg-primary text-primary-foreground px-4 rounded-md font-medium hover:bg-primary/90 flex items-center justify-center gap-2 whitespace-nowrap shadow-sm">
          <Plus className="w-4 h-4" /> Add Brand
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(data || []).map((item, i) => (
          <div key={item.id || i} className="relative p-4 border rounded-lg flex flex-col items-center justify-center transition-colors group bg-muted/10 hover:bg-muted/20">
            <div className="absolute top-2 right-2 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
              <button onClick={() => setEditModal({ id: item.id, name: item.name, logo: item.logo, file: null })} type="button" className="text-blue-500 hover:bg-blue-500/10 p-1.5 rounded-md" title="Edit"><Edit className="w-3.5 h-3.5" /></button>
              <button onClick={() => remove(item.id, item.name)} type="button" className="text-destructive hover:bg-destructive/10 p-1.5 rounded-md" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
            {item.logo ? (
              <img src={item.logo} alt={item.name} className="h-12 w-auto object-contain mb-2" onError={(e) => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex'; }} />
            ) : null}
            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary font-bold text-lg items-center justify-center mb-2" style={{ display: item.logo ? 'none' : 'flex' }}>{item.name?.charAt(0)?.toUpperCase()}</div>
            <div className="text-sm font-medium">{item.name}</div>
          </div>
        ))}
      </div>

      {/* Edit Brand Modal */}
      {editModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-background border rounded-2xl max-w-md w-full p-4 sm:p-6 shadow-2xl space-y-4 relative">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 text-primary font-bold text-lg">
                <Edit className="w-5 h-5" />
                <span>Edit Brand</span>
              </div>
              <button onClick={() => setEditModal(null)} className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleModalSave} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Brand Name</label>
                <input required type="text" value={editModal.name} onChange={e => setEditModal({ ...editModal, name: e.target.value })} className="w-full h-10 px-3 rounded-lg border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Brand Logo</label>
                <div className="flex items-center gap-3">
                  {editModal.logo ? (
                    <img src={editModal.logo} alt="" className="h-10 w-10 object-contain rounded-lg border bg-white shrink-0 p-1" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-muted border flex items-center justify-center text-xs text-muted-foreground shrink-0">No Logo</div>
                  )}
                  <input type="file" accept="image/*" onChange={e => setEditModal({ ...editModal, file: e.target.files[0] })} className="w-full text-xs file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                </div>
                <p className="text-[11px] text-muted-foreground italic mt-0.5">Leave empty to keep current logo.</p>
              </div>
              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setEditModal(null)} className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg text-sm font-medium">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-sm font-medium">{isSubmitting ? 'Saving...' : 'Save Changes'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function HeroManager({ data, refreshData }) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [file, setFile] = useState(null);
  const [slug, setSlug] = useState('');
  const [editModal, setEditModal] = useState(null); // { id, title, subtitle, slug, img, file: null }
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast, confirmAction } = useToast();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title || !slug) {
      addToast('Title and Slug are required!', 'error');
      return;
    }
    if (!file) {
      addToast('Image is required when creating a new category card!', 'error');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', file);
      const uploadRes = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData
      });
      const uploadData = await uploadRes.json();
      const imgUrl = uploadData.url;

      await fetch(`${API_BASE}/hero`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, subtitle, img: imgUrl, slug })
      });

      await refreshData();
      addToast(`Category card "${title}" added! 🏷️`, 'success');
      setTitle(''); setSubtitle(''); setSlug(''); setFile(null);
    } catch (err) {
      console.error(err);
      addToast('Operation failed!', 'error');
    }
  };

  const handleModalSave = async (e) => {
    e.preventDefault();
    if (!editModal || !editModal.title || !editModal.slug) return;
    setIsSubmitting(true);
    try {
      let imgUrl = editModal.img;
      if (editModal.file) {
        const formData = new FormData();
        formData.append('image', editModal.file);
        const uploadRes = await fetch(`${API_BASE}/upload`, {
          method: 'POST',
          body: formData
        });
        const uploadData = await uploadRes.json();
        imgUrl = uploadData.url;
      }

      await fetch(`${API_BASE}/hero/${editModal.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editModal.title, subtitle: editModal.subtitle, img: imgUrl, slug: editModal.slug })
      });

      await refreshData();
      addToast(`Category card "${editModal.title}" updated! ✏️`, 'info');
      setEditModal(null);
    } catch (err) {
      console.error(err);
      addToast('Failed to update category card!', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const remove = async (id, heroTitle) => {
    confirmAction({
      title: 'Delete Category Card',
      message: `Are you sure you want to delete "${heroTitle || 'this category card'}"?`,
      confirmText: 'Delete Card',
      onConfirm: async () => {
        try {
          await fetch(`${API_BASE}/hero/${id}`, { method: 'DELETE' });
          await refreshData();
          addToast(`Category card "${heroTitle || ''}" removed! 🗑️`, 'info');
          if (editModal?.id === id) setEditModal(null);
        } catch (err) {
          console.error(err);
          addToast('Delete failed!', 'error');
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAdd} className="flex flex-col gap-3">
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
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Image</label>
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="w-full h-10 px-3 py-1.5 border rounded-md bg-background file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
          </div>
          <div className="flex flex-col gap-1 flex-1 w-full">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Target Slug</label>
            <input required value={slug} onChange={e => setSlug(e.target.value)} placeholder="E.g. toilets" className="w-full h-10 px-3 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <button type="submit" className="h-10 w-full md:w-auto bg-primary text-primary-foreground px-4 rounded-md font-medium hover:bg-primary/90 flex items-center justify-center gap-2 whitespace-nowrap shadow-sm">
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(data || []).map((item, i) => (
          <div key={item.id || i} className="relative p-4 border rounded-xl h-32 flex flex-col justify-end bg-cover bg-center overflow-hidden shadow-sm group" style={{backgroundImage: `url(${item.img})`}}>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
            <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10 opacity-80 group-hover:opacity-100 transition-all">
              <button onClick={() => setEditModal({ id: item.id, title: item.title, subtitle: item.subtitle, slug: item.slug, img: item.img, file: null })} type="button" className="text-white bg-blue-600/80 hover:bg-blue-600 p-1.5 rounded-lg shadow-md" title="Edit"><Edit className="w-4 h-4" /></button>
              <button onClick={() => remove(item.id, item.title)} type="button" className="text-white bg-red-600/80 hover:bg-red-600 p-1.5 rounded-lg shadow-md" title="Delete"><Trash2 className="w-4 h-4" /></button>
            </div>
            <div className="relative z-10 text-white">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm opacity-80">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Category Card Modal */}
      {editModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-background border rounded-2xl max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4 relative">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 text-primary font-bold text-lg">
                <Edit className="w-5 h-5" />
                <span>Edit Shop by Category Card</span>
              </div>
              <button onClick={() => setEditModal(null)} className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleModalSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Title</label>
                  <input required type="text" value={editModal.title} onChange={e => setEditModal({ ...editModal, title: e.target.value })} className="w-full h-10 px-3 rounded-lg border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subtitle</label>
                  <input type="text" value={editModal.subtitle} onChange={e => setEditModal({ ...editModal, subtitle: e.target.value })} className="w-full h-10 px-3 rounded-lg border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Target Slug</label>
                <input required type="text" value={editModal.slug} onChange={e => setEditModal({ ...editModal, slug: e.target.value })} className="w-full h-10 px-3 rounded-lg border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Card Image</label>
                <div className="flex items-center gap-3">
                  {editModal.img ? (
                    <img src={editModal.img} alt="" className="w-12 h-12 object-cover rounded-lg border bg-white shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-muted border flex items-center justify-center text-xs text-muted-foreground shrink-0">No Img</div>
                  )}
                  <input type="file" accept="image/*" onChange={e => setEditModal({ ...editModal, file: e.target.files[0] })} className="w-full text-xs file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                </div>
                <p className="text-[11px] text-muted-foreground italic mt-0.5">Leave empty to keep current picture.</p>
              </div>
              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setEditModal(null)} className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg text-sm font-medium">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-sm font-medium">{isSubmitting ? 'Saving...' : 'Save Changes'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
