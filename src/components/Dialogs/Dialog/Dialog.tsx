import React from 'react';
import styles from './Dialog.module.css';

import {Avatar, ListItem, ListItemAvatar, ListItemText} from '@mui/material';
import userAvatar from '../../../assets/img/avatar/avatar.jpg';
import {MessagesType} from '../Dialogs';
import {NavLink} from 'react-router-dom';

export const Dialog = ({userName, photo, message, userId}: MessagesType) => (
    <ListItem className={styles.chat_item}>
        <ListItemAvatar>
            <NavLink to={`/profile/${userId}`}>
                <Avatar alt="Avatar" src={photo ? photo : userAvatar}/>
            </NavLink>
        </ListItemAvatar>
        <ListItemText className={styles.chat_text} primary={userName} secondary={message ? message : '...'}/>
    </ListItem>
)