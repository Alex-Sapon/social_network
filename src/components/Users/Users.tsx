import React from 'react';

import {
    Avatar,
    Card,
    FormControlLabel,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Pagination,
    Stack,
    Switch
} from '@mui/material';
import {UsersType} from '../../redux/users-reducer';
import axios from 'axios';
import userAvatar from '../../img/avatar/avatar.jpg'

type UsersTypeProps = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: UsersType[]) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
}

class Users extends React.Component<UsersTypeProps> {
    componentDidMount() {
        this.props.users.length === 0 && axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(data => {
            this.props.setUsers(data.data.items)
            this.props.setTotalUsersCount(data.data.totalCount)
        })

    }

    onChangePageHandler(page: number) {
        this.props.setCurrentPage(page)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`).then(data => {
            this.props.setUsers(data.data.items)
        })
    }

    render() {
        // const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        return (
            <div>
                <Stack spacing={2} sx={{m: '1rem 0rem 2rem', alignItems: 'center'}}>
                    <Pagination
                        count={this.props.totalUsersCount}
                        page={this.props.currentPage}
                        onChange={(e, page) => this.onChangePageHandler(page)}
                    />
                </Stack>
                <List>
                    {this.props.users.map(user => {
                            const onChangeHandler = () => user.followed ? this.props.unfollow(user.id) : this.props.follow(user.id)

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
}

export default Users;