import { CircularProgress } from '@mui/material';

import { HStack } from '../Stack';

import cls from './PageLoader.module.scss';

export const PageLoader = () => (
    <HStack align="center" justify="center" className={cls.loader}>
        <CircularProgress />
    </HStack>
);
