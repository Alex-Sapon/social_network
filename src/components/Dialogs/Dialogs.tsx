import React, {ComponentType, KeyboardEvent, useEffect, useRef, useState} from 'react';
import {List} from '@mui/material';
import {Dialog} from './Dialog/Dialog';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import styles from './Dialogs.module.css';
import {compose} from 'redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

export type MessagesType =   {
    message: string
    photo: string
    userId: number
    userName: string
}

const DialogsContainer = () => {
    const [messages, setMessages] = useState<MessagesType[]>([]);
    const [socket, setSocket] = useState<WebSocket>();
    const [message, setMessage] = useState('');

    const messageBottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const socket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
        setSocket(socket);

        socket.onmessage = (event: MessageEvent) => {
            setMessages(prev => [...prev, ...JSON.parse(event.data)]);
        }
    }, [])

    useEffect(() => {
        messageBottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages])

    const onSendClick = () => {
        message.trim() && socket?.send(message);
        setMessage('');
    }

    const onSendKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            onSendClick();
        }
    }

    return (
        <div className={styles.chat_container}>
            <List className={styles.chat_list}>
                {messages.map((message, i) => <Dialog key={i} {...message}/>)}
                <div ref={messageBottomRef}/>
            </List>
            <div className={styles.chat_send} >
                <TextField
                    fullWidth
                    value={message}
                    size="small"
                    sx={{mr: '2rem', backgroundColor: 'white'}}
                    variant="outlined"
                    onKeyPress={onSendKeyPress}
                    onChange={(e) => setMessage(e.currentTarget.value)}
                />
                <Button variant="contained" endIcon={<SendIcon />} onClick={onSendClick}>Send</Button>
            </div>
        </div>
    )
};

export default compose<ComponentType>(withAuthRedirect)(DialogsContainer);
