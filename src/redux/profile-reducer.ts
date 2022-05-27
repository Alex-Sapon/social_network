import {v1} from 'uuid';
import {profileAPI} from '../API/api';
import {AppThunk, ThunkDispatchType} from './hooks';

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
    posts: Array<PostType>
    newPost: string
    profile: ProfileType
    status: string
};

const initialState: RootProfileType = {
    posts: [
        {id: v1(), message: 'It\'s my first Post', likesCount: 3},
        {id: v1(), message: 'Hi, how are you?', likesCount: 4},
        {id: v1(), message: 'I want to learn React and TypeScript.', likesCount: 5},
        {id: v1(), message: 'I learn English every day.', likesCount: 3},
    ],
    newPost: '',
    profile: {} as ProfileType,
    status: '',
};

export const profileReducer = (state: RootProfileType = initialState, action: ProfileActionsType): RootProfileType => {
    switch (action.type) {
        case 'UPDATE-POST':
            return {...state, newPost: action.payload.newPost};
        case 'ADD-POST':
            return {...state, posts: [...state.posts, {id: v1(), message: state.newPost, likesCount: 0}], newPost: ''};
        case 'SET-PROFILE':
            return {...state, profile: action.payload.profile};
        case 'SET-USER-STATUS':
            return {...state, status: action.payload.status};
        default:
            return state;
    }
};

export type ProfileActionsType = ReturnType<typeof addPost>
    | ReturnType<typeof updatePost>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setUserStatus>

export const addPost = () => ({type: 'ADD-POST'}) as const;
export const updatePost = (newPost: string) => ({
    type: 'UPDATE-POST',
    payload: {
        newPost,
    },
}) as const;
export const setUserProfile = (profile: ProfileType) => ({
    type: 'SET-PROFILE',
    payload: {
        profile,
    },
}) as const;
export const setUserStatus = (status: string) => ({
    type: 'SET-USER-STATUS',
    payload: {
        status,
    }
}) as const;


export const getUserProfile = (userId: number): AppThunk => (dispatch: ThunkDispatchType) => {
    profileAPI.getProfile(userId).then(res => {
        dispatch(setUserProfile(res.data));
    })
};

export const getStatus = (userId: number): AppThunk => (dispatch: ThunkDispatchType) => {
    profileAPI.getStatus(userId).then(res => {
        dispatch(setUserStatus(res.data));
    })
};

export const updateStatus = (status: string): AppThunk => (dispatch: ThunkDispatchType) => {
  profileAPI.updateStatus(status).then(response => {
      if (response.data.resultCode === 0) {
          dispatch(setUserStatus(status));
      }

  })
}









