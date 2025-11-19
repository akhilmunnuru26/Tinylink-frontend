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
  const url = API_URL+'/api/links';
  const response = await api.post(url, {
    target_url: targetUrl,
    custom_code: customCode,
  });
  return response.data;
};

// Get all links
export const getAllLinks = async () => {
  const url = API_URL+'/api/links';
  const response = await api.get(url);
  return response.data;
};

// Get link stats
export const getLinkStats = async (code) => {
 const url = API_URL+`/api/links/${code}`;
  const response = await api.get(url);
  return response.data;
};

// Delete link
export const deleteLink = async (code) => {
  const url = API_URL+`/api/links/${code}`;
  const response = await api.delete(url);
  return response.data;
};

// Health check
export const healthCheck = async () => {
  const url = API_URL+'/healthz';
  const response = await api.get(url);
  return response.data;
};

export default api;
