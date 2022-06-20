import {Avatar, Divider, FormControlLabel, ListItem, ListItemAvatar, ListItemText, Switch} from '@mui/material';
import {NavLink} from 'react-router-dom';
import userAvatar from '../../../assets/img/avatar/avatar.jpg';
import React, {FC} from 'react';
import {UserType} from '../../../redux/reducers/users-reducer';

type UserPropsType = {
    user: UserType
    followingProgress: number[]
    followUnfollow: (userId: number, isFollow: boolean) => void
}

export const User: FC<UserPropsType> = props => {
    const {user, followingProgress, followUnfollow} = props;

    const followHandler = () => followUnfollow(user.id, true);
    const unfollowHandler = () => followUnfollow(user.id, false);

    return (
        <>
            <ListItem sx={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', p: '1rem'}}>
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
                                name="loading" color="success"
                            />}
                    />
                </ListItemAvatar>
                <ListItemText
                    sx={{width: '50%'}}
                    primary={user.name}
                    secondary={user.status === null ? 'No status...' : user.status}
                />
            </ListItem>
            <Divider variant="inset" component="li"/>
        </>
    );
};