import React, {FC} from 'react';

import {
    Avatar,
    Button,
    Card,
    FormControlLabel,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Switch
} from '@mui/material';
import {UsersType} from '../../redux/users-reducer';
import axios from 'axios';
import userAvatar from '../../img/avatar/avatar.jpg'

type UsersTypeProps = {
    users: UsersType[]
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: UsersType[]) => void
}

const UsersF: FC<UsersTypeProps> = (props) => {
    const getUsers = () => {
        if (props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(data => {
                props.setUsers(data.data.items)
            })
        }
    }

    return (
        <List>
            <Button onClick={getUsers} title={'Get users'}/>
            {props.users.map(user =>
                <ListItem alignItems="flex-start" key={user.id}>
                    <ListItemAvatar sx={{width: '150px'}}>
                        <Avatar alt="Avatar" src={user.photos.small !== null ? user.photos.small : userAvatar} sx={{mb: '0.5rem'}}/>
                        <FormControlLabel sx={{display: 'block'}} label={user.followed ? 'Unfollow' : 'Follow'} control={
                            <Switch
                                checked={user.followed}
                                onChange={() => user.followed ? props.unfollow(user.id) : props.follow(user.id)}
                                name="loading"
                                color="success"/>
                        }/>
                    </ListItemAvatar>
                    <Card sx={{width: '100%', display: 'flex', padding: '1rem', minHeight: '60px'}}>
                        <ListItemText primary={user.name} secondary={user.status} sx={{width: '100%'}}/>
                        <ListItemText primary={user.address?.country} secondary={user.address?.city}/>
                    </Card>
                </ListItem>
            )}
        </List>
    )
}

export default UsersF;