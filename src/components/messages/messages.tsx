import React, {FC} from 'react'
import Message from './message/message'
import Dialog from "./dialog/dialog"

import {addMessageActionCreator, updateMessageActionCreator} from '../../redux/messages-reducer';
import {DispatchProps, MessagesPageProps} from '../../redux/state'

import {Box, Button, FormGroup, List, TextField, Typography} from "@mui/material"
import {blueGrey} from "@mui/material/colors"
import SendIcon from "@mui/icons-material/Send"
import styles from './messages.module.css'

type MessagesType = {
    state: MessagesPageProps
    dispatch: (action: DispatchProps) => void
}

const Messages: FC<MessagesType> = ({state, dispatch}) => {
    const addMessage = () => {
        if (dispatch) dispatch(addMessageActionCreator())
    }

    const keyPressHandler = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            if (dispatch) dispatch(addMessageActionCreator())
        }
    }

    const onMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const message = event.target.value;
        if (dispatch) dispatch(updateMessageActionCreator(message))
    }

    return (
        <Box className={styles.dialogs} sx={{flexGrow: 1}}>
            <List>
                <Typography sx={{fontSize: '1.5rem'}}>Your friends</Typography>
                {state.users.map((user, i) =>
                    <Dialog key={i} id={user.id} name={user.name}/>
                )}
            </List>
            <FormGroup sx={{padding: '20px'}}>
                {state.messages.map((text, i) =>
                    <Message key={i} message={text.message}/>
                )}
                <TextField
                    value={state.newMessage}
                    onChange={onMessageChange}
                    onKeyPress={keyPressHandler}
                    fullWidth
                    id="fullWidth"
                    sx={{mb: '1rem'}}/>
                <Button
                    onClick={addMessage}
                    size="medium"
                    variant="contained"
                    sx={{
                        maxWidth: '160px',
                        mb: "1rem",
                        backgroundColor: blueGrey[50],
                        color: blueGrey[700],
                        '&:hover': {backgroundColor: blueGrey[200]}
                    }}
                    endIcon={<SendIcon/>}>
                    Add message
                </Button>
            </FormGroup>
        </Box>
    )
}

export default Messages