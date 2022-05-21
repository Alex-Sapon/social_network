import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {profileReducer} from './profile-reducer';
import {messagesReducer} from './messages-reducer';
import {usersReducer} from './users-reducer';
import {authReducer} from './auth-reducer';
import {reducer as formReducer} from 'redux-form';

export type AppStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppDispatch = typeof store.dispatch;

// @ts-ignore
window.store = store;