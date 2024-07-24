import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:3001',
});


instance.interceptors.request.use(config => {
    const token = localStorage.getItem('JWTtoken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default instance;