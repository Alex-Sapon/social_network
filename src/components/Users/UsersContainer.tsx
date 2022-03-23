import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import {followAC, setUsersAC, unfollowAC, UsersDispatchProps, UsersType} from '../../redux/users-reducer';
import {RootStateProps} from '../../redux/redux-store';

const mapStateToProps = (state: RootStateProps) => {
    return {
        users: state.usersPage.users
    }
}

const mapDispatchToProps = (dispatch: Dispatch<UsersDispatchProps>) => {
    return {
        follow: (userId: string) => dispatch(followAC(userId)),
        unfollow: (userId: string) => dispatch(unfollowAC(userId)),
        setUsers: (users: UsersType[]) => dispatch(setUsersAC(users))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)

