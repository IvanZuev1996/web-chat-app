import { StateSchema } from '@/app/providers/StoreProvider';

export const getAddMessageFromText = (state: StateSchema) =>
    state.addMessageForm.message;
