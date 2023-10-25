import { StateSchema } from '@/app/providers/StoreProvider';

export const getCounterState = (state: StateSchema) => state.counter.count;
