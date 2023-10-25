import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AddMessageFormSchema } from '../types/AddMessageFormSchema';

const initialState: AddMessageFormSchema = {
    message: ''
};

export const addMessageFormSlice = createSlice({
    name: 'addMessageFormSlice',
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        }
    }
});

export const { actions: addMessageFormActions } = addMessageFormSlice;
export const { reducer: addMessageFormReducer } = addMessageFormSlice;
