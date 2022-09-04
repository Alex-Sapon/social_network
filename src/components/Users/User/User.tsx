import {Avatar, Divider, FormControlLabel, ListItem, ListItemAvatar, ListItemText, Switch} from '@mui/material';
import {NavLink} from 'react-router-dom';
import userAvatar from '../../../assets/img/avatar/avatar.jpg';
import React from 'react';
import {UserType} from '../users-reducer';

type UserPropsType = {
    user: UserType
    followingProgress: number[]
    followUnfollow: ({userId, isFollow}: {userId: number, isFollow: boolean}) => void
}

export const User = ({user, followingProgress, followUnfollow}: UserPropsType) => {
    const onFollowClick = () => followUnfollow({userId: user.id, isFollow: true});
    const onUnfollowClick = () => followUnfollow({userId: user.id,  isFollow: false});

    return (
        <>
            <ListItem sx={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', p: '1rem'}}>
                <ListItemAvatar sx={{width: '150px'}}>
                    <NavLink to={`/profile/${user.id}`}>
                        <Avatar
                            alt="Avatar"
                            src={user.photos.small ? user.photos.small : userAvatar}
                            sx={{mb: '0.5rem'}}
                        />
                    </NavLink>
                    <FormControlLabel
                        sx={{display: 'block'}}
                        disabled={followingProgress.some(id => id === user.id)}
                        label={user.followed ? 'Unfollow' : 'Follow'}
                        control={
                            <Switch
                                checked={user.followed}
                                onChange={user.followed ? onUnfollowClick : onFollowClick}
                                name="loading" color="success"
                            />}
                    />
                </ListItemAvatar>
                <ListItemText
                    sx={{width: '50%'}}
                    primary={user.name}
                    secondary={user.status ? user.status : 'No status...'}
                />
            </ListItem>
            <Divider variant="inset" component="li"/>
        </>
    );
};