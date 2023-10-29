import { AxiosInstance } from 'axios';

import { CounterSchema } from '@/entities/Counter';
import { UserSchema } from '@/entities/User';
import { AddMessageFormSchema } from '@/features/addMessageForm';
import { LoginFormSchema } from '@/features/authByUsername';
import { MainPageSchema } from '@/pages/MainPage';
import { rtkApi } from '@/shared/api/rtkApi';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    addMessageForm: AddMessageFormSchema;
    mainPage: MainPageSchema;
    loginForm: LoginFormSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
}

export type StateSchemaKey = keyof StateSchema;

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
