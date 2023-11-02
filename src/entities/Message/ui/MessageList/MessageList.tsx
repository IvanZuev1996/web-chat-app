import { Button, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

import { getMainPageHasMore, getMainPageIsLoading } from '@/pages/MainPage';

import { MessageType } from '../../model/types/message';
import { Message } from '../Message/Message';

import cls from './MessageList.module.scss';

interface MessageListProps {
    onLoadNextPart?: () => void;
    messages?: MessageType[];
}

export const MessageList = (props: MessageListProps) => {
    const { onLoadNextPart, messages } = props;

    const isLoading = useSelector(getMainPageIsLoading);
    const hasMore = useSelector(getMainPageHasMore);

    return (
        <>
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
        </>
    );
};
