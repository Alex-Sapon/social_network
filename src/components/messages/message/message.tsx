import React, {FC} from 'react';
import styles from './message.module.css';
import {MessagesProps} from "../../../redux/state";

import {Avatar, Card} from "@mui/material";

const Message: FC<MessagesProps> = ({message}) => {
    return (
        <Card sx={{mb: '1rem', padding: '0.4rem'}}>
            <Avatar alt="avatar" src="#" component={'span'}/>
            <p>{message}</p>
        </Card>
    )
}

export default Message;