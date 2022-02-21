import React, {FC, RefObject, useRef} from 'react';
import Message from './Message/Message';
import DialogUser from "./DialogUser/DialogUser";
import {PagesProps} from "../../index";

//** Styles from MUI **//
import {Box, Button, Typography} from "@mui/material";
import {teal} from "@mui/material/colors";

//** Styles **//
import styles from './Messages.module.css';

const Messages: FC<PagesProps> = ({users, messages}) => {
    return (
        <Box className={styles.dialogs} sx={{flexGrow: 1}}>
            <h3 className={styles.title}>Your friends</h3>
            <ul className={styles.list}>
                {users?.map(user => <DialogUser key={user.id} id={user.id} name={user.name}/>)}
            </ul>
            <Typography className={styles.messages} sx={{padding: '0px 20px'}}>
                {messages?.map(text => <Message message={text.message}/>)}
                <textarea rows={3}/>
                <Button size="small" variant='contained' sx={{bgcolor: teal[300]}}>Add message</Button>
            </Typography>
        </Box>
    )
}

export default Messages;