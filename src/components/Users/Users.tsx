import React, {FC, ChangeEvent} from 'react';
import {
    Avatar, Card, FormControlLabel, List, ListItem,
    ListItemAvatar, ListItemText, Pagination, Stack, Switch
} from '@mui/material';
import userAvatar from '../../assets/img/avatar/avatar.jpg'
import {Preloader} from '../../common/Preloader/Preloader';
import styles from './Users.module.css'
import {NavLink} from 'react-router-dom';
import { usersAPI } from '../../API/api';
import { UsersContainerType } from './UsersContainer';

type UsersTypeProps = UsersContainerType & {
    onChangePage: (page: number) => void
}

export const Users: FC<UsersTypeProps> = (props) => {
    const onChangePageHandler = (e: ChangeEvent<unknown>, page: number) => props.onChangePage(page)

    return (
        <div>
            <Stack spacing={2} sx={{m: '1rem 0rem 2rem', alignItems: 'center'}}>
                <Pagination count={props.totalUsersCount} page={props.currentPage} onChange={onChangePageHandler}/>
            </Stack>
            {props.isFetching && <Preloader className={styles.preloader} stylePreloader={styles.preloader}/>}
            <List>
                {props.users.map(user => {
                        const follow = () => {
                            props.toggleFollowingProgress(true, user.id)
                            usersAPI.followUsers(user.id).then(response => {
                                    response.resultCode === 0 && props.follow(user.id)
                                    props.toggleFollowingProgress(false, user.id)
                                })
                        }
                        const unfollow = () => {
                            props.toggleFollowingProgress(true, user.id)
                            usersAPI.unfollowUsers(user.id).then(response => {
                                    response.resultCode === 0 && props.unfollow(user.id)
                                    props.toggleFollowingProgress(false, user.id)
                                })
                        }

                        return (
                            <ListItem alignItems="flex-start" key={user.id}>
                                <ListItemAvatar sx={{width: '150px'}}>
                                    <NavLink to={`/profile/${user.id}`}>
                                        <Avatar alt="Avatar"
                                                src={user.photos.small !== null ? user.photos.small : userAvatar}
                                                sx={{mb: '0.5rem'}}/>
                                    </NavLink>
                                    <FormControlLabel
                                        sx={{display: 'block'}}
                                        disabled={props.followingProgress.some(id => id === user.id)}
                                        label={user.followed ? 'Unfollow' : 'Follow'}
                                        control={
                                            <Switch checked={user.followed} onChange={user.followed ? unfollow : follow}
                                                    name="loading" color="success"/>}
                                    />
                                </ListItemAvatar>
                                <Card sx={{width: '100%',display: 'flex',padding: '1rem',minHeight: '60px',bgcolor: '#e1f5fe'}}>
                                    <ListItemText primary={user.name} secondary={user.status} sx={{width: '100%'}}/>
                                    <ListItemText primary={user.address?.country} secondary={user.address?.city}/>
                                </Card>
                            </ListItem>
                        )
                    }
                )}
            </List>
        </div>
    );
}