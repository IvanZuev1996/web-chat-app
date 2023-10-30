import { ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app/App';
import SocketProvider from './app/providers/SocketProvider/SocketProvider';
import { StoreProvider } from './app/providers/StoreProvider';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const theme = createTheme({
    typography: {
        fontFamily: 'Light',
        fontSize: 14
    }
});

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <StoreProvider>
                <ThemeProvider theme={theme}>
                    <SocketProvider>
                        <App />
                    </SocketProvider>
                </ThemeProvider>
            </StoreProvider>
        </BrowserRouter>
    </React.StrictMode>
);
