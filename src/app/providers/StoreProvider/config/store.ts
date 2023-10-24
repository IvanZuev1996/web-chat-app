import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { $api } from 'shared/api/api';

import { counterReducer } from '@/entities/Counter';

import { StateSchema, ThunkExtraArg } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
    const rootReducer: ReducersMapObject<StateSchema> = {
        counter: counterReducer
    };

    const extraArg: ThunkExtraArg = {
        api: $api
    };

    const store = configureStore({
        reducer: rootReducer,
        devTools: false,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ thunk: { extraArgument: extraArg } })
    });

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
