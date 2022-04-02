import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import {ActionTypes, followAC, setCurrentPageAC, setTotalUsersCountAC, setUsersAC, unfollowAC, UsersType} from '../../redux/users-reducer';
import {RootStateProps} from '../../redux/redux-store';
import axios from 'axios';

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

class UsersContainer extends React.Component<UsersTypeProps> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(data => {
            this.props.setUsers(data.data.items)
            this.props.setTotalUsersCount(data.data.totalCount)
        })
    }

    onChangePage = (page: number) => { // arrow function !!!!!!!!!!!!!
        this.props.setCurrentPage(page)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`).then(data => {
            this.props.setUsers(data.data.items)
        })
    }

    render() {
        return (
            <Users
                users={this.props.users}
                totalUsersCount={this.props.totalUsersCount}
                currentPage={this.props.currentPage}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                onChangePage={this.onChangePage}
            />
        )
    }
}

const mapStateToProps = (state: RootStateProps) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) => {
    return {
        follow: (userId: string) => dispatch(followAC(userId)),
        unfollow: (userId: string) => dispatch(unfollowAC(userId)),
        setUsers: (users: UsersType[]) => dispatch(setUsersAC(users)),
        setCurrentPage: (currentPage: number) => dispatch(setCurrentPageAC(currentPage)),
        setTotalUsersCount: (totalUsersCount: number) => dispatch(setTotalUsersCountAC(totalUsersCount))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)

