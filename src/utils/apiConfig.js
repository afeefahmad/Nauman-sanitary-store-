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

  // Handle base64 data URIs or external absolute URLs (non-local)
  if (url.startsWith('data:') || (url.startsWith('http') && !url.includes(':5000/uploads/'))) {
    return url;
  }

  // Extract relative upload path
  let uploadPath = url;
  if (url.includes('/uploads/')) {
    uploadPath = `/uploads/${url.split('/uploads/')[1]}`;
  } else if (url.startsWith('uploads/')) {
    uploadPath = `/${url}`;
  }

  if (uploadPath.startsWith('/uploads/')) {
    if (typeof window !== 'undefined' && window.location && window.location.hostname) {
      return `http://${window.location.hostname}:5000${uploadPath}`;
    }
    return `http://localhost:5000${uploadPath}`;
  }

  return url;
}
