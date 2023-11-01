import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/helpers/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import { MessageType } from '../model/types/message';

import cls from './Message.module.scss';

interface MessageProps {
    message?: MessageType;
}

export const Message = (props: MessageProps) => {
    const { message } = props;
    const userData = useSelector(getUserAuthData);
    const isUserOwner = message?.person_id === userData?.id;

    if (isUserOwner) {
        return (
            <VStack align="end" className={cls.card} max>
                <HStack gap="12" align="start" className={cls.content} max>
                    <VStack gap="8" max align="end">
                        <HStack
                            className={classNames(cls.chip, {}, [cls.active])}
                            max
                        >
                            <Text>{message?.text}</Text>
                        </HStack>
                    </VStack>
                    <Avatar>{message?.person_name?.[0]}</Avatar>
                </HStack>
            </VStack>
        );
    }

    return (
        <VStack className={cls.card} max>
            <HStack gap="12" align="start" className={cls.content} max>
                <Avatar>{message?.person_name?.[0]}</Avatar>
                <VStack gap="8" max>
                    <HStack className={cls.chip} max>
                        <Text>{message?.text}</Text>
                    </HStack>
                </VStack>
            </HStack>
        </VStack>
    );
};
