import React, {useEffect} from 'react';
import Message from './Message/Message';
import Dialog from './Dialog/Dialog';

import {Grid, List, Typography} from '@mui/material';
import {fetchDialogs, MessageType, UserType} from '../../redux/reducers/messages-reducer';
import MessageForm, {MessageFormDataType} from './AddMessageForm/AddMessageForm';
import {useDispatch} from 'react-redux';

type MessagesPropsType = {
    messages: MessageType[]
    users: UserType[]
    addMessage: (message: string) => void
};

export const Messages = (props: MessagesPropsType) => {
    const {messages, users, addMessage} = props;

    useEffect(() => {
        const socket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

        // socket.onmessage = ev => {
        //
        // }

    }, [])

    const dispatch = useDispatch();

    const onSubmit = (formData: MessageFormDataType) => {
        const message = formData.messageForm;

        message && message.trim() !== '' && dispatch(addMessage(message));
        dispatch(fetchDialogs(23550))
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


