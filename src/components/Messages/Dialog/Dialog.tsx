import React from 'react';
import styles from './Dialog.module.css';
import {NavLink} from 'react-router-dom';

import {Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography} from '@mui/material';
import {IAllDialogs} from '../../../api/apiDialogs';
import userAvatar from '../../../assets/img/avatar/avatar.jpg';

export const Dialog = (props: IAllDialogs) => {
    const {
        id,
        userName,
        photos,
        hasNewMessages,
        newMessagesCount,
        lastDialogActivityDate,
        lastUserActivityDate
    } = props;

    return (
        <>
            <NavLink to={``}>
                <ListItem className={styles.dialog_item}>
                    <ListItemAvatar>
                        <Avatar alt="Avatar" src={photos.small ? photos.small : userAvatar}/>
                    </ListItemAvatar>
                    <ListItemText
                        sx={{width: '50%'}}
                        primary={userName}
                        // secondary={}
                    />
                    <Typography variant="body2" color="text.secondary">
                        {new Date(lastDialogActivityDate).toLocaleDateString()}
                    </Typography>
                </ListItem>
            </NavLink>
            <Divider variant="inset" component="li" sx={{width: '80%', mt: '-1px'}}/>
        </>
    )
}