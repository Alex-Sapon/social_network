import {authAPI, IUserParams} from '../../api/api';
import {stopSubmit} from 'redux-form';
import {AppThunk} from '../redux-store';
import {ResultCode} from '../../enums/result-code';
import {AxiosError} from 'axios';

const initialState: AuthStateType = {
    userId: 0,
    login: null,
    email: null,
    rememberMe: false,
    isAuth: false,
};

export const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case 'AUTH/SET-AUTH-USER-DATA':
            return {...state, ...action.payload};
        case 'AUTH/SET-AUTH-USER':
            return {...state, isAuth: action.payload.isAuth};
        default:
            return state;
    }
};

// ------- actions -------
export const setAuthUserData = (userId: number, login: string | null, email: string | null) => ({
    type: 'AUTH/SET-AUTH-USER-DATA',
    payload: {
        userId,
        login,
        email,
    },
} as const);

export const setAuthUser = (isAuth: boolean) => ({
    type: 'AUTH/SET-AUTH-USER',
    payload: {
        isAuth,
    },
} as const);


// ------- thunks -------
export const getAuthUserData = (): AppThunk => dispatch => {
    return authAPI.me()
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                const {id, login, email} = res.data.data;

                dispatch(setAuthUserData(id, login, email));
                dispatch(setAuthUser(true));
            }
        })
        .catch((err: AxiosError) => {
            console.error(err.message);
        })
};

export const login = (data: IUserParams): AppThunk => dispatch => {
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(getAuthUserData());
                dispatch(setAuthUser(true));
            }

            if (res.data.resultCode === ResultCode.Error) {
                dispatch(stopSubmit('loginForm', {_error: res.data.messages}))
            }
        })
        .catch((err: AxiosError) => {
            dispatch(stopSubmit('loginForm', {_error: err.message}))
        })
};

export const logout = (): AppThunk => dispatch => {
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAuthUser(false));
            }
        })
        .catch((err: AxiosError) => {
            alert(err.message);
        })
};

// ------- types -------
export type AuthStateType = {
    userId: number
    login: string | null
    email: string | null
    rememberMe: boolean
    isAuth: boolean
};

export type AuthActionsType =
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof stopSubmit>
    | ReturnType<typeof setAuthUser>;