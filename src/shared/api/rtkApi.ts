import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localStorage';

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api',
        prepareHeaders(headers) {
            const token = encodeURIComponent(
                localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''
            );
            if (token) {
                headers.set('Authorization', token);
            }
            return headers;
        }
    }),

    endpoints: (builder) => ({})
});
