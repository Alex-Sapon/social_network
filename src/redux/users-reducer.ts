import {usersAPI} from '../API/api';
import {AppThunk, ThunkDispatchType} from './hooks';

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

const initialUsers = {
    items: [] as ItemsType[],
    totalCount: 0,
    pageSize: 6,
    currentPage: 1,
    isFetching: false,
    followingProgress: [] as Array<number>,
};

export type UsersStateType = typeof initialUsers;

export const usersReducer = (state: UsersStateType = initialUsers, action: UsersActionsType): UsersStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {...state, items: state.items.map(u => u.id === action.payload.userId ? {...u, followed: true} : u)};
        case 'UNFOLLOW':
            return {
                ...state,
                items: state.items.map(u => u.id === action.payload.userId ? {...u, followed: false} : u)
            };
        case 'SET-USERS':
            return {...state, items: action.payload.users};
        case 'SET-CURRENT-PAGE':
            return {...state, currentPage: action.payload.currentPage};
        case 'SET-TOTAL-USERS-COUNT':
            return {...state, totalCount: action.payload.totalCount};
        case 'TOGGLE-IS-FETCHING':
            return {...state, isFetching: action.payload.isFetching};
        case 'TOGGLE-FOLLOWING-PROGRESS':
            return {
                ...state, followingProgress: action.payload.isFetching
                    ? [...state.followingProgress, action.payload.userId]
                    : state.followingProgress.filter(i => i !== action.payload.userId)
            };
        default:
            return state;
    }
};

export type UsersActionsType = ReturnType<typeof followSuccess> | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers> | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount> | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>

export const followSuccess = (userId: number) => ({
    type: 'FOLLOW',
    payload: {
        userId,
    },
}) as const;
export const unfollowSuccess = (userId: number) => ({
    type: 'UNFOLLOW',
    payload: {
        userId,
    },
}) as const;
export const setUsers = (users: ItemsType[]) => ({
    type: 'SET-USERS',
    payload: {
        users,
    },
}) as const;
export const setCurrentPage = (currentPage: number) => ({
    type: 'SET-CURRENT-PAGE',
    payload: {
        currentPage,
    },
}) as const;
export const setTotalUsersCount = (totalCount: number) => ({
    type: 'SET-TOTAL-USERS-COUNT',
    payload: {
        totalCount,
    },
}) as const;
export const toggleIsFetching = (isFetching: boolean) => ({
    type: 'TOGGLE-IS-FETCHING',
    payload: {
        isFetching,
    },
}) as const;
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => ({
    type: 'TOGGLE-FOLLOWING-PROGRESS',
    payload: {
        isFetching,
        userId,
    },
}) as const;



export const getUser = (currentPage: number, pageSize: number): AppThunk => (dispatch: ThunkDispatchType) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));

    usersAPI.getUsers(currentPage, pageSize).then(res => {
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(res.data.items));
        dispatch(setTotalUsersCount(res.data.totalCount));
    });
};

export const follow = (userId: number): AppThunk => (dispatch: ThunkDispatchType) => {
    dispatch(toggleFollowingProgress(true, userId));

    usersAPI.followUser(userId).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(followSuccess(userId));
        }
        dispatch(toggleFollowingProgress(false, userId));
    });
};

export const unfollow = (userId: number): AppThunk => (dispatch: ThunkDispatchType) => {
    dispatch(toggleFollowingProgress(true, userId));

    usersAPI.unfollowUser(userId).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(unfollowSuccess(userId));
        }
        dispatch(toggleFollowingProgress(false, userId));
    });
};