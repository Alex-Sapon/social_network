import React, {FC} from 'react';
import styles from './Message.module.css';
import {MessagesProps} from "../../../Redux/State";

//** Styles from MUI **//
import {Avatar, Card} from "@mui/material";

const Message: FC<MessagesProps> = ({message}) => {
    return (
        <Card sx={{marginBottom: '1rem', padding: '0.4rem'}}>
            <Avatar alt="avatar" src="#" component={'span'}/>
            <p>{message}</p>
        </Card>
    )
}

export default Message;