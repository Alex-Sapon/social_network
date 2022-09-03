import React, {ComponentType} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Users} from './Users';
import {fetchUsers, followUnfollow, UserType} from './users-reducer';
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
    count: number
    totalUsersCount: number
    page: number
    isFetching: boolean
    followingProgress: number[]
};

type MapDispatchPropsType = {
    toggleIsFetching: (isFetching: boolean) => void
    fetchUsers: ({page, count}: {page: number, count: number}) => void
    followUnfollow: (userId: number, isFollow: boolean) => void
};
export type UsersContainerType = MapStatePropsType & MapDispatchPropsType;

class UsersContainer extends React.Component<UsersContainerType> {
    componentDidMount() {
        this.props.fetchUsers({page: this.props.page, count: this.props.count});
    };

    shouldComponentUpdate(nextProps: Readonly<UsersContainerType>, nextState: Readonly<UsersContainerType>): boolean {
        return nextProps !== this.props || nextState !== this.state;
    }

    onChangePage = (page: number) => {
        this.props.fetchUsers({page, count: this.props.count});
    };

    render() {
        return <Users {...this.props} onChangePage={this.onChangePage}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
        users: getUsers(state),
        count: getPageSize(state),
        totalUsersCount: getTotalCount(state),
        page: getPage(state),
        isFetching: getIsFetching(state),
        followingProgress: getFollowingProgress(state),
    }
);

export default compose<ComponentType>(
    connect(mapStateToProps, {fetchUsers, followUnfollow}),
    withAuthRedirect,
)(UsersContainer);

