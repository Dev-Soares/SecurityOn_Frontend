import { api } from '@/api/axios';


api.interceptors.response.use(
    response => response,
    error => {  
        if (error.response && error.response.status === 403) {
            // Redirecionar para a página de login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);