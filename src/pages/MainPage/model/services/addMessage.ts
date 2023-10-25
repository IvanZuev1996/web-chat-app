import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { MessageType } from '@/entities/Message';
import { getUserAuthData } from '@/entities/User';

export const addMessage = createAsyncThunk<
    MessageType,
    string,
    ThunkConfig<string>
>('addMessageForm/addMessage', async (text, thunkApi) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkApi;
    const user = getUserAuthData(getState());

    try {
        const response: AxiosResponse<MessageType> = await extra.api.post(
            '/messages',
            {
                userId: user?.id,
                text
            }
        );

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
