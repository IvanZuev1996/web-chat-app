import axios from 'axios';

import { USER_LOCALSTORAGE_KEY } from '../consts/localStorage';

export const $api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.authorization = encodeURIComponent(
            localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''
        );
    }

    return config;
});
