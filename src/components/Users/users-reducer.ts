import {ResultCode} from '../../enums/result-code';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {usersAPI} from './apiUsers';

export const fetchUsers = createAsyncThunk<{ users: UserType[], totalCount: number, page: number },
    { page: number, count: number }, { rejectValue: string }>('users/fetchUsers', async ({
                                                                                             page,
                                                                                             count
                                                                                         }, {rejectWithValue}) => {
    try {
        const res = await usersAPI.getUsers({page, count});
        return {users: res.data.items, totalCount: res.data.totalCount, page};
    } catch (e) {
        return rejectWithValue((e as AxiosError).message);
    }
})

export const followUnfollow = createAsyncThunk<{ userId: number, isFollow: boolean },
    { userId: number, isFollow: boolean },
    { rejectValue: string }>('users/followUnfollow', async ({userId, isFollow}, {dispatch, rejectWithValue}) => {

    const apiMethod = isFollow ? usersAPI.followUser.bind(usersAPI) : usersAPI.unfollowUser.bind(usersAPI);

    try {
        dispatch(toggleFollowingProgress({isLoading: true, userId}));
        const res = await apiMethod(userId);

        if (res.data.resultCode === ResultCode.Success) {
            return {userId, isFollow};
        }

        return rejectWithValue(res.data.messages[0]);
    } catch (e) {
        return rejectWithValue((e as AxiosError).message);
    } finally {
        dispatch(toggleFollowingProgress({isLoading: false, userId}));
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
    reducers: {
        toggleFollowingProgress(state, action: PayloadAction<{ isLoading: boolean, userId: number }>) {
            const index = state.followingProgress.findIndex(item => item === action.payload.userId);
            action.payload.isLoading
                ? state.followingProgress.push(action.payload.userId)
                : state.followingProgress.splice(index, 1);
        }
    },
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
            .addCase(followUnfollow.fulfilled, (state, action) => {
                return state.users.forEach(user => user.id === action.payload.userId ? user.followed = action.payload.isFollow : user)
            })
    }
})

export const usersReducer = usersSlice.reducer;
export const {toggleFollowingProgress} = usersSlice.actions;

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