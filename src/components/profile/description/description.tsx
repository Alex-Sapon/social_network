import React, {FC, useRef} from 'react';
import styles from './description.module.css';
import {PagesProps} from "../../../index";

import {Avatar, Box, Button, ListItem} from "@mui/material";
import {blueGrey} from "@mui/material/colors";
import SendIcon from '@mui/icons-material/Send';

const Description: FC<PagesProps> = (state) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null!);

    const addPost = () => {
        if (state.addPost) state.addPost();
    }

    const onPostChange = () => {
        const text = textAreaRef.current.value;
        if (state.updateNewPostText) state.updateNewPostText(text);
    }

    return (
        <Box>
            <ListItem sx={{padding: '0.5rem'}}>
                <Avatar></Avatar>
            </ListItem>
            <form action="submit">
                <textarea
                    ref={textAreaRef}
                    value={state.textArea}
                    onChange={onPostChange}/>
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
                    onClick={addPost}
                >Add post</Button>
            </form>
        </Box>
    )
}

export default Description;