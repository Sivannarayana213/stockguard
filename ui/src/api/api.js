import axios from "axios";


const api = axios.create({
  baseURL: "https://stockguard-production-19c2.up.railway.app",
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const urlParams = new URLSearchParams(window.location.search);
  const shop = urlParams.get("shop");
  
  if (shop && !config.params.shop) {
    config.params.shop =shop;
  }
  return config;
});

export default api;
