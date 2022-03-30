import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import {
    followAC,
    setCurrentPageAC, setTotalUsersCountAC,
    setUsersAC,
    unfollowAC,
    UsersDispatchProps,
    UsersType
} from '../../redux/users-reducer';
import {RootStateProps} from '../../redux/redux-store';

const mapStateToProps = (state: RootStateProps) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch<UsersDispatchProps>) => {
    return {
        follow: (userId: string) => dispatch(followAC(userId)),
        unfollow: (userId: string) => dispatch(unfollowAC(userId)),
        setUsers: (users: UsersType[]) => dispatch(setUsersAC(users)),
        setCurrentPage: (currentPage: number) => dispatch(setCurrentPageAC(currentPage)),
        setTotalUsersCount: (totalUsersCount: number) => dispatch(setTotalUsersCountAC(totalUsersCount))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)

