import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CounterSchema } from '../types/counterSchema';

const initialState: CounterSchema = {
    count: 0
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setCount: (state, action: PayloadAction<number>) => {
            state.count = action.payload;
        }
    }
});

export const { actions: counterActions } = counterSlice;
export const { reducer: counterReducer } = counterSlice;
