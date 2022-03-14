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
    addMessageActionCreator: () => void
    updateMessageActionCreator: (message: string) => void
}

const Messages: FC<MessagesType> = (props) => {
    const addMessage = () => props.addMessageActionCreator()

    const keyPressHandler = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            props.addMessageActionCreator()
        }
    }

    const onMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.updateMessageActionCreator(event.target.value)
    }

    return (
        <Box className={styles.dialogs} sx={{flexGrow: 1}}>
            <List>
                <Typography sx={{fontSize: '1.5rem'}}>Your friends</Typography>
                {props.users.map((user, i) =>
                    <Dialog key={i} id={user.id} name={user.name}/>
                )}
            </List>
            <FormGroup sx={{padding: '20px'}}>
                {props.messages.map((text, i) =>
                    <Message key={i} message={text.message}/>
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