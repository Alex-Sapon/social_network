import {v1} from 'uuid';
import {addPost, profileReducer, RootProfileType, getUserProfile} from '../../components/Profile/profile-reducer';
import {IProfile} from '../../api';

let startState: RootProfileType;
let profile: IProfile;

beforeEach(() => {
    startState = {
        posts: [
            {id: v1(), post: 'It\'s my first Post', likesCount: 3},
            {id: v1(), post: 'Hi, how are you?', likesCount: 4},
            {id: v1(), post: 'I want to learn React and TypeScript.', likesCount: 5},
            {id: v1(), post: 'I learn English every day.', likesCount: 3},
        ],
        profile: {} as IProfile,
        status: '',
        statusLoading: 'idle',
    }

    profile = {
        aboutMe: 'I`m happy!',
        contacts: {
            facebook: 'FB.com',
            website: 'fake@.com',
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
});

test('new post should be added', () => {
    const endState = profileReducer(startState, addPost({post: 'New post'}));

    expect(endState.posts.length).toBe(5);
});

test('current profile should be added', () => {
    const endState = profileReducer(startState, getUserProfile.fulfilled({profile}, '', 23551));

    const keys = Object.keys(endState.profile);

    expect(keys.length).toBe(7);
    expect(endState.profile.fullName).toBe('Bob');
    expect(endState.profile.photos.small).toBe('non');
});