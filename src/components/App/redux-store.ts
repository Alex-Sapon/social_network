import {combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {profileReducer} from '../Profile';
import {usersReducer} from '../Users/users-reducer';
import {authReducer} from '../Login';
import {reducer as formReducer} from 'redux-form';
import {appReducer} from './index';
import {configureStore} from '@reduxjs/toolkit';
import {newsReducer} from '../News';

const rootReducer = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    newsPage: newsReducer,
    form: formReducer,
});

// @ts-ignore
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export type AppDispatch = typeof store.dispatch;

export type AppStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;