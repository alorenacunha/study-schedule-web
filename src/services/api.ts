import axios from 'axios';

const { REACT_APP_BASE_URL } = process.env;

const api = axios.create({
  baseURL: REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@bops:token');
  config.headers = {
    Authorization: token ? `Bearer ${token}` : '',
  };
  return config;
});

export default api;
