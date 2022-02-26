import React, {FC, useRef} from 'react';
import Message from './message/message';
import Dialog from "./dialog/dialog";
import {PagesProps} from "../../index";

//** Styles from MUI **//
import {Box, Button, Typography} from "@mui/material";
import {teal} from "@mui/material/colors";

//** Styles **//
import styles from './messages.module.css';

const Messages: FC<PagesProps> = (state) => {
    return (
        <Box className={styles.dialogs} sx={{flexGrow: 1}}>
            <h3 className={styles.title}>Your friends</h3>
            <ul className={styles.list}>
                {state.users?.map((user, i)=> <Dialog key={i} id={i + 1} name={user.name}/>)}
            </ul>
            <Typography className={styles.messages} sx={{padding: '0px 20px'}}>
                {state.messages?.map(text => <Message message={text.message}/>)}
                <textarea rows={3}/>
                <Button size="small" variant='contained' sx={{bgcolor: teal[300]}}>Add message</Button>
            </Typography>
        </Box>
    )
}

export default Messages;