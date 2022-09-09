import React, {ComponentType, KeyboardEvent, useEffect, useRef, useState} from 'react';
import {ButtonProps, List} from '@mui/material';
import {Dialog} from './Dialog/Dialog';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import styles from './Dialogs.module.css';
import {compose} from 'redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import styled from '@emotion/styled';

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
            <div className={styles.logo}/>
            <List className={styles.chat_list}>
                {messages.map((message, i) => <Dialog key={i} {...message}/>)}
                <div ref={messageBottomRef}/>
            </List>
            <div className={styles.chat_send} >
                <input
                    placeholder="Type a message..."
                    value={message}
                    onKeyPress={onSendKeyPress}
                    onChange={(e) => setMessage(e.currentTarget.value)}
                />
                <ColorButton variant="outlined" endIcon={<SendIcon />} onClick={onSendClick}>Send</ColorButton>
            </div>
        </div>
    )
};

export default compose<ComponentType>(withAuthRedirect)(DialogsContainer);

const ColorButton = styled(Button)<ButtonProps>(() => ({
    color: '#79C7C5',
    backgroundColor: '#e6f4f6',
    borderColor: '#e6f4f6',
    '&:hover': {
        backgroundColor: '#e6f4f6',
        borderColor: '#79C7C5',
    },
}));
