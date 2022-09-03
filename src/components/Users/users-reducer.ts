import {AppThunk} from '../../redux/redux-store';
import {ResultCode} from '../../enums/result-code';
import {usersAPI} from '../../api';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

export const fetchUsers = createAsyncThunk<{ users: UserType[], totalCount: number, page: number },
    { page: number, count: number }>('users/fetchUsers', async ({page, count}, {rejectWithValue}) => {
    try {
        const res = await usersAPI.getUsers({page, count});
        return {users: res.data.items, totalCount: res.data.totalCount, page};
    } catch (e) {
        return rejectWithValue((e as AxiosError).message);
    }
})

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [] as UserType[],
        totalCount: 0,
        count: 6,
        page: 1,
        isLoading: false,
        followingProgress: [] as number[],
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload.users;
                state.page = action.payload.page;
                state.totalCount = action.payload.totalCount;
                state.isLoading = false;
            })
    }
})

export const usersReducer = usersSlice.reducer;

// export const usersReducer = (state: UsersStateType = initialState, action: UsersActions): UsersStateType => {
//     switch (action.type) {
//         case 'USERS/FOLLOW-UNFOLLOW-TO-USER':
//             return {
//                 ...state, users: state.users
//                     .map(user => user.id === action.userId ? {...user, followed: action.isFollow} : user)
//             };
//         case 'USERS/TOGGLE-FOLLOWING-PROGRESS':
//             return {
//                 ...state, followingProgress: action.isFetching
//                     ? [...state.followingProgress, action.userId]
//                     : state.followingProgress.filter(i => i !== action.userId)
//             };
//         default:
//             return state;
//     }
// };

export const followUnfollowToUser = (userId: number, isFollow: boolean) => ({
    type: 'USERS/FOLLOW-UNFOLLOW-TO-USER',
    userId,
    isFollow,
} as const);

export const toggleFollowingProgress = (isFetching: boolean, userId: number) => ({
    type: 'USERS/TOGGLE-FOLLOWING-PROGRESS',
    isFetching,
    userId,
} as const);


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
    | ReturnType<typeof toggleFollowingProgress>