import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.API_BASE_URL || 'http://localhost:3333',
    withCredentials: true, // Enviar cookies em requisições cross-origin
});