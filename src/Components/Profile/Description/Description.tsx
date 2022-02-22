import React, {FC, useRef} from 'react';
import styles from './Description.module.css';
import {PagesProps} from "../../../index";

import {Avatar, Box, Button, ListItem} from "@mui/material";
import {teal} from "@mui/material/colors";

const Description: FC<PagesProps> = (props) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null!)
    let addPost = () => {
        let text = textAreaRef.current.value;
        if (props.addPost) props.addPost(text);
        textAreaRef.current.value = '';
    }

    return (
        <Box sx={{width: 600, maxWidth: '100%'}}>
            <ListItem sx={{padding: '0.5rem 0.5rem 1rem 0.5rem'}}>
                <Avatar></Avatar>
            </ListItem>
            <form action="submit">
                <textarea ref={textAreaRef}/>
                <Button size="small" variant='contained' sx={{bgcolor: teal[300]}} onClick={addPost}>Add post</Button>
            </form>
        </Box>
    )
}

export default Description;