import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:2000',
    withCredentials: true, // Enviar cookies em requisições cross-origin
});