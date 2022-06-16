import React, {FC} from 'react';
import Message from './Message/Message';
import Dialog from './Dialog/Dialog';

import {Grid, List, Typography} from '@mui/material';
import {MessageType, UserType} from '../../redux/reducers/messages-reducer';
import MessageForm, {MessageFormDataType} from './AddMessageForm/AddMessageForm';
import {useDispatch} from 'react-redux';

type MessagesPropsType = {
    messages: Array<MessageType>
    users: Array<UserType>
    addMessage: (message: string) => void
};

export const Messages: FC<MessagesPropsType> = props => {
    const {messages, users, addMessage} = props;

    const dispatch = useDispatch();

    const onSubmit = (formData: MessageFormDataType) => {
        const message = formData.messageForm;

        message && message.trim() !== '' && dispatch(addMessage(message));
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography sx={{fontSize: '1.5rem'}}>Your friends</Typography>
            </Grid>
            <Grid item xs={4}>
                <List>
                    {users.map(user => <Dialog key={user.id} id={user.id} name={user.name}/>)}
                </List>
            </Grid>
            <Grid item xs={8}>
                {messages.map(text => <Message key={text.id} message={text.message}/>)}
                <MessageForm onSubmit={onSubmit}/>
            </Grid>
        </Grid>
    )
};


