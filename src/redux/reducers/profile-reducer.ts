import {v1} from 'uuid';
import {profileAPI} from '../../api/api';
import {AppThunk} from '../redux-store';
import {ResultCode} from '../../enums/result-code';
import {AxiosError} from 'axios';

const initialState: RootProfileType = {
    posts: [
        {id: v1(), message: 'It\'s my first Post', likesCount: 3},
        {id: v1(), message: 'Hi, how are you?', likesCount: 4},
        {id: v1(), message: 'I want to learn React and TypeScript.', likesCount: 5},
        {id: v1(), message: 'I learn English every day.', likesCount: 3},
    ],
    profile: {} as ProfileType,
    status: '',
};

export const profileReducer = (state: RootProfileType = initialState, action: ProfileActionsType): RootProfileType => {
    switch (action.type) {
        case 'PROFILE/ADD-POST':
            return {...state, posts: [...state.posts, {id: v1(), message: action.payload.post, likesCount: 0}]};
        case 'PROFILE/SET-PROFILE':
            return {...state, profile: action.payload.profile};
        case 'PROFILE/SET-USER-STATUS':
            return {...state, status: action.payload.status};
        default:
            return state;
    }
};

// ----- actions -----
export const addPost = (post: string) => ({
    type: 'PROFILE/ADD-POST',
    payload: {
        post,
    },
} as const);

export const setUserProfile = (profile: ProfileType) => ({
    type: 'PROFILE/SET-PROFILE',
    payload: {
        profile,
    },
} as const);

export const setUserStatus = (status: string) => ({
    type: 'PROFILE/SET-USER-STATUS',
    payload: {
        status,
    },
} as const);


// ----- thunks -----
export const getUserProfile = (userId: number): AppThunk => dispatch => {
    profileAPI.getProfile(userId)
        .then(res => {
            dispatch(setUserProfile(res.data));
        })
        .catch((err: AxiosError) => {
            console.error(err.message)
        })
};

export const getStatus = (userId: number): AppThunk => dispatch => {
    profileAPI.getStatus(userId)
        .then(res => {
            dispatch(setUserStatus(res.data));
        })
        .catch((err: AxiosError) => {
            console.error(err.message)
        })
};

export const updateStatus = (status: string): AppThunk => dispatch => {
    profileAPI.updateStatus(status)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setUserStatus(status));
            }
        })
        .catch((err: AxiosError) => {
            console.error(err.message)
        })
};


// ----- types -----
export type PostType = {
    id: string
    message: string
    likesCount: number
};

export type ProfileType = {
    aboutMe: string
    contacts: {
        facebook: string
        website: string
        vk: string
        twitter: string
        instagram: string
        youtube: string
        github: string
        mainLink: string
    }
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: {
        small: string
        large: string
    }
};

export type RootProfileType = {
    posts: PostType[]
    profile: ProfileType
    status: string
};

export type ProfileActionsType =
    | ReturnType<typeof addPost>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setUserStatus>









