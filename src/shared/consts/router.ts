export enum AppRoutes {
    MAIN = '/',
    LOGIN = 'login',
    // last page
    NOT_FOUND = 'not_found'
}

export const getRouteMain = () => '/';
export const getRouteLogin = () => '/login';
export const getRouteNotFound = () => '*';
