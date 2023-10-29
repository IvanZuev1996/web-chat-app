import { createContext } from 'react';
import { Socket } from 'socket.io-client';

export interface SocketContextProps {
    socket?: Socket;
    setSocket?: (socket: Socket) => void;
}

export const SocketContext = createContext<SocketContextProps>({});
