import {combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {profileReducer} from '../components/Profile';
import {messagesReducer} from '../components/Messages/messages-reducer';
import {usersReducer} from '../components/Users/users-reducer';
import {authReducer} from '../components/Login';
import {reducer as formReducer} from 'redux-form';
import {appReducer} from '../components/App';
import {configureStore} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
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