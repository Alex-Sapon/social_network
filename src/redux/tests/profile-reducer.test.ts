import { v1 } from "uuid"
import {addPost, profileReducer, ProfileType, RootProfileState, setUserProfile, updatePost} from '../profile-reducer'

test('text of post should be updated', () => {
    const initialState: RootProfileState = {
        posts: [
            {id: v1(), message: 'It\'s my first Post', likesCount: 3},
            {id: v1(), message: 'Hi, how are you?', likesCount: 4},
            {id: v1(), message: 'I want to learn React and TypeScript.', likesCount: 5},
            {id: v1(), message: 'I learn English every day.', likesCount: 3},
        ],
        newPost: '',
        profile: {} as ProfileType
    }

    const endState = profileReducer(initialState, updatePost('Update is success'))

    expect(endState.newPost).toBe('Update is success')
})

test('new post should be added', () => {
    const initialState: RootProfileState = {
        posts: [
            {id: v1(), message: 'It\'s my first Post', likesCount: 3},
            {id: v1(), message: 'Hi, how are you?', likesCount: 4},
            {id: v1(), message: 'I want to learn React and TypeScript.', likesCount: 5},
            {id: v1(), message: 'I learn English every day.', likesCount: 3},
        ],
        newPost: '',
        profile: {} as ProfileType
    }

    const endState = profileReducer(initialState, addPost())

    expect(endState.posts.length).toBe(5)
})

test('current profile should be added', () => {
    const initialState: RootProfileState = {
        posts: [
            {id: v1(), message: 'It\'s my first Post', likesCount: 3},
            {id: v1(), message: 'Hi, how are you?', likesCount: 4},
            {id: v1(), message: 'I want to learn React and TypeScript.', likesCount: 5},
            {id: v1(), message: 'I learn English every day.', likesCount: 3},
        ],
        newPost: '',
        profile: {} as ProfileType
    }

    const profile: ProfileType = {
        aboutMe: 'I`m happy!',
        contacts: {
            facebook: 'FB.com',
            website: 'asdasd.com',
            vk: 'VK.ru',
            twitter: 'twitter.com',
            instagram: 'instagram.com',
            youtube: 'youtube.com',
            github: 'github.com',
            mainLink: 'myLink',
        },
        lookingForAJob: true,
        lookingForAJobDescription: 'Best of the best',
        fullName: 'Bob',
        userId: 1,
        photos: {
            small: 'non',
            large: 'non'
        }
    }

    const endState = profileReducer(initialState, setUserProfile(profile))

    const keys = Object.keys(profile)

    expect(keys.length).toBe(7)
    expect(endState.profile.fullName).toBe('Bob')
    expect(endState.profile.photos.small).toBe('non')  
})