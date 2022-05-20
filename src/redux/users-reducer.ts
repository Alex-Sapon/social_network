import {usersAPI} from '../API/api';
import {AppThunk, ThunkDispatchType} from './hooks';

type AddressType = {
    country: string
    city: string
};
export type ItemsType = {
    name: string
    id: string
    uniqueUrlName: string
    photos: {
        small: string | null,
        large: string | null
    }
    status: string
    followed: boolean
    address: AddressType
};

const initialUsers = {
    items: [] as ItemsType[],
    totalCount: 0,
    pageSize: 6,
    currentPage: 1,
    isFetching: false,
    followingProgress: [] as Array<string>,
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
                    ? [...state.followingProgress, action.payload.id]
                    : state.followingProgress.filter(i => i !== action.payload.id)
            };
        default:
            return state;
    }
};

export type UsersActionsType = ReturnType<typeof followSuccess> | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers> | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount> | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>

export const followSuccess = (userId: string) => ({
    type: 'FOLLOW',
    payload: {
        userId,
    },
}) as const;
export const unfollowSuccess = (userId: string) => ({
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
export const toggleFollowingProgress = (isFetching: boolean, id: string) => ({
    type: 'TOGGLE-FOLLOWING-PROGRESS',
    payload: {
        isFetching,
        id,
    },
}) as const;



export const getUser = (currentPage: number, pageSize: number): AppThunk => (dispatch: ThunkDispatchType) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    usersAPI.getUsers(currentPage, pageSize).then(response => {
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.items));
        dispatch(setTotalUsersCount(response.totalCount));
    });
};

export const follow = (userID: string): AppThunk => (dispatch: ThunkDispatchType) => {
    dispatch(toggleFollowingProgress(true, userID));
    usersAPI.followUsers(userID).then(response => {
        if (response.resultCode === 0) {
            dispatch(followSuccess(userID));
        }
        dispatch(toggleFollowingProgress(false, userID));
    });
};

export const unfollow = (userID: string): AppThunk => (dispatch: ThunkDispatchType) => {
    dispatch(toggleFollowingProgress(true, userID));
    usersAPI.unfollowUsers(userID).then(response => {
        if (response.resultCode === 0) {
            dispatch(unfollowSuccess(userID));
        }
        dispatch(toggleFollowingProgress(false, userID));
    });
};