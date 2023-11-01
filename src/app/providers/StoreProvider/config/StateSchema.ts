import { AxiosInstance } from 'axios';

import { UserSchema } from '@/entities/User';
import { AddMessageFormSchema } from '@/features/addMessageForm';
import { AddUserModalSchema } from '@/features/addUserModal/model/types/addUserModalSchema';
import { LoginFormSchema } from '@/features/authByUsername';
import { MainPageSchema } from '@/pages/MainPage';
import { rtkApi } from '@/shared/api/rtkApi';

export interface StateSchema {
    user: UserSchema;
    addMessageForm: AddMessageFormSchema;
    mainPage: MainPageSchema;
    loginForm: LoginFormSchema;
    addUserModal: AddUserModalSchema;
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

export interface ErrorType {
    error: string;
}
