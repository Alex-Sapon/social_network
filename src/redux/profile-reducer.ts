import {v1} from 'uuid';
import {Dispatch} from 'react';
import {usersAPI} from '../API/api';

type PostType = {
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
};

export const profileReducer = (state: RootProfileType = initialState, action: ActionsType): RootProfileType => {
    switch (action.type) {
        case 'UPDATE-POST':
            return {...state, newPost: action.payload.newPost};
        case 'ADD-POST':
            return {...state, posts: [...state.posts, {id: v1(), message: state.newPost, likesCount: 0}], newPost: ''};
        case 'SET-PROFILE':
            return {...state, profile: action.payload.profile};
        default:
            return state;
    }
};

export type ActionsType = ReturnType<typeof addPost> | ReturnType<typeof updatePost>
    | ReturnType<typeof setUserProfile>;

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


export const getUserProfile = (userID: string) => (dispatch: Dispatch<ActionsType>) => {
    usersAPI.getProfile(userID).then(response => {
        dispatch(setUserProfile(response));
    })
}








