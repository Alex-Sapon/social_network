import {usersAPI} from '../../api/api';
import {AppThunk} from '../redux-store';
import {AxiosError} from 'axios';
import {ResultCode} from '../../enums/result-code';

const initialState = {
    users: [] as UserType[],
    totalCount: 0,
    pageSize: 6,
    currentPage: 1,
    isFetching: false,
    followingProgress: [] as number[],
};

export type UsersStateType = typeof initialState;

export const usersReducer = (state: UsersStateType = initialState, action: UsersActions): UsersStateType => {
    switch (action.type) {
        case 'USERS/FOLLOW-UNFOLLOW-TO-USER':
            return {...state, users: state.users
                    .map(user => user.id === action.userId ? {...user, followed: action.isFollow} : user)};
        case 'USERS/SET-USERS':
            return {...state, users: action.users};
        case 'USERS/SET-CURRENT-PAGE':
            return {...state, currentPage: action.page};
        case 'USERS/SET-TOTAL-USERS-COUNT':
            return {...state, totalCount: action.totalCount};
        case 'USERS/TOGGLE-IS-FETCHING':
            return {...state, isFetching: action.isFetching};
        case 'USERS/TOGGLE-FOLLOWING-PROGRESS':
            return {...state, followingProgress: action.isFetching
                    ? [...state.followingProgress, action.userId]
                    : state.followingProgress.filter(i => i !== action.userId)};
        default:
            return state;
    }
};

export const followUnfollowToUser = (userId: number, isFollow: boolean) => ({
    type: 'USERS/FOLLOW-UNFOLLOW-TO-USER',
    userId,
    isFollow,
} as const);

export const setUsers = (users: UserType[]) => ({
    type: 'USERS/SET-USERS',
    users,
} as const);

export const setCurrentPage = (page: number) => ({
    type: 'USERS/SET-CURRENT-PAGE',
    page,
} as const);

export const setTotalUsersCount = (totalCount: number) => ({
    type: 'USERS/SET-TOTAL-USERS-COUNT',
    totalCount,
} as const);

export const toggleIsFetching = (isFetching: boolean) => ({
    type: 'USERS/TOGGLE-IS-FETCHING',
    isFetching,
} as const);

export const toggleFollowingProgress = (isFetching: boolean, userId: number) => ({
    type: 'USERS/TOGGLE-FOLLOWING-PROGRESS',
    isFetching,
    userId,
} as const);

export const fetchUsers = (page: number, pageSize: number): AppThunk => async dispatch => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));

    try {
        const res = await usersAPI.getUsers(page, pageSize);

        dispatch(setUsers(res.data.items));
        dispatch(setTotalUsersCount(res.data.totalCount));
    } catch (e) {

    } finally {
        dispatch(toggleIsFetching(false));
    }
};

export const followUnfollow = (userId: number, isFollow: boolean): AppThunk => async dispatch => {
    const apiMethod = isFollow ? usersAPI.followUser.bind(usersAPI) : usersAPI.unfollowUser.bind(usersAPI);

    dispatch(toggleFollowingProgress(true, userId));

    try {
        const res = await apiMethod(userId);

        if (res.data.resultCode === ResultCode.Success) {
            dispatch(followUnfollowToUser(userId, isFollow));
        }
    } catch (e) {

    } finally {
        dispatch(toggleFollowingProgress(false, userId));
    }
};

export type UserType = {
    name: string
    id: number
    uniqueUrlName: string | null
    photos: {
        small: string | null
        large: string | null
    }
    status: string | null
    followed: boolean
};

export type UsersActions =
    | ReturnType<typeof followUnfollowToUser>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>