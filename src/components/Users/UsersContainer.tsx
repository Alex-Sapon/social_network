import React, {ComponentType} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Users} from './Users';
import {toggleIsFetching, getUser, follow, unfollow, ItemsType} from '../../redux/reducers/users-reducer';
import {AppStateType} from '../../redux/redux-store';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

type MapStatePropsType = {
    users: ItemsType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingProgress: Array<number>
    isAuth: boolean
};

type MapDispatchPropsType = {
    toggleIsFetching: (isFetching: boolean) => void
    getUser: (currentPage: number, pageSize: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
};
export type UsersContainerType = MapStatePropsType & MapDispatchPropsType;

class UsersContainer extends React.Component<UsersContainerType> {
    componentDidMount() {
        if (this.props.isAuth) {
            return
        }

        this.props.getUser(this.props.currentPage, this.props.pageSize);
    };

    onChangePage = (page: number) => {
        this.props.getUser(page, this.props.pageSize);
    };

    render() {
        return <Users {...this.props} onChangePage={this.onChangePage}/>
    }
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
        users: state.usersPage.items,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingProgress: state.usersPage.followingProgress,
        isAuth: state.auth.isAuth,

    }
);

export default compose<ComponentType>(
    connect(mapStateToProps, {toggleIsFetching, getUser, follow, unfollow}),
    withAuthRedirect,
)(UsersContainer);

