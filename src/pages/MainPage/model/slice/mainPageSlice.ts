import {
    createEntityAdapter,
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';
import { MessageType } from '@/entities/Message';

import { fetchMessages } from '../services/fetchMessages';
import { MainPageSchema } from '../types/mainPageSchema';

const messagesAdapter = createEntityAdapter<MessageType>({
    selectId: (message) => message.id
});

export const getMessages = messagesAdapter.getSelectors<StateSchema>(
    (state) => state.mainPage || messagesAdapter.getInitialState()
);

const mainPageSlice = createSlice({
    name: 'mainPageSlice',
    initialState: messagesAdapter.getInitialState<MainPageSchema>({
        isLoading: false,
        error: undefined,
        entities: {},
        ids: []
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchMessages.fulfilled,
                (state, action: PayloadAction<MessageType[]>) => {
                    state.isLoading = false;
                    messagesAdapter.setAll(state, action.payload);
                }
            )
            .addCase(fetchMessages.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { reducer: mainPageReducer } = mainPageSlice;
