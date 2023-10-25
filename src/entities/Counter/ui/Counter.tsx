import { Button } from '@mui/base';
import React from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { getCounterState } from '../model/selectors/counter';
import { counterActions } from '../model/slice/counterSlice';

export const Counter = () => {
    const dispatch = useAppDispatch();
    const count = useSelector(getCounterState);

    const changeCount = () => {
        dispatch(counterActions.setCount(count + 1));
    };

    return (
        <div>
            <div>{count}</div>
            <Button onClick={changeCount}>+1</Button>
        </div>
    );
};
