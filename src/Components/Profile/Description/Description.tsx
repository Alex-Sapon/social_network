import React, {useRef} from 'react';
import classes from './Description.module.css';
import {Avatar, Box, Button, ListItem} from "@mui/material";
import {teal} from "@mui/material/colors";

const Description = () => {
    const inputRef = useRef<HTMLTextAreaElement>(null!)
    const addPost = () => {
        let text = inputRef.current.value
        alert(text)
    }

    return (
        <Box sx={{width: 600, maxWidth: '100%'}}>
            <ListItem className={classes.content} sx={{padding: '0.5rem 0.5rem 1rem 0.5rem'}}>
                <Avatar></Avatar>
            </ListItem>
            <textarea ref={inputRef}/>
            <Button size="small" variant='contained' sx={{bgcolor: teal[300]}} onClick={addPost}>Add post</Button>
        </Box>
    )
}

export default Description;