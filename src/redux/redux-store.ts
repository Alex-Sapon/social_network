import {createStore, combineReducers} from 'redux'
import profileReducer from './profile-reducer'
import messagesReducer from './messages-reducer'
import usersReducer, {UsersPageProps} from './users-reducer';

export interface PostsProps {
    id: string
    message: string
    likesCount: number
}
export interface UsersProps {
    id: string
    name: string
}
export interface MessagesProps {
    id: string
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
    usersPage: UsersPageProps
}

const reducers = combineReducers({ // собирает reducers в объект
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    usersPage: usersReducer
})

const store = createStore(reducers) // отдаем reducers в store, создавая внутри себя state

export default store

// @ts-ignore
window.store = store