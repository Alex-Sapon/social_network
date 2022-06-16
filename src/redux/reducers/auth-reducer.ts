import {authAPI, IUserParams} from '../../api/api';
import {stopSubmit} from 'redux-form';
import {AppThunk} from '../redux-store';
import {ResultCode} from '../../enums/result-code';

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

export const setAuthUserData = (userId: number, login: string, email: string) => ({
    type: 'AUTH/SET-AUTH-USER-DATA',
    payload: {
        userId,
        login,
        email,
    }
} as const);

export const setAuthUser = (isAuth: boolean) => ({
    type: 'AUTH/SET-AUTH-USER',
    payload: {
        isAuth,
    }
} as const);


export const getAuthUserData = (): AppThunk => dispatch => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                const {id, login, email} = res.data.data;

                dispatch(setAuthUserData(id, login, email));
            }
        })
};

export const login = (data: IUserParams): AppThunk => dispatch => {
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                // dispatch(getAuthUserData());
                dispatch(setAuthUser(true));
            } else {
                dispatch(stopSubmit('loginForm', {_error: res.data.messages ? res.data.messages : 'Some error'}))
            }
        })
};

export const logout = (): AppThunk => dispatch => {
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                // dispatch(setAuthUserData(0,'',''));
                dispatch(setAuthUser(false));
            }
        });
};


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