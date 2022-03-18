import {createStore, combineReducers} from 'redux'
import profileReducer from './profile-reducer'
import messagesReducer from './messages-reducer'

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

export type RootDispatchProps = {
    type: string
    newPost?: string
    newMessage?: string
}

export type RootStateProps = {
    profilePage: ProfilePageProps
    messagesPage: MessagesPageProps
}

const reducers = combineReducers({ // собирает reducers в объект
    profilePage: profileReducer,
    messagesPage: messagesReducer
})

const store = createStore(reducers) // отдаем reducers в store, создавая внутри себя state

export default store

// @ts-ignore
window.store = store