import React, {FC, KeyboardEvent, ChangeEvent} from 'react'
import Message from './Message/Message'
import Dialog from './Dialog/Dialog'

import {Box, Button, FormGroup, List, TextField, Typography} from '@mui/material'
import {blueGrey} from '@mui/material/colors'
import SendIcon from '@mui/icons-material/Send'
import styles from './Messages.module.css'
import { MessagesType, UsersType } from '../../redux/messages-reducer'

type MessagesPropsType = {
    users: Array<UsersType>
    messages: Array<MessagesType>
    newMessage: string
    addMessage: () => void
    updateMessage: (message: string) => void
}

export const Messages: FC<MessagesPropsType> = (props) => {
    const addMessage = () => props.newMessage.trim() !== '' && props.addMessage()
    const keyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => e.key === 'Enter' && props.addMessage()
    const onMessageChange = (e: ChangeEvent<HTMLInputElement>) => props.updateMessage(e.currentTarget.value)

    return (
        <Box className={styles.dialogs}>
            <List>
                <Typography sx={{fontSize: '1.5rem'}}>Your friends</Typography>
                {props.users.map(user =>
                    <Dialog key={user.id} id={user.id} name={user.name}/>
                )}
            </List>
            <FormGroup sx={{padding: '20px'}}>
                {props.messages.map(text =>
                    <Message key={text.id} message={text.message}/>
                )}
                <TextField
                    size={'small'}
                    value={props.newMessage}
                    onChange={onMessageChange}
                    onKeyPress={keyPressHandler}
                    fullWidth
                    sx={{mb: '1rem'}}/>
                <Button
                    onClick={addMessage}
                    size="small"
                    variant="contained"
                    sx={{
                        maxWidth: '160px',
                        mb: '1rem',
                        bgcolor: blueGrey[50],
                        color: blueGrey[700],
                        '&:hover': {bgcolor: blueGrey[200]}
                    }}
                    endIcon={<SendIcon/>}>
                    Add message
                </Button>
            </FormGroup>
        </Box>
    )
}