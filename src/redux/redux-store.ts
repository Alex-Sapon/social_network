import {combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {profileReducer} from '../components/Profile';
import {dialogsReducer} from '../components/Messages';
import {usersReducer} from '../components/Users/users-reducer';
import {authReducer} from '../components/Login';
import {reducer as formReducer} from 'redux-form';
import {appReducer} from '../components/App';
import {configureStore} from '@reduxjs/toolkit';
import {newsReducer} from '../components/News';

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
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

// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsType>;

// @ts-ignore
window.store = store;