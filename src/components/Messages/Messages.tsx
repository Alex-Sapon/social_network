import React, {ChangeEvent, FC, KeyboardEvent} from 'react';
import Message from './Message/Message';
import Dialog from './Dialog/Dialog';

import {Box, Button, FormGroup, List, TextField, Typography} from '@mui/material';
import {blueGrey} from '@mui/material/colors';
import SendIcon from '@mui/icons-material/Send';
import styles from './Messages.module.css';
import {MessageType, UsersType} from '../../redux/messages-reducer';
import {useDispatch} from 'react-redux';

type MessagesPropsType = {
    messages: Array<MessageType>
    newMessage: string
    users: Array<UsersType>
    addMessage: () => void
    updateMessage: (newMessage: string) => void
};

export const Messages: FC<MessagesPropsType> = props => {
    const {messages, newMessage, users, addMessage, updateMessage} = props;
    const dispatch = useDispatch();

    const addMessageHandler = () => newMessage.trim() !== '' && dispatch(addMessage());
    const keyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        e.key === 'Enter' && newMessage.trim() !== '' && dispatch(addMessage());
    };
    const onMessageChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(updateMessage(e.currentTarget.value));

    return (
        <Box className={styles.dialogs}>
            <List>
                <Typography sx={{fontSize: '1.5rem'}}>Your friends</Typography>
                {users.map(user =>
                    <Dialog key={user.id} id={user.id} name={user.name}/>
                )}
            </List>
            <FormGroup sx={{padding: '20px'}}>
                {messages.map(text => <Message key={text.id} message={text.message}/>)}
                <TextField
                    size={'small'}
                    value={props.newMessage}
                    onChange={onMessageChange}
                    onKeyPress={keyPressHandler}
                    fullWidth
                    sx={{mb: '1rem'}}/>
                <Button
                    onClick={addMessageHandler}
                    size="small"
                    variant="contained"
                    sx={{
                        maxWidth: '160px',
                        mb: '1rem',
                        bgcolor: blueGrey[50],
                        color: blueGrey[700],
                        '&:hover': {bgcolor: blueGrey[200]}
                    }}
                    endIcon={<SendIcon/>}>
                    Add message
                </Button>
            </FormGroup>
        </Box>
    )
};