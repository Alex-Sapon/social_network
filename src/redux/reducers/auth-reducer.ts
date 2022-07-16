import {authAPI, IAuthData, IUserParams} from '../../api/api';
import {stopSubmit} from 'redux-form';
import {AppThunk} from '../redux-store';
import {ResultCode} from '../../enums/result-code';

const initialState: AuthStateType = {
    id: 0,
    login: '',
    email: '',
    rememberMe: false,
    isAuth: false,
};

export const authReducer = (state: AuthStateType = initialState, action: AuthActions): AuthStateType => {
    switch (action.type) {
        case 'AUTH/SET-AUTH-USER-DATA':
            return {...state, ...action.auth};
        default:
            return state;
    }
};

export const setAuthUserData = (auth: AuthStateType) => ({
    type: 'AUTH/SET-AUTH-USER-DATA',
    auth,
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
        }

        if (res.data.resultCode === ResultCode.Error) {
            dispatch(stopSubmit('loginForm', {_error: res.data.messages}))
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
                isAuth: false,
            };

            dispatch(setAuthUserData(authData));
        }
    } catch (e) {

    }
};

export type AuthStateType = IAuthData & {
    rememberMe?: boolean
    isAuth: boolean
};

export type AuthActions = ReturnType<typeof setAuthUserData>

export type SubmitActions = ReturnType<typeof stopSubmit>