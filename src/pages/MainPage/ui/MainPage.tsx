import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { Message, MessageType } from '@/entities/Message';
import { userActions } from '@/entities/User';
import { AddMessageForm } from '@/features/addMessageForm';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { useSocket } from '@/shared/lib/hooks/useSocket/useSocket';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

import {
    getMainPageHasMore,
    getMainPageIsLoading,
    getMainPageNewPartInited
} from '../model/selectors/mainPage';
import { fetchMessages } from '../model/services/fetchMessages';
import { fetchNextMessagesPart } from '../model/services/fetchNextMessagesPart';
import { getMessages, mainPageActions } from '../model/slice/mainPageSlice';

import cls from './MainPage.module.scss';

const MainPage = () => {
    const dispatch = useAppDispatch();
    const { socket } = useSocket();
    const elementRef = useRef<HTMLDivElement>(null);
    const messages = useSelector(getMessages.selectAll);
    const isLoading = useSelector(getMainPageIsLoading);
    const hasMore = useSelector(getMainPageHasMore);
    const isNewPartInited = useSelector(getMainPageNewPartInited);
    const [typingStatus, setTypingStatus] = useState<string>('');

    const scrollToBottom = useCallback(() => {
        if (elementRef.current) {
            elementRef.current.scrollTop = elementRef.current.scrollHeight;
        }
    }, []);

    const debouncedResetTypingStatus = useDebounce(() => {
        setTypingStatus('');
    }, 3000);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextMessagesPart());
    }, [dispatch]);

    useEffect(() => {
        socket?.on('usersTypingInfo', (data) => {
            setTypingStatus(data);
            debouncedResetTypingStatus();
        });
    }, [debouncedResetTypingStatus, setTypingStatus, socket]);

    useEffect(() => {
        dispatch(fetchMessages());
    }, [dispatch]);

    useEffect(() => {
        if (messages) {
            scrollToBottom();
        }
    }, [isNewPartInited, messages, scrollToBottom]);

    useEffect(() => {
        socket?.on('get-messages', (data: MessageType) => {
            dispatch(mainPageActions.addNewMessage(data));
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
                        {hasMore && (
                            <Button
                                variant="text"
                                size="small"
                                onClick={onLoadNextPart}
                                className={cls.messagesLoadBtn}
                            >
                                Загрузить более старые сообщения
                            </Button>
                        )}

                        {isLoading && <CircularProgress />}

                        {messages?.map((message) => (
                            <Message key={message.id} message={message} />
                        ))}
                    </div>
                    <AddMessageForm />
                </VStack>
            </VStack>
        </Page>
    );
};

export default MainPage;
