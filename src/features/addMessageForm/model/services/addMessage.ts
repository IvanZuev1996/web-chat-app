import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { MessageType } from '@/entities/Message';
import { getUserAuthData } from '@/entities/User';

export const addMessage = createAsyncThunk<
    MessageType,
    MessageType | undefined,
    ThunkConfig<string>
>('addMessageForm/addMessage', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const user = getUserAuthData(getState());

    try {
        const response: AxiosResponse<MessageType> = await extra.api.post(
            '/messages',
            { ...props, user }
        );

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
