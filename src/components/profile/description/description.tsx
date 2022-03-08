import React, {FC, useRef} from 'react'
import {addPostActionCreator, onPostChangeActionCreator} from '../../../redux/profile-reducer'
import {DispatchProps, ProfilePageProps} from '../../../redux/store'

import {Avatar, Box, Button, FormGroup, ListItem, Typography} from '@mui/material'
import {blueGrey} from '@mui/material/colors'
import SendIcon from '@mui/icons-material/Send'
import styles from './description.module.css'


type DescriptionType = {
    state: ProfilePageProps
    dispatch: (action: DispatchProps) => void
}

const Description: FC<DescriptionType> = ({state, dispatch}) => {
    const refInput = useRef<HTMLInputElement>(null!)

    const addPost = () => {
        if (dispatch) dispatch(addPostActionCreator())
    }

    const keyPressHandler = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            if (dispatch) dispatch(addPostActionCreator())
        }
    }

    const onPostChange = () => {
        const text = refInput.current.value
        if (dispatch) dispatch(onPostChangeActionCreator(text))
    }

    return (
        <Box>
            <ListItem sx={{p: '0.5rem', mb: '1rem'}}>
                <Avatar sx={{mr: '1rem'}}
                        src={'https://img.freepik.com/free-vector/bearded-man-avatar-man-vector-portrait_9385-36.jpg'}/>
                <Typography sx={{fontSize: '1.5rem'}}>Aleksandr Saponchik</Typography>
            </ListItem>
            <FormGroup sx={{mb: '1rem'}}>
                <input
                    className={styles.input}
                    ref={refInput}
                    value={state.newPost}
                    onChange={onPostChange}
                    onKeyPress={keyPressHandler}
                />
                <Button
                    size="medium"
                    variant="contained"
                    sx={{
                        maxWidth: '150px',
                        backgroundColor: blueGrey[50],
                        color: blueGrey[700],
                        '&:hover': {backgroundColor: blueGrey[200]}
                    }}
                    endIcon={<SendIcon/>}
                    onClick={addPost}
                >Add post</Button>
            </FormGroup>
        </Box>
    )
}

export default Description