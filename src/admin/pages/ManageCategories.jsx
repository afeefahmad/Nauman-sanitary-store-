import { useState, useEffect, useRef } from 'react';
import { useCatalog } from '../../context/CatalogContext';
import { useToast } from '../../context/ToastContext';
import { getProductImage } from '../../data/categories';
import { Plus, Trash2, Edit, Search, X, PackageX, RefreshCw, Download, Eye, ChevronLeft, ChevronRight, CheckSquare, Square } from 'lucide-react';

export default function ManageCategories() {
  const { categories, addProduct, deleteProduct, deleteProductsBulk, brands, updateProduct } = useCatalog();
  const { addToast, confirmAction } = useToast();

  const [activeCategorySlug, setActiveCategorySlug] = useState('all');
  const [newProductName, setNewProductName] = useState('');
  const [newProductBrand, setNewProductBrand] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [file, setFile] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);

  // Bulk selection & Quick View & Pagination states
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [editModalProduct, setEditModalProduct] = useState(null);
  const [editModalFile, setEditModalFile] = useState(null);
  const [isSubmittingModal, setIsSubmittingModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const fileInputRef = useRef(null);

  const totalAllProducts = categories.reduce((sum, cat) => sum + (cat.products?.length || 0), 0);

  useEffect(() => {
    if (categories.length > 0 && !activeCategorySlug) {
      setActiveCategorySlug('all');
    }
  }, [categories, activeCategorySlug]);

  // Reset pagination when category, brand, or search changes
  useEffect(() => {
    setCurrentPage(1);
    setSelectedIds(new Set());
  }, [activeCategorySlug, newProductBrand, searchTerm]);

  const activeCategory = activeCategorySlug === 'all'
    ? {
        name: 'All Categories',
        icon: '🛒',
        slug: 'all',
        products: categories.flatMap(c => (c.products || []).map(p => ({ ...p, categorySlug: c.slug, categoryName: c.name })))
      }
    : (() => {
        const cat = categories.find(c => c.slug === activeCategorySlug);
        if (!cat) return null;
        return {
          ...cat,
          products: (cat.products || []).map(p => ({ ...p, categorySlug: cat.slug, categoryName: cat.name }))
        };
      })();

  const handleEditClick = (product, catSlug) => {
    const slug = catSlug || product.categorySlug || 'toilets';
    setEditModalProduct({
      ...product,
      categorySlug: slug,
      originalCategorySlug: slug,
      brand: product.brand || 'Unbranded'
    });
    setEditModalFile(null);
    setQuickViewProduct(null);
  };

  const handleModalEditSave = async (e) => {
    e.preventDefault();
    if (!editModalProduct) return;
    setIsSubmittingModal(true);
    try {
      let imageUrl = editModalProduct.image;
      if (editModalFile) {
        const formData = new FormData();
        formData.append('image', editModalFile);
        const uploadRes = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: formData
        });
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      }

      await updateProduct(
        editModalProduct.originalCategorySlug,
        editModalProduct.categorySlug,
        editModalProduct.id,
        {
          name: editModalProduct.name,
          brand: editModalProduct.brand,
          image: imageUrl
        }
      );

      addToast(`Product "${editModalProduct.name}" updated! ✏️`, 'success');
      setEditModalProduct(null);
      setEditModalFile(null);
    } catch (err) {
      console.error(err);
      addToast('Failed to update product!', 'error');
    } finally {
      setIsSubmittingModal(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setNewProductName('');
    setNewProductBrand('all');
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const [deleteModalProduct, setDeleteModalProduct] = useState(null);
  const [isDeletingModal, setIsDeletingModal] = useState(false);

  const handleDeleteConfirm = (product, catSlug) => {
    setDeleteModalProduct({
      ...product,
      categorySlug: catSlug || product.categorySlug || 'toilets'
    });
  };

  const handleBulkDeleteConfirm = () => {
    if (selectedIds.size === 0) return;
    const count = selectedIds.size;
    confirmAction({
      title: `Delete ${count} Products`,
      message: `Are you sure you want to delete ${count} selected product${count !== 1 ? 's' : ''}? This action cannot be undone.`,
      confirmText: `Delete ${count} Products`,
      onConfirm: async () => {
        const idsArray = Array.from(selectedIds);
        await deleteProductsBulk(idsArray);
        setSelectedIds(new Set());
        addToast(`${count} products deleted successfully! 🗑️`, 'info');
      }
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === displayedProducts.length && displayedProducts.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(displayedProducts.map(p => p.id)));
    }
  };

  const toggleSelectProduct = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const exportToCSV = () => {
    const dataToExport = displayedProducts.map(p => ({
      ID: p.id,
      Name: `"${(p.name || '').replace(/"/g, '""')}"`,
      Category: `"${(p.categoryName || p.categorySlug || 'Sanitary').replace(/"/g, '""')}"`,
      Brand: `"${(p.brand || 'Unbranded').replace(/"/g, '""')}"`,
      ImageURL: `"${(p.image || '').replace(/"/g, '""')}"`
    }));

    const headers = ['ID', 'Name', 'Category', 'Brand', 'ImageURL'];
    const rows = dataToExport.map(item => headers.map(h => item[h]).join(','));
    const csvString = [headers.join(','), ...rows].join('\n');

    // Create Blob with UTF-8 BOM (\uFEFF) so Excel opens it with proper encoding
    const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `nauman_sanitary_products_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast(`Exported ${displayedProducts.length} products to CSV! 📊`, 'success');
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (activeCategorySlug === 'all' || newProductBrand === 'all') {
      addToast("Please select a specific Category and Brand!", 'error');
      return;
    }
    if (!newProductName || (!file && !editingProductId)) {
      addToast("Name, Brand, and Image are required!", 'error');
      return;
    }

    let imageUrl = undefined;
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const uploadRes = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: formData
        });
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      } catch (err) {
        console.error(err);
        addToast('Image upload failed!', 'error');
        return;
      }
    }

    if (editingProductId) {
      const oldProduct = categories.flatMap(c => c.products || []).find(p => p.id === editingProductId);
      const oldCat = categories.find(c => (c.products || []).some(p => p.id === editingProductId));
      const oldCatSlug = oldCat ? oldCat.slug : activeCategorySlug;
      
      const updateData = { name: newProductName, brand: newProductBrand };
      updateData.image = imageUrl || (oldProduct ? oldProduct.image : '');

      await updateProduct(oldCatSlug, activeCategorySlug, editingProductId, updateData);
      addToast(`Product "${newProductName}" updated successfully! ✏️`, 'success');
      handleCancelEdit();
    } else {
      const newProdName = newProductName;
      await addProduct(activeCategorySlug, {
        id: Date.now().toString(),
        name: newProductName,
        brand: newProductBrand,
        model: newProductName,
        tag: newProductBrand,
        image: imageUrl || ''
      });
      addToast(`Product "${newProdName}" added successfully! 🎉`, 'success');
      setNewProductName('');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (!categories || categories.length === 0) {
    return <div className="p-8">Loading Categories...</div>;
  }

  // Filter products by brand and search term
  const displayedProducts = (activeCategory?.products || []).filter(p => {
    const matchBrand = newProductBrand === 'all' || (p.brand || 'Unbranded') === newProductBrand;
    const matchSearch = !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase()) || (p.brand && p.brand.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchBrand && matchSearch;
  });

  // Pagination calculation
  const totalItems = displayedProducts.length;
  const effectivePageSize = pageSize === 'all' ? totalItems : pageSize;
  const totalPages = Math.ceil(totalItems / effectivePageSize) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  
  const paginatedProducts = pageSize === 'all' 
    ? displayedProducts 
    : displayedProducts.slice((safeCurrentPage - 1) * effectivePageSize, safeCurrentPage * effectivePageSize);

  return (
    <div className="bg-card border shadow-sm rounded-xl overflow-hidden flex flex-col min-h-[600px] relative">
      {/* Main Area: Product List for Active Category */}
      <div className="flex-1 flex flex-col">
        {activeCategory ? (
          <>
            <div className="p-6 border-b flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  {typeof activeCategory.icon === 'string' && (activeCategory.icon.startsWith('http') || activeCategory.icon.startsWith('/') || activeCategory.icon.startsWith('data:')) ? (
                    <img src={activeCategory.icon} alt="" className="w-6 h-6 object-contain" />
                  ) : (
                    <span>{activeCategory.icon}</span>
                  )}
                  {activeCategory.name}
                </h2>
                <p className="text-sm text-muted-foreground">{displayedProducts.length} products found in this view</p>
              </div>

              {/* Top Controls: Search + Select All + Export CSV */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search products by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-9 pl-9 pr-8 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <button
                  onClick={toggleSelectAll}
                  disabled={displayedProducts.length === 0}
                  className="h-9 px-3 bg-secondary text-secondary-foreground border rounded-lg text-sm font-medium hover:bg-secondary/80 flex items-center gap-1.5 whitespace-nowrap shadow-sm disabled:opacity-50"
                  title={selectedIds.size === displayedProducts.length ? 'Deselect All' : 'Select All Products for Bulk Action'}
                >
                  {selectedIds.size === displayedProducts.length && displayedProducts.length > 0 ? (
                    <>
                      <CheckSquare className="w-4 h-4 text-primary" />
                      <span>Bulk Action: Deselect All</span>
                    </>
                  ) : (
                    <>
                      <Square className="w-4 h-4 text-muted-foreground" />
                      <span>Bulk Action: Select All</span>
                    </>
                  )}
                </button>

                <button
                  onClick={exportToCSV}
                  disabled={displayedProducts.length === 0}
                  className="h-9 px-3 bg-secondary text-secondary-foreground border rounded-lg text-sm font-medium hover:bg-secondary/80 flex items-center gap-1.5 whitespace-nowrap shadow-sm disabled:opacity-50"
                  title="Export catalog to CSV spreadsheet"
                >
                  <Download className="w-4 h-4 text-emerald-600" /> Export CSV
                </button>
              </div>
            </div>
            
            {/* Add / Edit Product Form */}
            <div className="p-4 border-b bg-muted/10">
              <form onSubmit={handleAddProduct} className="flex flex-col xl:flex-row items-end gap-3">
                <div className="flex flex-col gap-1 w-full xl:w-1/5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-1">Category</label>
                  <select 
                    className="w-full h-9 px-3 rounded-md border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={activeCategorySlug || ''}
                    onChange={(e) => setActiveCategorySlug(e.target.value)}
                  >
                    <option value="all">All Categories ({totalAllProducts})</option>
                    {categories.map(cat => (
                      <option key={cat.id || cat.slug} value={cat.slug}>
                        {cat.name} ({cat.products?.length || 0})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex flex-col gap-1 w-full xl:w-1/5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-1">Brand Filter / Target</label>
                  <select 
                    required
                    className="w-full h-9 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={newProductBrand}
                    onChange={(e) => setNewProductBrand(e.target.value)}
                  >
                    <option value="all">All Brands</option>
                    {(brands || []).map(b => <option key={b.id || b.name} value={b.name}>{b.name}</option>)}
                    <option value="Unbranded">Unbranded</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1 flex-1 w-full">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-1">Product Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="E.g. Modern Commode" 
                    className="w-full h-9 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1 flex-1 w-full">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-1">Product Image</label>
                  <input 
                    required={!editingProductId}
                    type="file" 
                    accept="image/*"
                    ref={fileInputRef}
                    className="w-full h-9 px-3 py-1 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>

                {editingProductId ? (
                  <div className="flex gap-2 w-full xl:w-auto">
                    <button type="submit" className="h-9 px-4 flex-1 xl:flex-none bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 flex items-center justify-center gap-2 whitespace-nowrap shadow-sm">
                      <Edit className="h-4 w-4" /> Update
                    </button>
                    <button type="button" onClick={handleCancelEdit} className="h-9 px-4 flex-1 xl:flex-none bg-muted text-foreground rounded-md text-sm font-medium hover:bg-muted/80 flex items-center justify-center whitespace-nowrap">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button type="submit" className="h-9 px-4 w-full xl:w-auto bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 flex items-center justify-center gap-2 whitespace-nowrap shadow-sm">
                    <Plus className="h-4 w-4" /> Add Product
                  </button>
                )}
              </form>
            </div>

            {/* Bulk Actions Floating Bar */}
            {selectedIds.size > 0 && (
              <div className="bg-red-50 dark:bg-red-950/40 border-b border-red-200 dark:border-red-900/60 px-6 py-2.5 flex items-center justify-between animate-in fade-in">
                <div className="flex items-center gap-3 text-sm font-semibold text-red-800 dark:text-red-300">
                  <CheckSquare className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <span>Bulk Action — {selectedIds.size} of {displayedProducts.length} selected</span>
                  {selectedIds.size < displayedProducts.length && (
                    <button
                      onClick={toggleSelectAll}
                      className="text-xs bg-red-100 dark:bg-red-900/50 hover:bg-red-200 text-red-800 dark:text-red-200 px-2 py-0.5 rounded font-medium transition-colors border border-red-300 dark:border-red-700 ml-1"
                    >
                      Select All ({displayedProducts.length})
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedIds(new Set())}
                    className="text-xs text-muted-foreground hover:text-foreground font-medium underline"
                  >
                    Deselect All
                  </button>
                  <button
                    onClick={handleBulkDeleteConfirm}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete Selected ({selectedIds.size})
                  </button>
                </div>
              </div>
            )}

            {/* Table */}
            <div className="flex-1 overflow-auto">
              {displayedProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <div className="p-4 bg-muted/20 rounded-full mb-3 text-muted-foreground">
                    <PackageX className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-lg">No Products Found</h3>
                  <p className="text-sm text-muted-foreground max-w-sm mt-1 mb-4">
                    {searchTerm
                      ? `No products match "${searchTerm}". Try a different search term or reset filters.`
                      : 'No products available under the selected category or brand.'}
                  </p>
                  {(searchTerm || newProductBrand !== 'all' || activeCategorySlug !== 'all') && (
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setNewProductBrand('all');
                        setActiveCategorySlug('all');
                      }}
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 flex items-center gap-2 border shadow-sm"
                    >
                      <RefreshCw className="w-4 h-4" /> Reset Filters
                    </button>
                  )}
                </div>
              ) : (
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-muted sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-3 font-medium">Product Name</th>
                      <th className="px-6 py-3 font-medium">Image</th>
                      <th className="px-6 py-3 font-medium">Brand</th>
                      <th className="px-6 py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {paginatedProducts.map((product) => {
                      const isSelected = selectedIds.has(product.id);
                      return (
                        <tr
                          key={product.id || product.name}
                          className={`hover:bg-muted/30 transition-colors ${isSelected ? 'bg-primary/5' : ''}`}
                        >
                          <td className="px-6 py-3 font-medium">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => { e.stopPropagation(); toggleSelectProduct(product.id); }}
                                className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                                title={isSelected ? 'Deselect' : 'Select'}
                              >
                                {isSelected ? (
                                  <CheckSquare className="w-4 h-4 text-primary" />
                                ) : (
                                  <Square className="w-4 h-4 opacity-40 hover:opacity-100" />
                                )}
                              </button>
                              <span>{product.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-3">
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-10 h-10 object-cover rounded-md border bg-white cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => setQuickViewProduct(product)}
                                title="Click for Quick View"
                              />
                            ) : (
                              <span className="text-muted-foreground text-xs italic">No Image</span>
                            )}
                          </td>
                          <td className="px-6 py-3 text-muted-foreground">{product.brand || 'Unbranded'}</td>
                          <td className="px-6 py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => setQuickViewProduct(product)}
                                className="p-1.5 text-slate-500 hover:bg-slate-500/10 rounded-md transition-colors"
                                title="Quick View Product"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleEditClick(product, product.categorySlug || activeCategory.slug)}
                                className="p-1.5 text-blue-500 hover:bg-blue-500/10 rounded-md transition-colors"
                                title="Edit Product"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteConfirm(product, product.categorySlug || activeCategory.slug)}
                                className="p-1.5 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                                title="Delete Product"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination Controls Footer */}
            {displayedProducts.length > 0 && (
              <div className="p-4 border-t bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <div>
                    <span>Showing </span>
                    <span className="font-semibold text-foreground">
                      {pageSize === 'all'
                        ? `1 - ${totalItems}`
                        : `${(safeCurrentPage - 1) * effectivePageSize + 1} - ${Math.min(safeCurrentPage * effectivePageSize, totalItems)}`}
                    </span>
                    <span> of </span>
                    <span className="font-semibold text-foreground">{totalItems}</span>
                    <span> products</span>
                  </div>
                  <button
                    onClick={toggleSelectAll}
                    className="text-xs text-primary hover:underline font-medium border-l pl-3 border-border"
                  >
                    {selectedIds.size === displayedProducts.length && displayedProducts.length > 0
                      ? 'Deselect All'
                      : `Select All (${totalItems})`}
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  {/* Page Size Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">Per Page:</span>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        const val = e.target.value === 'all' ? 'all' : Number(e.target.value);
                        setPageSize(val);
                        setCurrentPage(1);
                      }}
                      className="h-8 px-2 rounded border bg-background text-xs font-medium focus:outline-none"
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                      <option value="all">All</option>
                    </select>
                  </div>

                  {/* Page Navigation */}
                  {pageSize !== 'all' && totalPages > 1 && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={safeCurrentPage === 1}
                        className="p-1.5 rounded border bg-background text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        title="Previous Page"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-semibold px-2">
                        Page {safeCurrentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={safeCurrentPage === totalPages}
                        className="p-1.5 rounded border bg-background text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        title="Next Page"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a category to view products
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 relative overflow-hidden">
            {/* Header / Close */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#c8a060]/20 text-[#c8a060] border border-[#c8a060]/40 rounded-full text-xs font-bold uppercase tracking-wider">
                  {quickViewProduct.categoryName || 'Sanitaryware'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Item
                </span>
              </div>
              <button
                onClick={() => setQuickViewProduct(null)}
                className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
                title="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              {/* Product Image */}
              {(() => {
                const imgSrc = quickViewProduct.image || getProductImage(quickViewProduct.categorySlug, quickViewProduct.name, quickViewProduct.brand) || '/prod-commode.png';
                return (
                  <div className="relative group shrink-0">
                    <img
                      src={imgSrc}
                      alt={quickViewProduct.name}
                      className="w-48 h-48 object-cover rounded-2xl border border-slate-700 bg-white p-2 shadow-xl"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/prod-commode.png';
                      }}
                    />
                  </div>
                );
              })()}

              {/* Product Metadata */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-black text-white leading-snug tracking-tight">{quickViewProduct.name}</h2>
                  <p className="text-xs text-slate-400 mt-1">Nauman Sanitary Store Official Catalog Item</p>
                </div>

                <div className="bg-slate-850/80 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-slate-400 font-medium">Brand</span>
                    <span className="px-2.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-md font-semibold">
                      {quickViewProduct.brand || 'Unbranded'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-slate-400 font-medium">Category</span>
                    <span className="font-semibold text-slate-200">{quickViewProduct.categoryName || 'Sanitary'}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-slate-400 font-medium">Product ID</span>
                    <span className="font-mono text-[11px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 border border-slate-700">{quickViewProduct.id}</span>
                  </div>
                  <div className="flex justify-between items-center pt-0.5">
                    <span className="text-slate-400 font-medium">Pricing</span>
                    <span className="text-emerald-400 font-bold">Contact for Quote</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      const prod = quickViewProduct;
                      setQuickViewProduct(null);
                      handleEditClick(prod, prod.categorySlug);
                    }}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-blue-950/50"
                  >
                    <Edit className="w-4 h-4" /> Edit Product
                  </button>
                  <button
                    onClick={() => {
                      const prod = quickViewProduct;
                      setQuickViewProduct(null);
                      handleDeleteConfirm(prod, prod.categorySlug);
                    }}
                    className="py-2.5 px-4 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                    title="Delete Product"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editModalProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-background border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 relative">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 text-primary font-bold text-lg">
                <Edit className="w-5 h-5" />
                <span>Edit Product</span>
              </div>
              <button
                onClick={() => setEditModalProduct(null)}
                className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleModalEditSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</label>
                  <select
                    required
                    value={editModalProduct.categorySlug}
                    onChange={(e) => setEditModalProduct({ ...editModalProduct, categorySlug: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {categories.map(cat => (
                      <option key={cat.id || cat.slug} value={cat.slug}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Brand</label>
                  <select
                    required
                    value={editModalProduct.brand}
                    onChange={(e) => setEditModalProduct({ ...editModalProduct, brand: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {(brands || []).map(b => <option key={b.id || b.name} value={b.name}>{b.name}</option>)}
                    <option value="Unbranded">Unbranded</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product Name</label>
                <input
                  required
                  type="text"
                  value={editModalProduct.name}
                  onChange={(e) => setEditModalProduct({ ...editModalProduct, name: e.target.value })}
                  placeholder="Product Name"
                  className="w-full h-10 px-3 rounded-lg border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product Image</label>
                <div className="flex items-center gap-3">
                  {editModalProduct.image ? (
                    <img src={editModalProduct.image} alt="" className="w-12 h-12 object-cover rounded-lg border bg-white shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-muted border flex items-center justify-center text-xs text-muted-foreground shrink-0">No Img</div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditModalFile(e.target.files[0])}
                    className="w-full text-xs file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  />
                </div>
                <p className="text-[11px] text-muted-foreground italic mt-0.5">Leave image empty to keep current picture.</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditModalProduct(null)}
                  className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingModal}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold flex items-center gap-1.5 shadow-md disabled:opacity-50 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  {isSubmittingModal ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteModalProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-background border border-red-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 relative">
            <button
              onClick={() => setDeleteModalProduct(null)}
              className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-bold text-foreground">Delete Product</h3>
                <p className="text-sm text-muted-foreground">
                  Are you sure you want to delete <strong className="text-foreground">{deleteModalProduct.name}</strong>?
                </p>
              </div>
            </div>

            {(() => {
              const imgSrc = deleteModalProduct.image || getProductImage(deleteModalProduct.categorySlug, deleteModalProduct.name, deleteModalProduct.brand) || '/prod-commode.png';
              return (
                <div className="flex items-center gap-3.5 p-3.5 bg-muted/40 border rounded-xl shadow-inner">
                  <img
                    src={imgSrc}
                    alt={deleteModalProduct.name}
                    className="w-16 h-16 object-cover rounded-xl border bg-white shrink-0 shadow-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/prod-commode.png';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-foreground truncate">{deleteModalProduct.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Brand: <span className="font-semibold text-foreground">{deleteModalProduct.brand || 'Unbranded'}</span></div>
                    <div className="text-[11px] text-muted-foreground/80 font-mono mt-0.5">ID: {deleteModalProduct.id}</div>
                  </div>
                </div>
              );
            })()}

            <p className="text-xs text-red-500 font-medium">⚠️ This action is permanent and cannot be undone.</p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setDeleteModalProduct(null)}
                className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeletingModal}
                onClick={async () => {
                  setIsDeletingModal(true);
                  try {
                    await deleteProduct(deleteModalProduct.categorySlug, deleteModalProduct.id);
                    addToast(`Product "${deleteModalProduct.name}" deleted! 🗑️`, 'info');
                    setDeleteModalProduct(null);
                    setQuickViewProduct(null);
                  } catch (err) {
                    console.error(err);
                    addToast('Failed to delete product!', 'error');
                  } finally {
                    setIsDeletingModal(false);
                  }
                }}
                className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-semibold flex items-center gap-1.5 shadow-md disabled:opacity-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                {isDeletingModal ? 'Deleting...' : 'Yes, Delete Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
