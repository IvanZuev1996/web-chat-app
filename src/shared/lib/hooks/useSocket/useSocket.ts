import { useContext } from 'react';
import { Socket } from 'socket.io-client';

import { SocketContext } from '../../context/SocketContext';

export interface UseSocketResult {
    socket?: Socket;
    setSocket?: (socket: Socket) => void;
}

export function useSocket(): UseSocketResult {
    const { socket, setSocket } = useContext(SocketContext);

    return { socket, setSocket };
}
