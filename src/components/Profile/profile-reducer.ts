import {v1} from 'uuid';
import {AppStateType} from '../App/redux-store';
import {ResultCode} from '../../enums/result-code';
import {stopSubmit} from 'redux-form';
import {INewPhoto, IProfile, IUpdateProfile} from '../../api';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {profileAPI} from './apiProfile';

export const getUserProfile = createAsyncThunk<{ profile: IProfile }, number, { rejectValue: string }>
('profile/getUserProfile', async (userId: number, {rejectWithValue}) => {
    try {
        const res = await profileAPI.getProfile(userId);
        return {profile: res.data};
    } catch (e) {
        return rejectWithValue((e as AxiosError).message);
    }
})

export const getStatus = createAsyncThunk<{ status: string }, number, { rejectValue: string }>
('profile/getStatus', async (userId, {rejectWithValue}) => {
    try {
        const res = await profileAPI.getStatus(userId);
        return {status: res.data};
    } catch (e) {
        return rejectWithValue((e as AxiosError).message);
    }
})

export const updateStatus = createAsyncThunk('profile/updateStatus', async (status: string, {rejectWithValue}) => {
    try {
        const res = await profileAPI.updateStatus(status);
        if (res.data.resultCode === ResultCode.Success) {
            return {status};
        }

        return rejectWithValue(res.data.messages[0]);
    } catch (e) {
        return rejectWithValue((e as AxiosError).message);
    }
})

export const setPhoto = createAsyncThunk<{ photos: INewPhoto }, File, { rejectValue: string }>('profile/setPhoto', async (photo, {rejectWithValue}) => {
    try {
        const res = await profileAPI.savePhoto(photo);
        if (res.data.resultCode === ResultCode.Success) {
            return {photos: res.data.data.photos};
        }

        return rejectWithValue(res.data.messages[0]);
    } catch (e) {
        return rejectWithValue((e as AxiosError).message);
    }
})

export const updateProfile = createAsyncThunk<void, IUpdateProfile, { rejectValue: string }>
('profile/updateProfile', async (profile, {dispatch, rejectWithValue, getState}) => {
    const userId = (getState() as AppStateType).auth.authParams.id;

    try {
        const res = await profileAPI.updateProfile(profile);

        if (res.data.resultCode === ResultCode.Success) {
            dispatch(getUserProfile(userId));
        }

        if (res.data.resultCode === ResultCode.Error) {
            let wrongNetwork = res.data.messages[0]
                .slice(res.data.messages[0].indexOf('>') + 1, res.data.messages[0].indexOf(')'))
                .toLowerCase();

            dispatch(stopSubmit('profileForm', {'contacts': {[wrongNetwork]: res.data.messages[0]}}));
            return Promise.reject(res.data.messages[0]);
        }
    } catch (e) {
        return rejectWithValue((e as AxiosError).message);
    }
})

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        posts: [],
        profile: {} as IProfile,
        status: '',
        statusLoading: 'idle',
    } as RootProfileType,
    reducers: {
        addPost(state, action: PayloadAction<{ post: string }>) {
            state.posts.push({id: v1(), post: action.payload.post, likesCount: 0});
        },
        setLoadingStatus(state, action: PayloadAction<{ status: 'idle' | 'loading' }>) {
            state.status = action.payload.status;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.statusLoading = 'loading';
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.profile = action.payload.profile;
                state.statusLoading = 'idle';
            })
            .addCase(getStatus.fulfilled, (state, action) => {
                state.status = action.payload.status;
            })
            .addCase(updateStatus.pending, (state) => {
                state.statusLoading = 'loading';
            })
            .addCase(updateStatus.fulfilled, (state, action) => {
                state.status = action.payload.status;
                state.statusLoading = 'idle';
            })
            .addCase(setPhoto.pending, (state) => {
                state.statusLoading = 'loading';
            })
            .addCase(setPhoto.fulfilled, (state, action) => {
                state.profile.photos = action.payload.photos;
                state.statusLoading = 'idle';
            })
    }
})

export const profileReducer = profileSlice.reducer;
export const {addPost, setLoadingStatus} = profileSlice.actions;
export const profileAsyncActions = {getUserProfile, getStatus, updateStatus, setPhoto, updateProfile};

export type PostType = {
    id: string
    post: string
    likesCount: number
};

export type RootProfileType = {
    posts: PostType[]
    profile: IProfile
    status: string
    statusLoading: 'idle' | 'loading'
};









