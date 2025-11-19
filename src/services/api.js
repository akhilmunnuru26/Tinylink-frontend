// src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create short link
export const createLink = async (targetUrl, customCode = '') => {
  const response = await api.post('/api/links', {
    target_url: targetUrl,
    custom_code: customCode,
  });
  return response.data;
};

// Get all links
export const getAllLinks = async () => {
  const response = await api.get('/api/links');
  return response.data;
};

// Get link stats
export const getLinkStats = async (code) => {
  const response = await api.get(`/api/links/${code}`);
  return response.data;
};

// Delete link
export const deleteLink = async (code) => {
  const response = await api.delete(`/api/links/${code}`);
  return response.data;
};

// Health check
export const healthCheck = async () => {
  const response = await api.get('/healthz');
  return response.data;
};

export default api;
