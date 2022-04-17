import {combineReducers, createStore} from 'redux'
import {profileReducer} from './profile-reducer'
import {messagesReducer} from './messages-reducer'
import {usersReducer} from './users-reducer';

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

type RootReducerType = typeof rootReducer
export type RootStateType = ReturnType<RootReducerType>

const rootReducer = combineReducers({ // собирает reducers в объект
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    usersPage: usersReducer
})

export const store = createStore(rootReducer) // отдаем rootReducer в store, создавая внутри себя state

// @ts-ignore
window.store = store