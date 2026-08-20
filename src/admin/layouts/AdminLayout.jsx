import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();
  const path = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden">
      {/* Mobile Sidebar Overlay Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-slate-900 text-slate-300 flex flex-col p-4 shrink-0 shadow-xl z-50 transform transition-transform duration-300 lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-8 px-2 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-white">Admin Portal</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
            title="Close Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-2">
          <Link 
            to="/admin" 
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${path === '/admin' ? 'bg-[#c8a060]/15 text-[#c8a060]' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/admin/categories" 
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${path.startsWith('/admin/categories') ? 'bg-[#c8a060]/15 text-[#c8a060]' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            Products
          </Link>
          <Link 
            to="/admin/hero" 
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${path.startsWith('/admin/hero') ? 'bg-[#c8a060]/15 text-[#c8a060]' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            Shop by Category
          </Link>
          <Link 
            to="/admin/brands" 
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${path.startsWith('/admin/brands') ? 'bg-[#c8a060]/15 text-[#c8a060]' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            Brands
          </Link>
          <Link 
            to="/admin/ticker" 
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${path.startsWith('/admin/ticker') ? 'bg-[#c8a060]/15 text-[#c8a060]' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            Announcements
          </Link>
          <Link 
            to="/admin/stats" 
            onClick={() => setIsOpen(false)}
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
      <main className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Header - Dark */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 sm:px-8 shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-1.5 -ml-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-slate-200">Admin Workspace</h1>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-4 sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
