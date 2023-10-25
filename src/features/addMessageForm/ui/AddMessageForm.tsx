import SendIcon from '@mui/icons-material/Send';
import { Button, TextField } from '@mui/material';
import { ChangeEvent, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/Stack';

import { getAddMessageFromText } from '../model/selectors/addMessageForm';
import { addMessageFormActions } from '../model/slice/addMessageFormSlice';

import cls from './AddMessageForm.module.scss';

interface AddMessageFormProps {
    onSendMessage: (message: string) => void;
}

export const AddMessageForm = (props: AddMessageFormProps) => {
    const { onSendMessage } = props;
    const dispatch = useAppDispatch();
    const message = useSelector(getAddMessageFromText);

    const onChangeMessage = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(addMessageFormActions.setMessage(e.target.value));
        },
        [dispatch]
    );

    const onSendMessageHandler = useCallback(() => {
        onSendMessage(message);
        dispatch(addMessageFormActions.setMessage(''));
    }, [dispatch, message, onSendMessage]);

    return (
        <HStack align="center" gap="16" max>
            <TextField
                fullWidth
                placeholder="Введите сообщение..."
                size="small"
                value={message}
                onChange={onChangeMessage}
            />
            <Button
                variant="outlined"
                size="small"
                className={cls.sendBtn}
                onClick={onSendMessageHandler}
            >
                <SendIcon />
            </Button>
        </HStack>
    );
};
