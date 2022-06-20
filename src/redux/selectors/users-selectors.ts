import {AppStateType} from '../redux-store';
import {createSelector} from 'reselect';

const getUsersSelector = (state: AppStateType) => state.usersPage.users;

export const getPageSize = (state: AppStateType) => state.usersPage.pageSize;

export const getTotalCount = (state: AppStateType) => state.usersPage.totalCount;

export const getPage = (state: AppStateType) => state.usersPage.currentPage;

export const getIsFetching = (state: AppStateType) => state.usersPage.isFetching;

export const getFollowingProgress = (state: AppStateType) => state.usersPage.followingProgress;


export const getUsers = createSelector(getUsersSelector, (users) => users);