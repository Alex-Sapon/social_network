import React, {FC} from 'react';
import {UsersProps} from '../../redux/redux-store';
import Dialog from '../Messages/Dialog/Dialog';

import {Box, List, TextField} from '@mui/material';
import StoreContext from '../../StoreContext';

type FriendsType = {
    users: UsersProps[]
}

const Friends: FC = () => {
    return (
        <StoreContext.Consumer>
            {(store) => {
                return (
                    <Box>
                        <TextField type={'search'} label="Search" variant="standard" fullWidth sx={{mb: '2rem'}}/>
                        <List>
                            {store.getState().messagesPage.users.map((user, i) =>
                                <Dialog key={i} id={user.id} name={user.name}/>
                            )}
                        </List>
                    </Box>
                )
            }}
        </StoreContext.Consumer>
    )
}

export default Friends;