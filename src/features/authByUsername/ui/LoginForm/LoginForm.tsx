import { Alert, Button, TextField } from '@mui/material';
import { ChangeEvent, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { handleKeyPress } from '@/shared/lib/helpers/handleKeyPress';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import {
    getLoginFormError,
    getLoginFormIsLoading,
    getLoginFormName
} from '../../model/selectors/loginForm';
import { authByUsername } from '../../model/services/authByUsername';
import { loginFormActions } from '../../model/slice/loginFormSlice';

import cls from './LoginForm.module.scss';

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const username = useSelector(getLoginFormName);
    const isLoading = useSelector(getLoginFormIsLoading);
    const errorMessage = useSelector(getLoginFormError);

    const onLogin = useCallback(async () => {
        await dispatch(authByUsername(username || ''));
        dispatch(loginFormActions.setName(''));
    }, [dispatch, username]);

    const onChageUsername = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(loginFormActions.setName(e.target.value));
        },
        [dispatch]
    );

    const handlePress = handleKeyPress(onLogin);

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
                        onKeyDown={handlePress}
                    />
                    <Button
                        variant="outlined"
                        onClick={onLogin}
                        disabled={isLoading}
                    >
                        Присоединиться к чату
                    </Button>
                </VStack>
            </VStack>
            {errorMessage && (
                <Alert severity="error" className={cls.error}>
                    {errorMessage}
                </Alert>
            )}
        </VStack>
    );
};
