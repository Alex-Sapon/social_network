import React, {FC} from 'react';
import {Avatar, Card, Typography} from "@mui/material";
import styles from './Message.module.css';
import avatar from '../../../assets/img/avatar/avatar.jpg';

type MessagesProps = {
    message: string
}

const Message: FC<MessagesProps> = ({message}) => {
    return (
        <Card sx={{mb: '1rem', padding: '0.4rem'}}>
            <Avatar alt="avatar" src={avatar}/>
            <Typography sx={{fontSize: '0.9rem'}}>{message}</Typography>
        </Card>
    )
}

export default Message;