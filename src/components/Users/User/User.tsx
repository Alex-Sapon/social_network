import {Avatar, Divider, FormControlLabel, ListItem, ListItemAvatar, ListItemText, Switch} from '@mui/material';
import {NavLink} from 'react-router-dom';
import userAvatar from '../../../assets/img/avatar/avatar.jpg';
import React, {FC} from 'react';
import {ItemsType} from '../../../redux/users-reducer';

type UserType = {
    user: ItemsType
    followingProgress: Array<string>
    follow: (userID: string) => void
    unfollow: (userID: string) => void
}

export const User: FC<UserType> = props => {
    const {user, followingProgress, follow, unfollow} = props;

    const followHandler = () => follow(user.id);
    const unfollowHandler = () => unfollow(user.id);

    return (
        <>
            <ListItem sx={{dispaly: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', p: '1rem'}}>
                <ListItemAvatar sx={{width: '150px'}}>
                    <NavLink to={`/profile/${user.id}`}>
                        <Avatar alt="Avatar"
                                src={user.photos.small !== null ? user.photos.small : userAvatar}
                                sx={{mb: '0.5rem'}}/>
                    </NavLink>
                    <FormControlLabel
                        sx={{display: 'block'}}
                        disabled={followingProgress.some(id => id === user.id)}
                        label={user.followed ? 'Unfollow' : 'Follow'}
                        control={
                            <Switch
                                checked={user.followed}
                                onChange={user.followed ? unfollowHandler : followHandler}
                                name="loading" color="success"/>}/>
                </ListItemAvatar>
                <ListItemText
                    sx={{width: '50%'}}
                    primary={user.name}
                    secondary={user.status === null ? 'No status...' : user.status}
                />
                <ListItemText
                    primary={user.address ? user.address.country : 'Country...'}
                    secondary={user.address ? user.address.city : 'City...'}
                />
            </ListItem>
            <Divider variant="inset" component="li"/>
        </>
    );
};