import profileReducer from './profile-reducer';
import messagesReducer from './messages-reducer';

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST = 'UPDATE-NEW-POST'
const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE'


export interface PostsProps {
    id: number
    message: string
    likesCount: number
}

export interface UsersProps {
    id: number
    name: string
}

export interface MessagesProps {
    message: string
}

export interface ProfilePageProps {
    posts: PostsProps[]
    newPost: string
}

export interface MessagesPageProps {
    users: UsersProps[]
    messages: MessagesProps[]
    newMessage: string
}

export interface StoreProps {
    profilePage: ProfilePageProps
    messagesPage: MessagesPageProps
}

export interface DispatchProps {
    type: string
    newPost?: string
    newMessage?: string
}


export const store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'It\'s my first post', likesCount: 3},
                {id: 2, message: 'I want to learn React and TypeScript.', likesCount: 5},
                {id: 3, message: 'I learn English every day.', likesCount: 3},
                {id: 4, message: 'Hi, how are you?', likesCount: 4}
            ],
            newPost: ''
        },
        messagesPage: {
            users: [
                {id: 1, name: 'Sasha'},
                {id: 2, name: 'Kate'},
                {id: 3, name: 'Illya'},
                {id: 4, name: 'Sergey'},
                {id: 5, name: 'Dima'}
            ],
            messages: [
                {message: 'Hello Dima, how are you?'},
                {message: 'Not bad)) And you?'},
                {message: 'I`m happy!'},
                {message: 'Buy, Dima!'},
                {message: 'Buy, Sasha!'}
            ],
            newMessage: ''
        }
    },
    _callSubscriber(state: StoreProps) {
        console.log('State changed')
    },
    getState() {
        return this._state
    },
    subscribe(observer: (state: StoreProps) => void) {
        this._callSubscriber = observer // pattern observer
    },
    dispatch(action: DispatchProps) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagesPage = messagesReducer(this._state.messagesPage, action)

        this._callSubscriber(this._state)
    }
}

// функции, которые возвращают action (объект)

// add post
export const addPostActionCreator = () => ({type: ADD_POST})
export const onPostChangeActionCreator = (text: string) => ({type: UPDATE_NEW_POST, newPost: text})

// add message
export const addMessageActionCreator = () => ({type: ADD_MESSAGE});
export const updateMessageActionCreator = (message: string) => ({type: UPDATE_NEW_MESSAGE, newMessage: message});

