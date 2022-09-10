import {ActionCreatorsMapObject, bindActionCreators} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppStateType} from '../../components/App/redux-store';
import {useMemo} from 'react';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useAppDispatch();

    return useMemo(() => {
        return bindActionCreators(actions, dispatch);
    }, [actions, dispatch])
}