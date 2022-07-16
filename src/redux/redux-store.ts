import {combineReducers, legacy_createStore as createStore, applyMiddleware, compose} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {ProfileActions, profileReducer} from './reducers/profile-reducer';
import {MessageActions, messagesReducer} from './reducers/messages-reducer';
import {UsersActions, usersReducer} from './reducers/users-reducer';
import {AuthActions, authReducer, SubmitActions} from './reducers/auth-reducer';
import {reducer as formReducer} from 'redux-form';
import {AppActionsType, appReducer} from './reducers/app-reducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type AppDispatch = typeof store.dispatch;

export type AppStateType = ReturnType<typeof rootReducer>;

type ActionsType =
    | UsersActions
    | ProfileActions
    | MessageActions
    | AuthActions
    | AppActionsType
    | SubmitActions

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsType>;

export const useAppDispatch = () => useDispatch<ThunkDispatch<AppStateType, unknown, ActionsType>>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

// @ts-ignore
window.store = store;