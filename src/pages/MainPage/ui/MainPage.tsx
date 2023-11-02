import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { MessageList, MessageType } from '@/entities/Message';
import { userActions } from '@/entities/User';
import { AddMessageForm } from '@/features/addMessageForm';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { useScrollToBottom } from '@/shared/lib/hooks/useScrollToBottom/useSctollToBottom';
import { useSocket } from '@/shared/lib/hooks/useSocket/useSocket';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

import { fetchMessages } from '../model/services/fetchMessages';
import { fetchNextMessagesPart } from '../model/services/fetchNextMessagesPart';
import { getMessages, mainPageActions } from '../model/slice/mainPageSlice';

import cls from './MainPage.module.scss';

const MainPage = () => {
    const dispatch = useAppDispatch();
    const { socket } = useSocket();
    const elementRef = useRef<HTMLDivElement>(null);
    const { scrollToBottom } = useScrollToBottom(elementRef);

    const messages = useSelector(getMessages.selectAll);
    const [typingStatus, setTypingStatus] = useState<string>('');
    const [isScrollToBottom, setIsScrollToBottom] = useState<boolean>(true);

    const debouncedResetTypingStatus = useDebounce(() => {
        setTypingStatus('');
    }, 3000);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextMessagesPart());
        setIsScrollToBottom(false);
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchMessages());
    }, [dispatch]);

    useEffect(() => {
        if (messages && isScrollToBottom) {
            scrollToBottom();
        }
    }, [isScrollToBottom, messages, scrollToBottom]);

    useEffect(() => {
        socket?.on('usersTypingInfo', (data) => {
            setTypingStatus(data);
            debouncedResetTypingStatus();
        });
    }, [debouncedResetTypingStatus, setTypingStatus, socket]);

    useEffect(() => {
        socket?.on('get-messages', (data: MessageType) => {
            dispatch(mainPageActions.addNewMessage(data));
            setIsScrollToBottom(true);
            scrollToBottom();
        });
    }, [dispatch, messages, scrollToBottom, socket]);

    return (
        <Page className={cls.MainPage}>
            <Button
                variant="text"
                startIcon={<KeyboardBackspaceIcon />}
                color="error"
                onClick={onLogout}
            >
                Выйти
            </Button>
            <VStack align="center" className={cls.mainPageContent} max>
                <VStack align="center" className={cls.chat}>
                    <HStack
                        align="center"
                        justify="between"
                        className={cls.headerContent}
                        max
                    >
                        <Text size="M" weight="bold_weight">
                            Чат
                        </Text>
                        <Text size="S">{typingStatus}</Text>
                    </HStack>
                    <div ref={elementRef} className={cls.messagesWrapper}>
                        <MessageList
                            messages={messages}
                            onLoadNextPart={onLoadNextPart}
                        />
                    </div>
                    <AddMessageForm />
                </VStack>
            </VStack>
        </Page>
    );
};

export default MainPage;
