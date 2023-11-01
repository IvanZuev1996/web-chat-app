import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { ChangeEvent, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
    getAddUserModalError,
    getAddUserModalName
} from '../model/selectors/addUserModal';
import { addUser } from '../model/services/addUser';
import { addUserModalActions } from '../model/slice/addUserModalSlice';

import cls from './AddUserModal.module.scss';

interface AddUserModalProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export const AddUserModal = (props: AddUserModalProps) => {
    const { onClose, isOpen = false } = props;
    const dispatch = useAppDispatch();
    const name = useSelector(getAddUserModalName);
    const errorMessage = useSelector(getAddUserModalError);

    const onChangeName = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(addUserModalActions.setName(e.target.value));
        },
        [dispatch]
    );

    const onAddUser = useCallback(() => {
        dispatch(addUser(name || ''));
        dispatch(addUserModalActions.setName(''));
    }, [dispatch, name]);

    return (
        <Dialog open={isOpen} onClose={onClose} classes={{ paper: cls.modal }}>
            <DialogTitle>Новый пользователь</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    placeholder="Введите имя"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={onChangeName}
                    value={name}
                />
            </DialogContent>
            {errorMessage && (
                <Alert severity="error" className={cls.error}>
                    {errorMessage}
                </Alert>
            )}
            <DialogActions>
                <Button onClick={onClose}>Отменить</Button>
                <Button variant="contained" onClick={onAddUser}>
                    Добавить пользователя
                </Button>
            </DialogActions>
        </Dialog>
    );
};
