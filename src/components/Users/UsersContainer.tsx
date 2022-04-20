import React from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import {
    follow,
    setCurrentPage,
    toggleIsFetching,
    setTotalUsersCount,
    setUsers,
    unfollow,
    UsersType
} from '../../redux/users-reducer';
import {RootStateType} from '../../redux/redux-store';
import axios from 'axios';

type UsersContainerType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: UsersType[]) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    isFetching: boolean
    toggleIsFetching: (isFetching: boolean) => void
}

class UsersContainer extends React.Component<UsersContainerType> {
    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`, {
            withCredentials: true
        })
            .then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.data.items)
            this.props.setTotalUsersCount(data.data.totalCount)
        })
    }

    onChangePage = (page: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(page)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`, {
            withCredentials: true
        })
            .then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.data.items)
        })
    }

    render() {
        return (
            <Users {...this.props}
                // users={this.props.users}
                // totalUsersCount={this.props.totalUsersCount}
                // currentPage={this.props.currentPage}
                // follow={this.props.follow}
                // unfollow={this.props.unfollow}
                onChangePage={this.onChangePage}
                // isFetching={this.props.isFetching}
            />
        )
    }
}

const mapStateToProps = (state: RootStateType) => ({
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
)

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching
})(UsersContainer)

