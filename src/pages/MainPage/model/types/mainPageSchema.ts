import { EntityState } from '@reduxjs/toolkit';

import { MessageType } from '@/entities/Message';

export interface MainPageSchema extends EntityState<MessageType> {
    error?: string;
    isLoading?: boolean;
}
