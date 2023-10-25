import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import { MessageType } from '../model/types/message';

import cls from './Message.module.scss';

interface MessageProps {
    message?: MessageType;
}

export const Message = (props: MessageProps) => {
    const { message } = props;

    return (
        <VStack className={cls.card}>
            <VStack className={cls.content}>
                <VStack gap="8" max>
                    <Text weight="bold_weight">Юзернейм</Text>
                    <Text>{message?.text}</Text>
                </VStack>
            </VStack>
        </VStack>
    );
};
