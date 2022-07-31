import {authAPI, IAuthData, IUserParams, securityAPI} from '../../api/api';
import {stopSubmit} from 'redux-form';
import {AppThunk} from '../redux-store';
import {ResultCode} from '../../enums/result-code';

const initialState: AuthStateType = {
    id: 0,
    login: '',
    email: '',
    rememberMe: false,
    isAuth: false,
    captcha: null,
};

export const authReducer = (state: AuthStateType = initialState, action: AuthActions): AuthStateType => {
    switch (action.type) {
        case 'AUTH/SET-AUTH-USER-DATA':
            return {...state, ...action.authData};
        case 'AUTH/SET-CAPTCHA-URL':
            return {...state, captcha: action.url};
        default:
            return state;
    }
};

export const setAuthUserData = (authData: AuthStateType) => ({
    type: 'AUTH/SET-AUTH-USER-DATA',
    authData,
} as const);

export const setCaptchaUrl = (url: string) => ({
    type: 'AUTH/SET-CAPTCHA-URL',
    url,
} as const);

export const getAuthUserData = (): AppThunk => async dispatch => {
    try {
        const res = await authAPI.me();

        if (res.data.resultCode === ResultCode.Success) {
            const {id, login, email} = res.data.data;

            const authData: AuthStateType = {
                id: id,
                login: login,
                email: email,
                captcha: null,
                isAuth: true,
            };

            dispatch(setAuthUserData(authData));
        }
    } catch (e) {

    }
};

export const login = (data: IUserParams): AppThunk => async dispatch => {
    try {
        const res = await authAPI.login(data);

        if (res.data.resultCode === ResultCode.Success) {
            dispatch(getAuthUserData());
        } else {
            if (res.data.resultCode === ResultCode.Security) {
                dispatch(getCaptchaUrl());
            }
            dispatch(stopSubmit('loginForm', {_error: res.data.messages[0]}));
        }
    } catch (e: any) {
        dispatch(stopSubmit('loginForm', {_error: e.message}))
    }
};

export const logout = (): AppThunk => async dispatch => {
    try {
        const res = await authAPI.logout();

        if (res.data.resultCode === ResultCode.Success) {

            const authData: AuthStateType = {
                id: 0,
                login: '',
                email: '',
                captcha: null,
                isAuth: false,
            };

            dispatch(setAuthUserData(authData));
        }
    } catch (e) {

    }
};

export const getCaptchaUrl = (): AppThunk => async dispatch => {
    const res = await securityAPI.getCaptchaUrl();
    dispatch(setCaptchaUrl(res.data.url));
};

export type AuthStateType = IAuthData & {
    rememberMe?: boolean
    isAuth: boolean
    captcha: null | string
};

export type AuthActions = ReturnType<typeof setAuthUserData> | ReturnType<typeof setCaptchaUrl>

export type SubmitActions = ReturnType<typeof stopSubmit>