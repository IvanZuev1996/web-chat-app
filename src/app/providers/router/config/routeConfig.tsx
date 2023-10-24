import { RouteProps } from 'react-router-dom';

import {
    AppRoutes,
    getRouteLogin,
    getRouteMain,
    getRouteNotFound
} from '@/shared/consts/router';

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <div />
    },
    [AppRoutes.LOGIN]: {
        path: getRouteLogin(),
        element: <div />
    },
    // last route
    [AppRoutes.NOT_FOUND]: {
        path: getRouteNotFound(),
        element: <div />
    }
};
