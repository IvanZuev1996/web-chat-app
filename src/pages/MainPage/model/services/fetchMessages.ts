import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { MessageType } from '@/entities/Message';

import { getLastMessageId } from '../selectors/mainPage';
import { mainPageActions } from '../slice/mainPageSlice';

export const fetchMessages = createAsyncThunk<
    MessageType[],
    void,
    ThunkConfig<string>
>('mainPage/fetchMessages', async (_, thunkApi) => {
    const { extra, rejectWithValue, dispatch, getState } = thunkApi;
    const lastMessageId = getLastMessageId(getState());

    try {
        const response = await extra.api.get<MessageType[]>('/messages', {
            params: {
                lastMessageId,
                limit: 50
            }
        });

        if (!response.data) {
            throw new Error();
        }

        if (response.data.length) {
            dispatch(mainPageActions.setLastMessageId(response.data[0].id));
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
