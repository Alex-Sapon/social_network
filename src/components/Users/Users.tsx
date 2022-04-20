import React, {FC} from 'react';
import {
    Avatar, Card, FormControlLabel, List, ListItem,
    ListItemAvatar, ListItemText, Pagination, Stack, Switch
} from '@mui/material';
import {UsersType} from '../../redux/users-reducer';
import userAvatar from '../../assets/img/avatar/avatar.jpg'
import {Preloader} from '../../common/Preloader/Preloader';
import styles from './Users.module.css'
import {NavLink} from 'react-router-dom';
import axios from 'axios';

type UsersTypeProps = {
    users: UsersType[]
    totalUsersCount: number
    currentPage: number
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    onChangePage: (page: number) => void
    isFetching: boolean
    pageSize: number
    setUsers: (users: UsersType[]) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
}

const Users: FC<UsersTypeProps> = (props) => {
    const onChangeHandler = (event: React.ChangeEvent<unknown>, page: number) => props.onChangePage(page)

    return (
        <div>
            <Stack spacing={2} sx={{m: '1rem 0rem 2rem', alignItems: 'center'}}>
                <Pagination count={props.totalUsersCount} page={props.currentPage} onChange={onChangeHandler}/>
            </Stack>
            {props.isFetching && <Preloader className={styles.preloader} stylePreloader={styles.preloader}/>}
            <List>
                {props.users.map(user => {
                        const followUser = () => {
                            axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {}, {
                                withCredentials: true,
                                headers: {
                                    'API-KEY': '58a35b1a-b81e-47aa-bbe1-21ce674b2447'
                                }
                            })
                                .then(response => {
                                    if (response.data.resultCode === 0) {
                                        props.follow(user.id)
                                    }
                                })
                        }

                        const unFollowUser = () => {
                            axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {
                                withCredentials: true,
                                headers: {
                                    'API-KEY': '58a35b1a-b81e-47aa-bbe1-21ce674b2447'
                                }
                            })
                                .then(response => {
                                    if (response.data.resultCode === 0) {
                                        props.unfollow(user.id)
                                    }
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
                                    <FormControlLabel sx={{display: 'block'}} label={user.followed ? 'Unfollow' : 'Follow'}
                                                      control={<Switch checked={user.followed} onChange={user.followed ? unFollowUser : followUser}
                                                                       name="loading" color="success"/>}/>
                                </ListItemAvatar>
                                <Card sx={{
                                    width: '100%',
                                    display: 'flex',
                                    padding: '1rem',
                                    minHeight: '60px',
                                    bgcolor: '#e1f5fe'
                                }}>
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

export default Users;