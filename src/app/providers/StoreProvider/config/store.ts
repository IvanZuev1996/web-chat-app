import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { $api } from 'shared/api/api';

import { counterReducer } from '@/entities/Counter';
import { userReducer } from '@/entities/User';
import { addMessageFormReducer } from '@/features/addMessageForm';
import { mainPageReducer } from '@/pages/MainPage';
import { rtkApi } from '@/shared/api/rtkApi';

import { StateSchema, ThunkExtraArg } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
    const rootReducer: ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        user: userReducer,
        addMessageForm: addMessageFormReducer,
        mainPage: mainPageReducer,
        [rtkApi.reducerPath]: rtkApi.reducer
    };

    const extraArg: ThunkExtraArg = {
        api: $api
    };

    const store = configureStore({
        reducer: rootReducer,
        devTools: true,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ thunk: { extraArgument: extraArg } }).concat(
                rtkApi.middleware
            )
    });

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
