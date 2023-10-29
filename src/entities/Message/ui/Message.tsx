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
            <VStack align="end" className={cls.card}>
                <HStack gap="12" align="start" className={cls.content}>
                    <VStack gap="8">
                        <HStack
                            className={classNames(cls.chip, {}, [cls.active])}
                        >
                            <Text>{message?.text}</Text>
                        </HStack>
                    </VStack>
                    <Avatar>H</Avatar>
                </HStack>
            </VStack>
        );
    }

    return (
        <VStack className={cls.card}>
            <HStack gap="12" align="start" className={cls.content}>
                <Avatar>H</Avatar>
                <VStack gap="8">
                    <HStack className={cls.chip}>
                        <Text>{message?.text}</Text>
                    </HStack>
                </VStack>
            </HStack>
        </VStack>
    );
};
