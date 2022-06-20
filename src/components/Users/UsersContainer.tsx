import React, {ComponentType} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Users} from './Users';
import {fetchUsers, followUnfollow, UserType, toggleIsFetching} from '../../redux/reducers/users-reducer';
import {AppStateType} from '../../redux/redux-store';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {
    getFollowingProgress,
    getIsFetching,
    getPage,
    getPageSize,
    getTotalCount,
    getUsers
} from '../../redux/selectors/users-selectors';

type MapStatePropsType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingProgress: number[]
};

type MapDispatchPropsType = {
    toggleIsFetching: (isFetching: boolean) => void
    fetchUsers: (currentPage: number, pageSize: number) => void
    followUnfollow: (userId: number, isFollow: boolean) => void
};
export type UsersContainerType = MapStatePropsType & MapDispatchPropsType;

class UsersContainer extends React.Component<UsersContainerType> {
    componentDidMount() {
        this.props.fetchUsers(this.props.currentPage, this.props.pageSize);
    };

    shouldComponentUpdate(nextProps: Readonly<UsersContainerType>, nextState: Readonly<UsersContainerType>): boolean {
        return nextProps !== this.props || nextState !== this.state;
    }

    onChangePage = (page: number) => {
        this.props.fetchUsers(page, this.props.pageSize);
    };

    render() {
        console.log('RENDER')
        return <Users {...this.props} onChangePage={this.onChangePage}/>
    }
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalCount(state),
        currentPage: getPage(state),
        isFetching: getIsFetching(state),
        followingProgress: getFollowingProgress(state),
    }
);

export default compose<ComponentType>(
    connect(mapStateToProps, {toggleIsFetching, fetchUsers, followUnfollow}),
    withAuthRedirect,
)(UsersContainer);

