import React from 'react';
import styles from './Dialog.module.css';

import {Avatar, ListItem, ListItemAvatar, ListItemText} from '@mui/material';
import userAvatar from '../../../assets/img/avatar/avatar.jpg';
import {MessagesType} from '../Dialogs';

export const Dialog = ({userName, photo, message}: MessagesType) => (
    <ListItem className={styles.chat_item}>
        <ListItemAvatar>
            <Avatar alt="Avatar" src={photo ? photo : userAvatar}/>
        </ListItemAvatar>
        <ListItemText className={styles.chat_text} primary={userName} secondary={message ? message : '...'}/>
    </ListItem>
)