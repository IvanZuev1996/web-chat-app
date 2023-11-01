import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import {
    getMainPageHasMore,
    getMainPageIsLoading
} from '../selectors/mainPage';
import { mainPageActions } from '../slice/mainPageSlice';

import { fetchMessages } from './fetchMessages';

export const fetchNextMessagesPart = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('mainPage/fetchNextMessagesPart', async (_, thunkApi) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkApi;
    const isLoading = getMainPageIsLoading(getState());
    const hasMore = getMainPageHasMore(getState());

    if (hasMore && !isLoading) {
        dispatch(mainPageActions.setIsNewPartInited());
        dispatch(fetchMessages());
    }
});
