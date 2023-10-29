import { Card } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import { Message, MessageType } from '@/entities/Message';
import { AddMessageForm } from '@/features/addMessageForm';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSocket } from '@/shared/lib/hooks/useSocket/useSocket';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

import { addMessage } from '../model/services/addMessage';

import cls from './MainPage.module.scss';

const MainPage = () => {
    const dispatch = useAppDispatch();
    const { socket } = useSocket();
    // const { data: messages } = useMessages(null);
    const [messages, setMessages] = useState<MessageType[]>([
        { id: 'messages', text: 'messages', person_id: 'person' },
        { id: 'messages', text: 'messages', person_id: 'person' }
    ]);

    useEffect(() => {
        socket?.on('get-messages', (data) => setMessages([...messages, data]));
    }, [messages, socket]);

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
                <div className={cls.messagesWrapper}>
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
