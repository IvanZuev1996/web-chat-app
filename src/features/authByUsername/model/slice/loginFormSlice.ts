import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authByUsername } from '../services/authByUsername';
import { LoginFormSchema } from '../types/loginFormSchema';

const initialState: LoginFormSchema = {
    name: '',
    error: '',
    isLoading: false
};

export const loginFormSlice = createSlice({
    name: 'loginFormSlice',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authByUsername.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(authByUsername.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
            })
            .addCase(authByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { actions: loginFormActions } = loginFormSlice;
export const { reducer: loginFormReducer } = loginFormSlice;
