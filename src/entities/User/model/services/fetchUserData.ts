import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { User } from '../types/user';

export const fetchUserData = createAsyncThunk<
    User,
    string,
    ThunkConfig<string>
>('user/fetchUserData', async (userId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response: AxiosResponse<User> = await extra.api.get(
            `api/users/${userId}`
        );

        if (!response.data) {
            throw new Error(response.data);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
