import { Button, TextField } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { userActions } from '@/entities/User';
import { getRouteMain } from '@/shared/consts/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './LoginForm.module.scss';

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');

    const onLogin = useCallback(() => {
        dispatch(
            userActions.setAuthData({
                id: Date.now().toString(),
                username
            })
        );
        navigate(getRouteMain());
    }, [dispatch, navigate, username]);

    const onChageUsername = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }, []);

    return (
        <VStack
            align="center"
            justify="center"
            gap="16"
            max
            className={cls.loginFormWrap}
        >
            <Text weight="bold_weight" size="L">
                Введите свое имя для входа в чат
            </Text>
            <VStack className={cls.content} max>
                <VStack align="end" gap="32" max>
                    <TextField
                        variant="standard"
                        placeholder="Иванов И.И."
                        size="small"
                        fullWidth
                        value={username}
                        onChange={onChageUsername}
                    />
                    <Button variant="outlined" onClick={onLogin}>
                        Присоединииться к чату
                    </Button>
                </VStack>
            </VStack>
        </VStack>
    );
};
