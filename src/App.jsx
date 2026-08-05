import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CatalogProvider } from './context/CatalogContext';
import Cursor   from './components/Cursor';
import Navbar   from './components/Navbar';
import Footer   from './components/Footer';
import Home     from './pages/Home';
import CategoryPage from './pages/CategoryPage';

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page not found</p>
      <a href="/" className="btn-primary mt-4">Go Home</a>
    </div>
  );
}

import { Outlet } from 'react-router-dom';
import AdminLayout from './admin/layouts/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import Login from './admin/pages/Login';
import ManageCategories from './admin/pages/ManageCategories';
import ContentManagement from './admin/pages/ContentManagement';

import { ToastProvider } from './context/ToastContext';
import { InquiryProvider } from './context/InquiryContext';
import InquiryDrawer from './components/InquiryDrawer';

function PublicLayout() {
  return (
    <div className="marketing-site">
      <Cursor />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <InquiryDrawer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CatalogProvider>
        <InquiryProvider>
          <ToastProvider>
          <BrowserRouter>
            <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="categories" element={<ManageCategories />} />
              <Route path="ticker" element={<ContentManagement />} />
              <Route path="stats" element={<ContentManagement />} />
              <Route path="contact" element={<ContentManagement />} />
              <Route path="brands" element={<ContentManagement />} />
              <Route path="hero" element={<ContentManagement />} />
            </Route>
          </Routes>
          </BrowserRouter>
        </ToastProvider>
      </InquiryProvider>
    </CatalogProvider>
    </ThemeProvider>
  );
}
