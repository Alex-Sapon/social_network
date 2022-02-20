import React, {FC} from 'react';
import styles from './Messages.module.css';
import Message from './Message/Message';
import DialogUser from "./DialogUser/DialogUser";
import {PagesProps} from "../../index";

//** Styles from MUI **//
import {Box, Typography} from "@mui/material";

const Messages: FC<PagesProps> = ({users, messages}) => {
    return (
        <Box className={styles.dialogs} sx={{flexGrow: 1}}>
            <h3 className={styles.title}>Your friends</h3>
            <ul className={styles.list}>
                {users?.map(user => <DialogUser key={user.id} id={user.id} name={user.name}/>)}
            </ul>
            <Typography className={styles.messages} sx={{padding: '0px 20px'}}>
                {messages?.map(text => <Message message={text.message}/>)}
            </Typography>
        </Box>
    )
}

export default Messages;