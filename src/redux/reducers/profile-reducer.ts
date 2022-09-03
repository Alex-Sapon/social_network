import {v1} from 'uuid';
import {AppStateType, AppThunk} from '../redux-store';
import {ResultCode} from '../../enums/result-code';
import {stopSubmit} from 'redux-form';
import {INewPhoto, IProfile, IUpdateProfile, profileAPI} from '../../api';

const initialState: RootProfileType = {
    posts: [
        {id: v1(), post: 'It\'s my first Post', likesCount: 3},
        {id: v1(), post: 'Hi, how are you?', likesCount: 4},
        {id: v1(), post: 'I want to learn React and TypeScript.', likesCount: 5},
        {id: v1(), post: 'I learn English every day.', likesCount: 3},
    ],
    profile: {} as IProfile,
    status: '',
    statusLoading: 'idle',
};

export const profileReducer = (state: RootProfileType = initialState, action: ProfileActions): RootProfileType => {
    switch (action.type) {
        case 'PROFILE/SET-POST':
            return {...state, posts: [...state.posts, {id: v1(), post: action.post, likesCount: 0}]};
        case 'PROFILE/SET-PROFILE':
            return {...state, profile: action.profile};
        case 'PROFILE/SET-USER-STATUS':
            return {...state, status: action.status};
        case 'PROFILE/SET-PROFILE-PHOTO':
            return {...state, profile: {...state.profile, photos: action.photos}};
        case 'PROFILE/SET-LOADING-STATUS':
            return {...state, statusLoading: action.status};
        default:
            return state;
    }
};

export const addPost = (post: string) => ({
    type: 'PROFILE/SET-POST',
    post,
} as const);

export const setUserProfile = (profile: IProfile) => ({
    type: 'PROFILE/SET-PROFILE',
    profile,
} as const);

export const updateUserProfile = (updatedProfile: IUpdateProfile) => ({
    type: 'PROFILE/UPDATE-PROFILE',
    updatedProfile,
} as const);

export const setUserStatus = (status: string) => ({
    type: 'PROFILE/SET-USER-STATUS',
    status,
} as const);

export const setUserPhoto = (photos: INewPhoto) => ({
    type: 'PROFILE/SET-PROFILE-PHOTO',
    photos,
} as const);

export const setLoadingStatus = (status: 'idle' | 'loading') => ({
    type: 'PROFILE/SET-LOADING-STATUS',
    status,
} as const);

export const getUserProfile = (userId: number): AppThunk => async dispatch => {
    dispatch(setLoadingStatus('loading'));

    try {
        const res = await profileAPI.getProfile(userId);
        dispatch(setUserProfile(res.data));
    } catch (e) {

    } finally {
        dispatch(setLoadingStatus('idle'));
    }
};

export const getStatus = (userId: number): AppThunk => async dispatch => {
    try {
        const res = await profileAPI.getStatus(userId);
        dispatch(setUserStatus(res.data));
    } catch (e) {

    }
};

export const updateStatus = (status: string): AppThunk => async dispatch => {
    dispatch(setLoadingStatus('loading'));

    try {
        const res = await profileAPI.updateStatus(status);
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(setUserStatus(status));
        }
    } catch (e) {

    } finally {
        dispatch(setLoadingStatus('idle'));
    }
};

export const setPhoto = (photo: File): AppThunk => async dispatch => {
    try {
        const res = await profileAPI.savePhoto(photo);
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(setUserPhoto(res.data.data.photos));
        }
    } catch (e) {

    }
};

export const updateProfile = (profile: IUpdateProfile): AppThunk => async (dispatch, getState: () => AppStateType) => {
    const userId = getState().auth.authParams.id;

    try {
        const res = await profileAPI.updateProfile(profile);

        if (res.data.resultCode === ResultCode.Success) {
            dispatch(getUserProfile(userId));
        }

        if (res.data.resultCode === ResultCode.Error) {
            let wrongNetwork = res.data.messages[0]
                .slice(res.data.messages[0].indexOf(">") + 1, res.data.messages[0].indexOf(")"))
                .toLowerCase();

            dispatch(stopSubmit('profileForm', {"contacts": {[wrongNetwork]: res.data.messages[0]}}));
            return Promise.reject(res.data.messages[0]);
        }

    } catch (e) {

    } finally {

    }
};

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

export type ProfileActions =
    | ReturnType<typeof addPost>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setUserStatus>
    | ReturnType<typeof setUserStatus>
    | ReturnType<typeof setUserPhoto>
    | ReturnType<typeof setLoadingStatus>
    | ReturnType<typeof updateUserProfile>









