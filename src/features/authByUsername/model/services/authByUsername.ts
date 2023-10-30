import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { ErrorType, ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';

export const authByUsername = createAsyncThunk<
    User,
    string,
    ThunkConfig<string>
>('loginForm/authByUsername', async (name, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    try {
        const response: AxiosResponse<User> = await extra.api.post('/auth', {
            name
        });

        if (!response.data) {
            throw new Error();
        }

        dispatch(userActions.setAuthData(response.data));

        return response.data;
    } catch (e) {
        let message: string = '';

        if (axios.isAxiosError(e)) {
            const error: AxiosError<ErrorType> = e;
            message = error.response?.data.error || '';
        }

        return rejectWithValue(message);
    }
});
