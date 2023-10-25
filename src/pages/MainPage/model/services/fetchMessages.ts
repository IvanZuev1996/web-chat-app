import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { MessageType } from '@/entities/Message';

export const fetchMessages = createAsyncThunk<
    MessageType[],
    void,
    ThunkConfig<string>
>('mainPage/fetchMessages', async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<MessageType[]>('/messages');

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
