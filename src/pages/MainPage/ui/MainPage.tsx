import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { Message, MessageType } from '@/entities/Message';
import { AddMessageForm } from '@/features/addMessageForm';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSocket } from '@/shared/lib/hooks/useSocket/useSocket';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

import { fetchMessages } from '../model/services/fetchMessages';
import { getMessages, mainPageActions } from '../model/slice/mainPageSlice';

import cls from './MainPage.module.scss';

const MainPage = () => {
    const dispatch = useAppDispatch();
    const elementRef = useRef<HTMLDivElement>(null);
    const { socket } = useSocket();
    const messages = useSelector(getMessages.selectAll);

    const scrollToBottom = useCallback(() => {
        if (elementRef.current) {
            elementRef.current.scrollTop = elementRef.current.scrollHeight;
        }
    }, []);

    useEffect(() => {
        dispatch(fetchMessages());
    }, [dispatch, scrollToBottom]);

    useEffect(() => {
        if (messages) {
            scrollToBottom();
        }
    }, [messages, scrollToBottom]);

    useEffect(() => {
        socket?.on('get-messages', (data: MessageType) => {
            dispatch(mainPageActions.addNewMessage(data));
            scrollToBottom();
        });
    }, [dispatch, messages, scrollToBottom, socket]);

    return (
        <Page className={cls.MainPage}>
            <VStack gap="16" className={cls.mainPageContent}>
                <div ref={elementRef} className={cls.messagesWrapper}>
                    <HStack
                        align="center"
                        justify="center"
                        max
                        className={cls.headerContent}
                    >
                        <Text size="M" weight="bold_weight">
                            Чат
                        </Text>
                    </HStack>
                    {messages?.map((message) => (
                        <Message key={message.id} message={message} />
                    ))}
                    <AddMessageForm />
                </div>
            </VStack>
        </Page>
    );
};

export default MainPage;
