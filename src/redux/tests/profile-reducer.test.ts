import {v1} from 'uuid';
import {addPost, profileReducer, ProfileType, RootProfileType, setUserProfile, updatePost} from '../profile-reducer';

let startState: RootProfileType;

beforeEach(() => {
    startState = {
        posts: [
            {id: v1(), message: 'It\'s my first Post', likesCount: 3},
            {id: v1(), message: 'Hi, how are you?', likesCount: 4},
            {id: v1(), message: 'I want to learn React and TypeScript.', likesCount: 5},
            {id: v1(), message: 'I learn English every day.', likesCount: 3},
        ],
        newPost: '',
        profile: {} as ProfileType,
        status: ''
    }
})

test('text of post should be updated', () => {
    const endState = profileReducer(startState, updatePost('Update is success'));

    expect(endState.newPost).toBe('Update is success');
})

test('new post should be added', () => {
    const endState = profileReducer(startState, addPost());

    expect(endState.posts.length).toBe(5);
})

test('current profile should be added', () => {
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

    const endState = profileReducer(startState, setUserProfile(profile))

    const keys = Object.keys(profile)

    expect(keys.length).toBe(7)
    expect(endState.profile.fullName).toBe('Bob')
    expect(endState.profile.photos.small).toBe('non')
})