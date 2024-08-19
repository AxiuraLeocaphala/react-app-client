import axios from 'axios';
import { getCookie } from './cookie';

const instance = axios.create({
    baseURL: '/product-api',
});

instance.interceptors.request.use(config => {
    const token = getCookie('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default instance;