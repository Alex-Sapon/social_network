import React, {FC, useRef} from 'react';
import {addPostActionCreator, onPostChangeActionCreator, StorePropsType} from "../../../redux/state";

import {Avatar, Box, Button, FormGroup, ListItem, Typography} from "@mui/material";
import {blueGrey} from "@mui/material/colors";
import SendIcon from '@mui/icons-material/Send';
import styles from './description.module.css';

const Description: FC<StorePropsType> = (state) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null!);

    const addPost = () => {
        if (state.dispatch) state.dispatch(addPostActionCreator());
    }

    const onPostChange = () => {
        const text = textAreaRef.current.value;
        if (state.dispatch) state.dispatch(onPostChangeActionCreator(text));
    }

    return (
        <Box>
            <ListItem sx={{padding: '0.5rem', marginBottom: '1rem'}}>
                <Avatar sx={{marginRight: '1rem'}}></Avatar>
                <Typography sx={{fontSize: '1.5rem'}}>Aleksandr Saponchik</Typography>
            </ListItem>
            <FormGroup sx={{marginBottom: '1rem'}}>
                <textarea
                    ref={textAreaRef}
                    value={state.state?.textArea}
                    onChange={onPostChange}/>
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

export default Description;