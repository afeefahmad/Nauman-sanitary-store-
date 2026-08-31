export const getApiBase = () => {
  if (typeof window !== 'undefined' && window.location && window.location.hostname) {
    const host = window.location.hostname;
    return `http://${host}:5000/api`;
  }
  return 'http://localhost:5000/api';
};

export const API_BASE = getApiBase();
