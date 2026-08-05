import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export default function AdminLayout() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      {/* Sidebar - Dark Mode */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col p-4 shrink-0 shadow-xl z-20">
        <div className="mb-8 px-2">
          <h2 className="text-xl font-bold tracking-tight text-white">Admin Portal</h2>
        </div>
        <nav className="flex-1 space-y-2">
          <Link 
            to="/admin" 
            className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${path === '/admin' ? 'bg-[#c8a060]/15 text-[#c8a060]' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/admin/categories" 
            className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${path.startsWith('/admin/categories') ? 'bg-[#c8a060]/15 text-[#c8a060]' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            Products
          </Link>
          <Link 
            to="/admin/hero" 
            className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${path.startsWith('/admin/hero') ? 'bg-[#c8a060]/15 text-[#c8a060]' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            Shop by Category
          </Link>
          <Link 
            to="/admin/brands" 
            className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${path.startsWith('/admin/brands') ? 'bg-[#c8a060]/15 text-[#c8a060]' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            Brands
          </Link>
          <Link 
            to="/admin/ticker" 
            className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${path.startsWith('/admin/ticker') ? 'bg-[#c8a060]/15 text-[#c8a060]' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            Announcements
          </Link>
          <Link 
            to="/admin/stats" 
            className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${path.startsWith('/admin/stats') ? 'bg-[#c8a060]/15 text-[#c8a060]' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            Statistics
          </Link>
        </nav>
        <div className="mt-auto">
          <Link to="/" className="block px-4 py-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors rounded-md text-sm font-medium">Exit Admin</Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Dark */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center px-8 shrink-0 shadow-sm z-10">
          <h1 className="text-lg font-semibold text-slate-200">Admin Workspace</h1>
        </header>
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
