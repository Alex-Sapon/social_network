import React, {FC} from 'react';
import {MessagesProps} from "../../../redux/state";

import {Avatar, Card, Typography} from "@mui/material";
import styles from './message.module.css';

const Message: FC<MessagesProps> = ({message}) => {
    return (
        <Card sx={{mb: '1rem', padding: '0.4rem'}}>
            <Avatar alt="avatar" src="https://img.freepik.com/free-vector/bearded-man-avatar-man-vector-portrait_9385-36.jpg"/>
            <Typography sx={{fontSize: '0.9rem'}}>{message}</Typography>
        </Card>
    )
}

export default Message;