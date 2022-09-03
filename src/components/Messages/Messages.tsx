import {addMessage, fetchDialogs} from '../../redux/reducers/messages-reducer';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import React, {ComponentType, useEffect} from 'react';
import {useAppSelector} from '../../assets/utils';
import {Grid, List, Typography} from '@mui/material';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import {MessageFormData} from './AddMessageForm';
import {useDispatch} from 'react-redux';
import {MessageFormDataType} from './AddMessageForm/AddMessageForm';

const MessagesContainer = () => {
    const messages = useAppSelector(state => state.messagesPage.messages);
    const users = useAppSelector(state => state.messagesPage.users);

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
                <MessageFormData onSubmit={onSubmit}/>
            </Grid>
        </Grid>
    )
};

export default compose<ComponentType>(withAuthRedirect)(MessagesContainer);
