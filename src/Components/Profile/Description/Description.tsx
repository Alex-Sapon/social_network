import React from 'react';
import classes from './Description.module.css';
import {Avatar, ListItem} from "@mui/material";

const Description = () => {
    return (
        <ListItem className={classes.content} sx={{padding: '0.5rem'}}>
            <Avatar></Avatar>
        </ListItem>
    )
}

export default Description;