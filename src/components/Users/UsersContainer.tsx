import React from 'react';
import {connect} from 'react-redux';
import {Users} from './Users';
import {
    toggleIsFetching,
    ItemsType,
    toggleFollowingProgress,
    getUser,
    follow,
    unfollow
} from '../../redux/users-reducer';
import {RootStateType} from '../../redux/redux-store';

type MapStatePropsType = {
    users: ItemsType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingProgress: Array<string>
}
type MapDispatchPropsType = {
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingProgress: (isFetching: boolean, id: string) => void
    getUser: (currentPage: number, pageSize: number) => void
    follow: (userID: string) => void
    unfollow: (userID: string) => void
}
export type UsersContainerType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<UsersContainerType> {
    componentDidMount() {
        this.props.getUser(this.props.currentPage, this.props.pageSize);
    };

    onChangePage = (page: number) => {
        this.props.getUser(page, this.props.pageSize);
    };

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
    toggleIsFetching, toggleFollowingProgress, getUser,
    follow, unfollow,
})(UsersContainer);

