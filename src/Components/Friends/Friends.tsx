import React, {FC} from "react";
import {PagesProps} from "../../index";
import DialogUser from "../Messages/DialogUser/DialogUser";

//** Styles from MUI **//
import {Avatar, Box, List, ListItem, TextField} from "@mui/material";

const Friends: FC<PagesProps> = ({users}) => {
    return (
        <Box>
            <TextField type={'search'} label="Search friend" variant="standard" fullWidth sx={{marginBottom: '2rem'}}/>
            <List>
                {users?.map(user => <ListItem>
                    <Avatar sx={{marginRight: '1rem'}}></Avatar>
                    <DialogUser key={user.id} id={user.id} name={user.name}/>
                </ListItem>)}
            </List>
        </Box>
    )
}

export default Friends;