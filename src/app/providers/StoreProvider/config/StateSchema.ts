import { AxiosInstance } from 'axios';

import { CounterSchema } from '@/entities/Counter';

export interface StateSchema {
    counter: CounterSchema;
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
