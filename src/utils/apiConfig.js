export const getApiBase = () => {
  if (typeof window !== 'undefined' && window.location && window.location.hostname) {
    const host = window.location.hostname;
    return `http://${host}:5000/api`;
  }
  return 'http://localhost:5000/api';
};

export const API_BASE = getApiBase();

export function formatImgUrl(url) {
  if (!url || typeof url !== 'string') return url;

  if (url.startsWith('data:')) return url;

  // Cloudflare R2 or external CDN URLs
  if (url.startsWith('http') && !url.includes('localhost') && !url.includes('127.0.0.1')) {
    return url;
  }

  // Clean local/relative upload path so mobile devices on network resolve relative to host origin
  if (url.includes('/uploads/')) {
    return `/uploads/${url.split('/uploads/')[1]}`;
  }
  if (url.startsWith('uploads/')) {
    return `/${url}`;
  }

  return url;
}
