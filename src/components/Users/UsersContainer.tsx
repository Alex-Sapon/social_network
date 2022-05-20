import React from 'react';
import {connect} from 'react-redux';
import {Users} from './Users';
import {toggleIsFetching, ItemsType, getUser, follow, unfollow} from '../../redux/users-reducer';
import {AppStateType} from '../../redux/redux-store';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

type MapStatePropsType = {
    users: ItemsType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingProgress: Array<string>
};
type MapDispatchPropsType = {
    toggleIsFetching: (isFetching: boolean) => void
    getUser: (currentPage: number, pageSize: number) => void
    follow: (userID: string) => void
    unfollow: (userID: string) => void
};
export type UsersContainerType = MapStatePropsType & MapDispatchPropsType;

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

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
        users: state.usersPage.items,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingProgress: state.usersPage.followingProgress,
    }
);



export default withAuthRedirect(connect(
    mapStateToProps,
    {toggleIsFetching, getUser, follow, unfollow})(UsersContainer));

