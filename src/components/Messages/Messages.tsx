import React, {FC} from 'react'
import Message from './Message/Message'
import Dialog from './Dialog/Dialog'

import {MessagesProps, UsersProps} from '../../redux/redux-store'

import {Box, Button, FormGroup, List, TextField, Typography} from '@mui/material'
import {blueGrey} from '@mui/material/colors'
import SendIcon from '@mui/icons-material/Send'
import styles from './Messages.module.css'

type MessagesType = {
    users: UsersProps[]
    messages: MessagesProps[]
    newMessage: string
    addMessage: () => void
    updateMessage: (message: string) => void
}

const Messages: FC<MessagesType> = (props) => {
    const addMessage = () => props.addMessage()

    const keyPressHandler = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            props.addMessage()
        }
    }

    const onMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.updateMessage(event.target.value)
    }

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

export default Messages