import {usersAPI} from '../../../API/api';
import {Avatar, Card, FormControlLabel, ListItem, ListItemAvatar, ListItemText, Switch} from '@mui/material';
import {NavLink} from 'react-router-dom';
import userAvatar from '../../../assets/img/avatar/avatar.jpg';
import React, {FC} from 'react';
import {ItemsType} from '../../../redux/users-reducer';

type UserType = {
    user: ItemsType
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    followingProgress: Array<string>
    toggleFollowingProgress: (isFetching: boolean, id: string) => void
}

export const User: FC<UserType> = props => {
    const {user, follow, unfollow, followingProgress, toggleFollowingProgress} = props;

    const followHandler = () => {
        toggleFollowingProgress(true, user.id);
        usersAPI.followUsers(user.id).then(response => {response.resultCode === 0 && follow(user.id)
            toggleFollowingProgress(false, user.id)
        });
    };
    const unfollowHandler = () => {
        toggleFollowingProgress(true, user.id);
        usersAPI.unfollowUsers(user.id).then(response => {response.resultCode === 0 && unfollow(user.id)
            toggleFollowingProgress(false, user.id);
        });
    };

    return (
        <ListItem alignItems="flex-start">
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
                        <Switch checked={user.followed} onChange={user.followed ? unfollowHandler : followHandler}
                                name="loading" color="success"/>}
                />
            </ListItemAvatar>
            <Card sx={{width: '100%', display: 'flex', padding: '1rem', minHeight: '60px', bgcolor: '#e1f5fe'}}>
                <ListItemText primary={user.name} secondary={user.status} sx={{width: '100%'}}/>
                <ListItemText primary={user.address?.country} secondary={user.address?.city}/>
            </Card>
        </ListItem>
    );
};