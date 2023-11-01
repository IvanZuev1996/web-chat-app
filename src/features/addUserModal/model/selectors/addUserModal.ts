import { StateSchema } from '@/app/providers/StoreProvider';

export const getAddUserModalName = (state: StateSchema) =>
    state.addUserModal.name;
export const getAddUserModalIsLoading = (state: StateSchema) =>
    state.addUserModal.isLoading;
export const getAddUserModalIsSuccess = (state: StateSchema) =>
    state.addUserModal.isSuccess;
export const getAddUserModalError = (state: StateSchema) =>
    state.addUserModal.error;
