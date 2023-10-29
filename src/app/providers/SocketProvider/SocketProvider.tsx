import { ReactNode, useMemo, useState } from 'react';
import { Socket } from 'socket.io-client';

import {
    SocketContext,
    SocketContextProps
} from '@/shared/lib/context/SocketContext';

interface SocketProviderProps {
    children: ReactNode;
}

const SocketProvider = (props: SocketProviderProps) => {
    const { children } = props;

    const [socket, setSocket] = useState<Socket | undefined>(undefined);

    const defaultProps = useMemo<SocketContextProps>(
        () => ({
            socket,
            setSocket
        }),
        [socket]
    );

    return (
        <SocketContext.Provider value={defaultProps}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
