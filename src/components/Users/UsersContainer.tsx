import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import {ActionTypes, followAC, setCurrentPageAC, toggleIsFetchingAC, setTotalUsersCountAC,
    setUsersAC, unfollowAC, UsersType} from '../../redux/users-reducer';
import {RootStateProps} from '../../redux/redux-store';
import axios from 'axios';
import {Preloader} from '../../common/Preloader/Preloader';
import styles from './UsersContainer.module.css'

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
    isFetching: boolean
    toggleIsFetching: (isFetching: boolean) => void
}

class UsersContainer extends React.Component<UsersTypeProps> {
    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.data.items)
            this.props.setTotalUsersCount(data.data.totalCount)
        })
    }

    onChangePage = (page: number) => { // arrow function !!!!!!!!!!!!!
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(page)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.data.items)
        })
    }

    render() {
        return (
            <>
                {this.props.isFetching && <Preloader className={styles.preloader} stylePreloader={styles.preloader}/>}
                <Users
                    users={this.props.users}
                    totalUsersCount={this.props.totalUsersCount}
                    currentPage={this.props.currentPage}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    onChangePage={this.onChangePage}
                />
            </>

        )
    }
}

const mapStateToProps = (state: RootStateProps) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) => {
    return {
        follow: (userId: string) => dispatch(followAC(userId)),
        unfollow: (userId: string) => dispatch(unfollowAC(userId)),
        setUsers: (users: UsersType[]) => dispatch(setUsersAC(users)),
        setCurrentPage: (currentPage: number) => dispatch(setCurrentPageAC(currentPage)),
        setTotalUsersCount: (totalUsersCount: number) => dispatch(setTotalUsersCountAC(totalUsersCount)),
        toggleIsFetching: (isFetching: boolean) => dispatch(toggleIsFetchingAC(isFetching))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)

