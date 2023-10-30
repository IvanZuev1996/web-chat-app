import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

import { getUserAuthData, userActions } from '@/entities/User';
import { getRouteLogin, getRouteMain } from '@/shared/consts/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSocket } from '@/shared/lib/hooks/useSocket/useSocket';

import { AppRouter } from './providers/router';

import './styles/index.scss';
import '../shared/fonts/heliosextc.otf';

export function App() {
    const { socket, setSocket } = useSocket();
    const userData = useSelector(getUserAuthData);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    socket?.on('connect', () => {
        console.log('Connected to the server');
    });

    useEffect(() => {
        dispatch(userActions.initAuthData());

        const socket = io('http://localhost:8000');
        setSocket?.(socket);
    }, [dispatch, setSocket]);

    useEffect(() => {
        if (!userData) {
            navigate(getRouteLogin());
        } else {
            navigate(getRouteMain());
        }
    }, [navigate, userData]);

    return (
        <div className="app">
            <AppRouter />
        </div>
    );
}
