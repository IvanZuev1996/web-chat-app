import { StateSchema } from '@/app/providers/StoreProvider';

export const getLastMessageId = (state: StateSchema) =>
    state.mainPage.lastMessageId;

export const getMainPageIsLoading = (state: StateSchema) =>
    state.mainPage.isLoading;

export const getMainPageHasMore = (state: StateSchema) =>
    state.mainPage.hasMore;

export const getMainPageNewPartInited = (state: StateSchema) =>
    state.mainPage.isNewPartInited;
