import {createStore, combineReducers} from 'redux'
import profileReducer from './profile-reducer'
import messagesReducer from './messages-reducer'

const reducers = combineReducers({ // передет reducers в объект
    profilePage: profileReducer,
    messagesPage: messagesReducer
})

const store = createStore(reducers) // создает объект со свойствами

export default store