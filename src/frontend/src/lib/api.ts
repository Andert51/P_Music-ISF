import axios from 'axios'

// import.meta.env puede no estar tipado en este proyecto TS; casteamos a any para evitar errores
const API_URL = (import.meta as any)?.env?.VITE_API_URL || 'http://localhost:8001'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Añadir token automáticamente si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sprint1_token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
