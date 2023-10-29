import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoginFormName = (state: StateSchema) => state.loginForm.name;
export const getLoginFormIsLoading = (state: StateSchema) =>
    state.loginForm.isLoading;
export const getLoginFormError = (state: StateSchema) => state.loginForm.error;
