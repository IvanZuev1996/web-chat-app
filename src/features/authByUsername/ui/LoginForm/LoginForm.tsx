import { Alert, Button, TextField } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { AddUserModal } from '@/features/addUserModal';
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
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const username = useSelector(getLoginFormName);
    const isLoading = useSelector(getLoginFormIsLoading);
    const errorMessage = useSelector(getLoginFormError);

    const onOpenModal = useCallback(async () => {
        setIsModalOpen(true);
    }, []);

    const onCloseModal = useCallback(async () => {
        setIsModalOpen(false);
    }, []);

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
            <AddUserModal isOpen={isModalOpen} onClose={onCloseModal} />
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
                    <VStack align="end" gap="12" max>
                        <Button
                            variant="contained"
                            onClick={onLogin}
                            disabled={isLoading}
                        >
                            Войти в чат
                        </Button>
                    </VStack>
                </VStack>
            </VStack>
            <Button variant="text" size="small" onClick={onOpenModal}>
                Добавить нового пользователя
            </Button>
            {errorMessage && (
                <Alert severity="error" className={cls.error}>
                    {errorMessage}
                </Alert>
            )}
        </VStack>
    );
};
