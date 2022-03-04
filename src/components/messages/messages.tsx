import React, {FC, useRef} from 'react';
import Message from './message/message';
import Dialog from "./dialog/dialog";

import {addMessageActionCreator, onMessageActionCreator, StorePropsType} from "../../redux/state";

import {Box, Button, List, TextField, Typography} from "@mui/material";
import {blueGrey} from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import styles from './messages.module.css';

const Messages: FC<StorePropsType> = (state) => {
    const addMessage = () => {
        if (state.dispatch) state.dispatch(addMessageActionCreator());
    }

    const onMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const message = event.target.value;
        if (state.dispatch) state.dispatch(onMessageActionCreator(message));
    }

    return (
        <Box className={styles.dialogs} sx={{flexGrow: 1}}>
            <h3 className={styles.title}>Your friends</h3>
            <List>
                {state.state?.users?.map((user, i) =>
                    <Dialog key={i} id={user.id} name={user.name}/>
                )}
            </List>
            <Typography className={styles.messages} sx={{padding: '0px 20px'}}>
                {state.state?.messages?.map((text, i) => <Message key={i} message={text.message}/>)}
                <TextField
                    value={state.newMessage}
                    onChange={onMessageChange}
                    fullWidth
                    id="fullWidth"
                    sx={{mb: '1rem'}}/>
                <Button
                    onClick={addMessage}
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