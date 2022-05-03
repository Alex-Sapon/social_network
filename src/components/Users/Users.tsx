import React, {ChangeEvent, FC} from 'react';
import {List, Pagination, Stack} from '@mui/material';
import {Preloader} from '../../common/Preloader/Preloader';
import styles from './Users.module.css';
import {UsersContainerType} from './UsersContainer';
import {User} from './User/User';

type UsersTypeProps = UsersContainerType & {
    onChangePage: (page: number) => void
}

export const Users: FC<UsersTypeProps> = props => {
    const {
        onChangePage,
        totalUsersCount,
        currentPage,
        isFetching,
        users,
        toggleFollowingProgress,
        follow,
        unfollow,
        followingProgress,
    } = props;

    const onChangePageHandler = (e: ChangeEvent<unknown>, page: number) => onChangePage(page);

    return (
        <div>
            <Stack spacing={2} sx={{m: '1rem 0rem 2rem', alignItems: 'center'}}>
                <Pagination count={totalUsersCount} page={currentPage} onChange={onChangePageHandler}/>
            </Stack>
            {isFetching && <Preloader className={styles.preloader} stylePreloader={styles.preloader}/>}
            <List>
                {users.map(user => <User
                    key={user.id}
                    user={user}
                    toggleFollowingProgress={toggleFollowingProgress}
                    follow={follow}
                    unfollow={unfollow}
                    followingProgress={followingProgress}
                />)}
            </List>
        </div>
    );
};
