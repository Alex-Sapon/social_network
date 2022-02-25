import React, {FC, useRef} from 'react';
import styles from './description.module.css';
import {PagesProps} from "../../../index";

import {Avatar, Box, Button, ListItem} from "@mui/material";
import {teal} from "@mui/material/colors";

const Description: FC<PagesProps> = (state) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null!);

    const addPost = () => {
        if (state.addPost) state.addPost();
        // if (state.updateNewPostText) state.updateNewPostText('');
    }

    const onPostChange = () => {
        const text = textAreaRef.current.value;
        if (state.updateNewPostText) state.updateNewPostText(text);
    }

    return (
        <Box sx={{width: 600, maxWidth: '100%'}}>
            <ListItem sx={{padding: '0.5rem'}}>
                <Avatar></Avatar>
            </ListItem>
            <form action="submit">
                <textarea ref={textAreaRef} value={state.textArea} onChange={onPostChange}/>
                <Button
                    size="small"
                    variant='contained'
                    sx={{bgcolor: teal[300]}}
                    onClick={addPost}
                >Add post</Button>
            </form>
        </Box>
    )
}

export default Description;