import { MessageType } from '@/entities/Message';
import { rtkApi } from '@/shared/api/rtkApi';

const mainPageApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getMessages: build.query<MessageType[], null>({
            query: () => ({
                url: '/messages'
            })
        })
    })
});

export const useMessages = mainPageApi.useGetMessagesQuery;
