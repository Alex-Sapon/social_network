import {combineReducers, createStore} from 'redux'
import {profileReducer} from './profile-reducer'
import {messagesReducer} from './messages-reducer'
import {usersReducer} from './users-reducer';
import {authReducer} from './auth-reducer';

export type RootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({ // собирает reducers в объект
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    usersPage: usersReducer,
    auth: authReducer
})

export const store = createStore(rootReducer) // отдаем rootReducer в store, создавая внутри себя state

// @ts-ignore
window.store = store