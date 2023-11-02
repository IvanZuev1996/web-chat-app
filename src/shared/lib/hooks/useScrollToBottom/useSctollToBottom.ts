import { RefObject, useCallback } from 'react';

export const useScrollToBottom = (container: RefObject<HTMLDivElement>) => {
    const scrollToBottom = useCallback(() => {
        if (container.current) {
            container.current.scrollTop = container.current.scrollHeight;
        }
    }, [container]);

    return { scrollToBottom };
};
