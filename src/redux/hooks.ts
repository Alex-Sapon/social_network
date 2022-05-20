import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppStateType} from './redux-store';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {UsersActionsType} from './users-reducer';
import {ProfileActionsType} from './profile-reducer';
import {MessageActionsType} from './messages-reducer';
import {AuthActionsType} from './auth-reducer';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

type ActionsType = UsersActionsType | ProfileActionsType | MessageActionsType | AuthActionsType;

export type AppThunk = ThunkAction<void, AppStateType, unknown, ActionsType>;
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionsType>;