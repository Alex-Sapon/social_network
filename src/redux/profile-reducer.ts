import {v1} from 'uuid'

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
}

const initialState = {
    posts: [
        {id: v1(), message: 'It\'s my first Post', likesCount: 3},
        {id: v1(), message: 'Hi, how are you?', likesCount: 4},
        {id: v1(), message: 'I want to learn React and TypeScript.', likesCount: 5},
        {id: v1(), message: 'I learn English every day.', likesCount: 3},
    ],
    newPost: '',
    profile: {} as ProfileType
}

type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'UPDATE_POST':
            return {...state, newPost: action.newPost}
        case 'ADD_POST':
            return {...state, posts: [...state.posts, {id: v1(), message: state.newPost, likesCount: 0}], newPost: ''}
        case 'SET_PROFILE':
            return {...state, profile: action.profile}
        default:
            return state
    }
}

type ActionsType = ReturnType<typeof addPost> | ReturnType<typeof updatePost> | ReturnType<typeof setProfile>

export const addPost = () => ({type: 'ADD_POST'} as const)
export const updatePost = (newPost: string) => ({type: 'UPDATE_POST', newPost} as const)
export const setProfile = (profile: ProfileType) => ({type: 'SET_PROFILE', profile} as const)