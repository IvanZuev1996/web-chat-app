import { Card } from '@mui/material';
import { useCallback, useEffect, useRef } from 'react';

import { Message } from '@/entities/Message';
import { AddMessageForm } from '@/features/addMessageForm';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

import { useMessages } from '../api/mainPageApi';
import { addMessage } from '../model/services/addMessage';

import cls from './MainPage.module.scss';

const MainPage = () => {
    const dispatch = useAppDispatch();
    const { data: messages } = useMessages(null, { pollingInterval: 1000 });
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollToBottom = () => {
            if (ref.current) {
                ref.current.scrollTop = 10000;
            }
        };
        scrollToBottom();
    }, []);

    const onSendMessage = useCallback(
        (text: string) => {
            dispatch(addMessage(text));
        },
        [dispatch]
    );

    return (
        <Page className={cls.MainPage}>
            <VStack gap="16" className={cls.mainPageContent}>
                <Card className={cls.header}>
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
                </Card>
                <div ref={ref} className={cls.messagesWrapper}>
                    {messages?.map((message) => (
                        <Message key={message.id} message={message} />
                    ))}
                </div>
                <AddMessageForm onSendMessage={onSendMessage} />
            </VStack>
        </Page>
    );
};

export default MainPage;
