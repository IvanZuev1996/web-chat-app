import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { addUser } from '../services/addUser';
import { AddUserModalSchema } from '../types/addUserModalSchema';

const initialState: AddUserModalSchema = {
    name: '',
    error: '',
    isSuccess: false,
    isLoading: false
};

export const addUserModalSlice = createSlice({
    name: 'addUserModalSlice',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUser.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(addUser.fulfilled, (state) => {
                state.isLoading = false;
                state.error = undefined;
                state.isSuccess = true;
            })
            .addCase(addUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { actions: addUserModalActions } = addUserModalSlice;
export const { reducer: addUserModalReducer } = addUserModalSlice;
