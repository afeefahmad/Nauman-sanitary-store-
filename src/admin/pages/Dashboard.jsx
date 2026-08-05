import { useCatalog } from '../../context/CatalogContext';
import { Package, FolderTree, Tags, TrendingUp, Plus, ArrowRight, Layers, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { categories, brands } = useCatalog();

  const totalCategories = categories.length;
  const totalProducts = categories.reduce((sum, cat) => sum + (cat.products?.length || 0), 0);
  const totalBrands = brands?.length || 12;

  // Flatten products and pick the recent ones
  const allProducts = categories.flatMap(c => 
    (c.products || []).map(p => ({ ...p, categoryName: c.name, categorySlug: c.slug }))
  );
  const recentProducts = allProducts.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Quick Action Bar */}
      <div className="bg-card rounded-xl border shadow-sm p-6">
        <h3 className="font-bold text-lg tracking-tight mb-3 text-foreground">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/categories"
            className="px-4 py-2.5 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add / Manage Products
          </Link>
          <Link
            to="/admin/brands"
            className="px-4 py-2.5 bg-secondary text-secondary-foreground font-medium text-sm rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-2 border"
          >
            <Tags className="w-4 h-4" /> Manage Brands
          </Link>
          <Link
            to="/admin/hero"
            className="px-4 py-2.5 bg-secondary text-secondary-foreground font-medium text-sm rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-2 border"
          >
            <Layers className="w-4 h-4" /> Shop by Category
          </Link>
          <Link
            to="/admin/ticker"
            className="px-4 py-2.5 bg-secondary text-secondary-foreground font-medium text-sm rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-2 border"
          >
            <Megaphone className="w-4 h-4" /> Announcements
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {/* Card 1 */}
        <div className="bg-card rounded-xl border shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground tracking-tight">Total Products</h3>
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Package className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold">{totalProducts}</p>
            <p className="text-xs text-green-600 mt-1 flex items-center font-medium">
              <TrendingUp className="h-3.5 w-3.5 mr-1" /> Active in Storefront Catalog
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-card rounded-xl border shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground tracking-tight">Total Categories</h3>
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
              <FolderTree className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold">{totalCategories}</p>
            <p className="text-xs text-muted-foreground mt-1">Organized Category Collections</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-card rounded-xl border shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground tracking-tight">Active Brands</h3>
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
              <Tags className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold">{totalBrands}</p>
            <p className="text-xs text-muted-foreground mt-1">Partner & In-house Brands</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-card rounded-xl border shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg tracking-tight">Category Breakdown</h3>
            <span className="text-xs font-medium text-muted-foreground">{totalCategories} Categories</span>
          </div>
          <div className="space-y-3 flex-1 overflow-auto max-h-[350px] pr-1">
            {categories.map((cat) => {
              const count = cat.products?.length || 0;
              const pct = totalProducts > 0 ? Math.round((count / totalProducts) * 100) : 0;
              return (
                <div key={cat.id || cat.slug} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="flex items-center gap-2 truncate">
                      <span>{typeof cat.icon === 'string' && cat.icon.length <= 4 ? cat.icon : '🚽'}</span>
                      <span className="truncate">{cat.name}</span>
                    </span>
                    <span className="text-muted-foreground shrink-0 pl-2">{count} items ({pct}%)</span>
                  </div>
                  <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(pct, 3)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-card rounded-xl border shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg tracking-tight">Catalog Highlights</h3>
            <Link to="/admin/categories" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y overflow-auto max-h-[350px]">
            {recentProducts.map((product) => (
              <div key={product.id || product.name} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                <div className="flex items-center gap-3 min-w-0">
                  {product.image ? (
                    <img src={product.image} alt="" className="w-9 h-9 object-cover rounded-lg border bg-white shrink-0" />
                  ) : (
                    <div className="w-9 h-9 rounded-lg border bg-muted/20 flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                      PRD
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{product.categoryName} • {product.brand || 'Unbranded'}</p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 bg-muted/40 text-muted-foreground rounded-full font-medium shrink-0 ml-2">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
