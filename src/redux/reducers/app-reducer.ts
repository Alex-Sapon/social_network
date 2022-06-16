import {AppThunk} from '../redux-store';
import {authAPI} from '../../api/api';
import {AxiosError} from 'axios';
import {ResultCode} from '../../enums/result-code';
import {setAuthUser} from './auth-reducer';

const InitialState: AppStateType = {
    isInitialized: false,
}

export const appReducer = (state: AppStateType = InitialState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.payload.initialized};
        default:
            return state;
    }
}

export const setInitialized = (initialized: boolean) => ({
    type: 'APP/SET-INITIALIZED',
    payload: {
        initialized,
    },
} as const);

export const setInitializeApp = (): AppThunk => dispatch => {

    authAPI.me()
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAuthUser(true));
            }
        })
        .catch((err: AxiosError) => {
            console.error(err.message);
        })
        .finally(() => {
            dispatch(setInitialized(true));
        })
}

export type AppStateType = {
    isInitialized: boolean
}

export type AppActionsType = ReturnType<typeof setInitialized>