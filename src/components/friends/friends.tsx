import React, {FC} from "react";
import {UsersProps} from "../../redux/redux-store";
import Dialog from "../Messages/Dialog/Dialog";

import {Box, List, TextField} from "@mui/material";

type FriendsType = {
    users: UsersProps[]
}

const Friends: FC<FriendsType> = ({users}) => {
    return (
        <Box>
            <TextField type={'search'} label="Search friend" variant="standard" fullWidth sx={{marginBottom: '2rem'}}/>
            <List>
                {users.map((user, i) =>
                    <Dialog key={i} id={user.id} name={user.name}/>
                )}
            </List>
        </Box>
    )
}

export default Friends;