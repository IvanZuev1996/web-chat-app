export { MainPageAsync as MainPage } from './ui/MainPage.async';
export type { MainPageSchema } from './model/types/mainPageSchema';
export { mainPageReducer } from './model/slice/mainPageSlice';
export {
    getLastMessageId,
    getMainPageHasMore,
    getMainPageIsLoading,
    getMainPageNewPartInited
} from './model/selectors/mainPage';
