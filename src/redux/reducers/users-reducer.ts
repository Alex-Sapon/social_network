import {usersAPI} from '../../api/api';
import {AppThunk} from '../redux-store';
import {AxiosError} from 'axios';
import {ResultCode} from '../../enums/result-code';

const initialUsers = {
    items: [] as ItemsType[],
    totalCount: 0,
    pageSize: 6,
    currentPage: 1,
    isFetching: false,
    followingProgress: [] as number[],
};

export type UsersStateType = typeof initialUsers;

export const usersReducer = (state: UsersStateType = initialUsers, action: UsersActionsType): UsersStateType => {
    switch (action.type) {
        case 'USERS/FOLLOW':
            return {...state, items: state.items.map(u => u.id === action.payload.userId ? {...u, followed: true} : u)};
        case 'USERS/UNFOLLOW':
            return {
                ...state,
                items: state.items.map(u => u.id === action.payload.userId ? {...u, followed: false} : u)
            };
        case 'USERS/SET-USERS':
            return {...state, items: action.payload.users};
        case 'USERS/SET-CURRENT-PAGE':
            return {...state, currentPage: action.payload.currentPage};
        case 'USERS/SET-TOTAL-USERS-COUNT':
            return {...state, totalCount: action.payload.totalCount};
        case 'USERS/TOGGLE-IS-FETCHING':
            return {...state, isFetching: action.payload.isFetching};
        case 'USERS/TOGGLE-FOLLOWING-PROGRESS':
            return {
                ...state, followingProgress: action.payload.isFetching
                    ? [...state.followingProgress, action.payload.userId]
                    : state.followingProgress.filter(i => i !== action.payload.userId)
            };
        default:
            return state;
    }
};


export const followSuccess = (userId: number) => ({
    type: 'USERS/FOLLOW',
    payload: {
        userId,
    },
} as const);

export const unfollowSuccess = (userId: number) => ({
    type: 'USERS/UNFOLLOW',
    payload: {
        userId,
    },
} as const);

export const setUsers = (users: ItemsType[]) => ({
    type: 'USERS/SET-USERS',
    payload: {
        users,
    },
} as const);

export const setCurrentPage = (currentPage: number) => ({
    type: 'USERS/SET-CURRENT-PAGE',
    payload: {
        currentPage,
    },
} as const);

export const setTotalUsersCount = (totalCount: number) => ({
    type: 'USERS/SET-TOTAL-USERS-COUNT',
    payload: {
        totalCount,
    },
} as const);
export const toggleIsFetching = (isFetching: boolean) => ({
    type: 'USERS/TOGGLE-IS-FETCHING',
    payload: {
        isFetching,
    },
} as const);

export const toggleFollowingProgress = (isFetching: boolean, userId: number) => ({
    type: 'USERS/TOGGLE-FOLLOWING-PROGRESS',
    payload: {
        isFetching,
        userId,
    },
} as const);


export const fetchUsers = (currentPage: number, pageSize: number): AppThunk => dispatch => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));

    usersAPI.getUsers(currentPage, pageSize)
        .then(res => {
            dispatch(setUsers(res.data.items));
            dispatch(setTotalUsersCount(res.data.totalCount));
        })
        .catch((err: AxiosError) => {
            console.error(err.message);
        })
        .finally(() => {
            dispatch(toggleIsFetching(false));
        });
};

export const follow = (userId: number): AppThunk => dispatch => {
    dispatch(toggleFollowingProgress(true, userId));

    usersAPI.followUser(userId)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(followSuccess(userId));
            }
        })
        .catch((err: AxiosError) => {
            console.log(err.message)
        })
        .finally(() => {
            dispatch(toggleFollowingProgress(false, userId));
        });
};

export const unfollow = (userId: number): AppThunk => dispatch => {
    dispatch(toggleFollowingProgress(true, userId));

    usersAPI.unfollowUser(userId)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(unfollowSuccess(userId));
            }
        })
        .catch(() => {

        })
        .finally(() => {
            dispatch(toggleFollowingProgress(false, userId));
        })
};


export type UsersActionsType =
    | ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>

export type ItemsType = {
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