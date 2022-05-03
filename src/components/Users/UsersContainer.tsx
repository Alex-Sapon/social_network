import React from 'react';
import {connect} from 'react-redux';
import {Users} from './Users';
import {
    follow,
    setCurrentPage,
    toggleIsFetching,
    setTotalUsersCount,
    setUsers,
    unfollow,
    ItemsType, toggleFollowingProgress, getUsers
} from '../../redux/users-reducer';
import {RootStateType} from '../../redux/redux-store';
import {usersAPI} from '../../API/api';

type MapStatePropsType = {
    users: ItemsType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingProgress: Array<string>
}
type MapDispatchPropsType = {
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: ItemsType[]) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingProgress: (isFetching: boolean, id: string) => void
}
export type UsersContainerType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<UsersContainerType> {
    componentDidMount() {
        getUsers(this.props.currentPage, this.props.pageSize);

        // this.props.toggleIsFetching(true)
        // usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(response => {
        //     this.props.toggleIsFetching(false)
        //     this.props.setUsers(response.items)
        //     this.props.setTotalUsersCount(response.totalCount)
        // })
    }

    onChangePage = (page: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(page)
        usersAPI.getUsers(page, this.props.pageSize).then(response => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(response.items)
        })
    }

    render() {
        return <Users {...this.props} onChangePage={this.onChangePage}/>
    }
};

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
        users: state.usersPage.items,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingProgress: state.usersPage.followingProgress,
    }
);

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    toggleFollowingProgress,
    getUsers
})(UsersContainer);

