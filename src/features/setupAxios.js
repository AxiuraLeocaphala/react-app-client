import axios from 'axios';
import { getCookie } from '../utils/cookie';

const mAxios = axios.create({
    baseURL: 'http://127.0.0.1:3002',
});

mAxios.interceptors.request.use(config => {
    const token = getCookie('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default mAxios;