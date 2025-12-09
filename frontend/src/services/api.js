import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses and errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// API methods
const api = {
  // Orders
  createOrder: (formData) => apiClient.post('/orders', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  
  getOrder: (orderId) => apiClient.get(`/orders/${orderId}`),
  
  getAllOrders: () => apiClient.get('/orders'),
  
  uploadOrderPdf: (orderId, formData) => apiClient.post(`/orders/${orderId}/upload-pdf`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),

  // Admin
  adminLogin: (credentials) => apiClient.post('/admin/login', credentials),
};

export default api;