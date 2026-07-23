import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
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

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Cursor />
        <Navbar />
        <main>
          <Routes>
            <Route path="/"                   element={<Home />} />
            <Route path="/category/:slug"     element={<CategoryPage />} />
            <Route path="*"                   element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}
