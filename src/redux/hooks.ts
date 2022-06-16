import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {ActionsType, AppDispatch, AppStateType} from './redux-store';

export const useAppDispatch = () => useDispatch<ThunkDispatch<AppStateType, unknown, ActionsType> & AppDispatch>();
// export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;