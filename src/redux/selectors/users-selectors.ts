import {AppStateType} from '../redux-store';

export const getUsers = (state: AppStateType) => {
  return state.usersPage.items;
}

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}

export const getTotalCount = (state: AppStateType) => {
    return state.usersPage.totalCount;
}

export const getPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}

export const getFollowingProgress = (state: AppStateType) => {
    return state.usersPage.followingProgress;
}