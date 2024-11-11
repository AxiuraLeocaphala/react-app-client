import axios from 'axios';
import { getCookie } from '../../other/cookie';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:3002',
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