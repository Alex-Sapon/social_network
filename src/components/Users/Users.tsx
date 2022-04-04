import React, {FC} from 'react';
import {Avatar, Card, FormControlLabel, List, ListItem,
    ListItemAvatar, ListItemText, Pagination, Stack, Switch} from '@mui/material';
import {UsersType} from '../../redux/users-reducer';
import userAvatar from '../../assets/img/avatar/avatar.jpg'

type UsersTypeProps = {
    users: UsersType[]
    totalUsersCount: number
    currentPage: number
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    onChangePage: (page: number) => void
}

const Users: FC<UsersTypeProps> = (props) => {
    const onChangeHandler = (event: React.ChangeEvent<unknown>, page: number) => props.onChangePage(page)

    return (
        <div>
            <Stack spacing={2} sx={{m: '1rem 0rem 2rem', alignItems: 'center'}}>
                <Pagination count={props.totalUsersCount} page={props.currentPage} onChange={onChangeHandler}/>
            </Stack>
            <List>
                {props.users.map(user => {
                        const onChangeHandler = () => user.followed ? props.unfollow(user.id) : props.follow(user.id)

                        return (
                            <ListItem alignItems="flex-start" key={user.id}>
                                <ListItemAvatar sx={{width: '150px'}}>
                                    <Avatar alt="Avatar"
                                            src={user.photos.small !== null ? user.photos.small : userAvatar}
                                            sx={{mb: '0.5rem'}}/>
                                    <FormControlLabel sx={{display: 'block'}}
                                                      label={user.followed ? 'Unfollow' : 'Follow'}
                                                      control={
                                                          <Switch
                                                              checked={user.followed}
                                                              onChange={onChangeHandler}
                                                              name="loading"
                                                              color="success"/>
                                                      }/>
                                </ListItemAvatar>
                                <Card sx={{ width: '100%', display: 'flex', padding: '1rem', minHeight: '60px', bgcolor: '#e1f5fe'}}>
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