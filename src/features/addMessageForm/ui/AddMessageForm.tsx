import SendIcon from '@mui/icons-material/Send';
import { Button, TextField } from '@mui/material';
import { ChangeEvent, useCallback, KeyboardEvent } from 'react';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSocket } from '@/shared/lib/hooks/useSocket/useSocket';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { HStack } from '@/shared/ui/Stack';

import { getAddMessageFromText } from '../model/selectors/addMessageForm';
import { addMessage } from '../model/services/addMessage';
import { addMessageFormActions } from '../model/slice/addMessageFormSlice';

import cls from './AddMessageForm.module.scss';

export const AddMessageForm = () => {
    const { socket } = useSocket();
    const dispatch = useAppDispatch();
    const userData = useSelector(getUserAuthData);
    const message = useSelector(getAddMessageFromText);

    const onTypingMessage = useCallback(() => {
        socket?.emit('typing', userData);
    }, [socket, userData]);

    const debauncedOnTypingMessage = useThrottle(onTypingMessage, 2000);

    const onChangeMessage = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.value.trim().length >= 255) return;

            dispatch(addMessageFormActions.setMessage(e.target.value));
        },
        [dispatch]
    );

    const onSendMessageHandler = useCallback(() => {
        if (!message.trim()) return;

        socket?.emit('message', {
            id: Date.now().toString(),
            text: message,
            person_id: userData?.id,
            person_name: userData?.name
        });
        dispatch(addMessage(message));
        dispatch(addMessageFormActions.setMessage(''));
    }, [dispatch, message, socket, userData?.id, userData?.name]);

    const handlePress = useCallback(
        (event: KeyboardEvent<HTMLElement>) => {
            if (event.key === 'Enter') {
                onSendMessageHandler();
                return;
            }

            debauncedOnTypingMessage();
        },
        [debauncedOnTypingMessage, onSendMessageHandler]
    );

    return (
        <HStack align="center" gap="16" max className={cls.addMessageForm}>
            <TextField
                fullWidth
                placeholder="Введите сообщение..."
                size="small"
                variant="standard"
                value={message}
                onKeyDown={handlePress}
                onChange={onChangeMessage}
            />
            <Button
                variant="contained"
                size="small"
                className={cls.sendBtn}
                onClick={onSendMessageHandler}
            >
                <SendIcon />
            </Button>
        </HStack>
    );
};
