import { KeyboardEvent } from 'react';

export const handleKeyPress =
    (callback: () => void) => (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            callback();
        }
    };
