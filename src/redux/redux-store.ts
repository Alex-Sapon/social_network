import {combineReducers} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {ProfileActions, profileReducer} from './reducers/profile-reducer';
import {MessageActions, messagesReducer} from './reducers/messages-reducer';
import {UsersActions, usersReducer} from './reducers/users-reducer';
import {authReducer, SubmitActions} from '../components/Login/auth-reducer';
import {reducer as formReducer} from 'redux-form';
import {appReducer} from '../components/App';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
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

type ActionsType =
    | UsersActions
    | ProfileActions
    | MessageActions
    | SubmitActions

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsType>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

// @ts-ignore
window.store = store;