import {combineReducers, legacy_createStore as createStore, applyMiddleware} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {ProfileActionsType, profileReducer} from './reducers/profile-reducer';
import {MessageActionsType, messagesReducer} from './reducers/messages-reducer';
import {UsersActionsType, usersReducer} from './reducers/users-reducer';
import {AuthActionsType, authReducer} from './reducers/auth-reducer';
import {reducer as formReducer} from 'redux-form';
import {AppActionsType, appReducer} from './reducers/app-reducer';

const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = typeof store.dispatch;

export type AppStateType = ReturnType<typeof rootReducer>;

export type ActionsType =
    | UsersActionsType
    | ProfileActionsType
    | MessageActionsType
    | AuthActionsType
    | AppActionsType;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsType>;

// export type AppThunk = ThunkAction<void, AppStateType, unknown, ActionsType>;
// export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionsType>;

// @ts-ignore
window.store = store;