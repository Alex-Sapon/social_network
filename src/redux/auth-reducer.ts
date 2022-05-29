import {authAPI} from '../api/api';
import {AppThunk, ThunkDispatchType} from './hooks';
import {stopSubmit} from 'redux-form';

export type AuthStateType = {
    userId: number
    login: string | null
    email: string | null
    rememberMe: boolean
    isAuth: boolean
};

const initialState: AuthStateType = {
    userId: 0,
    login: null,
    email: null,
    rememberMe: false,
    isAuth: false,
};

export const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case 'SET-AUTH-USER':
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export type AuthActionsType = ReturnType<typeof setAuthUserData> | ReturnType<typeof stopSubmit>;

export const setAuthUserData = (userId: number, login: string, email: string, isAuth: boolean) => ({
    type: 'SET-AUTH-USER',
    payload: {
        userId,
        login,
        email,
        isAuth,
    }
}) as const;


export const getAuthUserData = (): AppThunk => (dispatch: ThunkDispatchType) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            const {id, login, email} = res.data.data;

            dispatch(setAuthUserData(id, login, email, true));
        }
    });
};

export const loginUser = (email: string, password: string, rememberMe: boolean): AppThunk => (dispatch: ThunkDispatchType) => {
    authAPI.login(email, password, rememberMe).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            dispatch(stopSubmit('loginForm', {_error: res.data.messages ? res.data.messages : 'Some error'}))
        }
    })
};

export const logoutUser = (): AppThunk => (dispatch: ThunkDispatchType) => {
  authAPI.logout().then(res => {
      if (res.data.resultCode === 0) {
          dispatch(setAuthUserData(0, '', '', false));
      }
  });
};