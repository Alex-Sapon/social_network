import React, {ChangeEvent} from 'react';
import {List, Pagination, Stack} from '@mui/material';
import {Preloader} from '../../common/Preloader';
import {UsersContainerType} from './UsersContainer';
import {User} from './User/User';
import styles from './Users.module.css';

type UsersTypeProps = UsersContainerType & {
    onChangePage: (page: number) => void
}

export const Users = (props: UsersTypeProps) => {
    const {
        onChangePage,
        totalUsersCount,
        page,
        isFetching,
        users,
        followingProgress,
        followUnfollow,
        count
    } = props;

    const onChangePageHandler = (e: ChangeEvent<unknown>, page: number) => onChangePage(page);

    const pageCount = Math.ceil(totalUsersCount / count);

    return (
        <div className={styles.users_container}>
            <Stack spacing={2} sx={{m: '1rem 0rem 2rem', alignItems: 'center'}}>
                <Pagination count={pageCount} page={page} onChange={onChangePageHandler}/>
            </Stack>
            {isFetching
                ? <Preloader/>
                : <List className={styles.list}>
                    {users.map(user =>
                        <User
                            key={user.id}
                            user={user}
                            followingProgress={followingProgress}
                            followUnfollow={followUnfollow}
                        />)}
                </List>
            }
        </div>
    );
};
