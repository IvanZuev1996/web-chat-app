import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localStorage';

import { fetchUserData } from '../services/fetchUserData';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {
    _inited: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                state.authData = JSON.parse(user);
            }
            state._inited = true;
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchUserData.fulfilled,
            (state, action: PayloadAction<User>) => {
                state.authData = action.payload;
                localStorage.removeItem(USER_LOCALSTORAGE_KEY);
                localStorage.setItem(
                    USER_LOCALSTORAGE_KEY,
                    JSON.stringify(action.payload)
                );
            }
        );
    }
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
