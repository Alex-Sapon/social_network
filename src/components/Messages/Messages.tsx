import React, {FC} from 'react';
import Message from './Message/Message';
import Dialog from './Dialog/Dialog';

import {Grid, List, Typography} from '@mui/material';
import {MessageType, UsersType} from '../../redux/messages-reducer';
import MessageForm, {MessageFormDataType} from './AddMessageForm/AddMessageForm';
import {useDispatch} from 'react-redux';

type MessagesPropsType = {
    messages: Array<MessageType>
    users: Array<UsersType>
    addMessage: (message: string) => void
};

export const Messages: FC<MessagesPropsType> = props => {
    const {messages, users, addMessage} = props;

    const dispatch = useDispatch();

    // const addMessageHandler = () => props.newMessage.trim() !== '' && dispatch(props.addMessage());
    // const keyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    //     e.key === 'Enter' && newMessage.trim() !== '' && dispatch(addMessage());
    // };
    // const onMessageChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(updateMessage(e.currentTarget.value));

    const onSubmit = (formData: MessageFormDataType) => {
        dispatch(addMessage(formData.messageForm));
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <List>
                    <Typography sx={{fontSize: '1.5rem'}}>Your friends</Typography>
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


