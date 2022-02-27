import React, {FC} from 'react';
import Message from './message/message';
import Dialog from "./dialog/dialog";

import {StateProps} from "../../redux/state";

import {Box, Button, TextField, Typography} from "@mui/material";
import {blueGrey} from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import styles from './messages.module.css';

const Messages: FC<StateProps> = (state) => {
    return (
        <Box className={styles.dialogs} sx={{flexGrow: 1}}>
            <h3 className={styles.title}>Your friends</h3>
            <ul className={styles.list}>
                {state.users?.map((user, i) => <Dialog key={i} id={i + 1} name={user.name}/>)}
            </ul>
            <Typography className={styles.messages} sx={{padding: '0px 20px'}}>
                {state.messages?.map(text => <Message message={text.message}/>)}
                <TextField fullWidth label="message" id="fullWidth" sx={{marginBottom: '1rem'}}/>
                <Button
                    size="medium"
                    variant="contained"
                    sx={{
                        marginBottom: "1rem",
                        backgroundColor: blueGrey[50],
                        color: blueGrey[700],
                        '&:hover': {backgroundColor: blueGrey[200]}
                    }}
                    endIcon={<SendIcon/>}
                >Add message</Button>
            </Typography>
        </Box>
    )
}

export default Messages;