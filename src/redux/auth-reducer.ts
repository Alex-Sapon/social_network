import {authAPI} from '../API/api';
import {AppThunk, ThunkDispatchType} from './hooks';

export type AuthStateType = {
    login: string
    email: string
    rememberMe: boolean
    id: number
    isAuth: boolean
    captcha: boolean
};

const initialState: AuthStateType = {
    login: '',
    email: '',
    rememberMe: false,
    captcha: false,
    id: 1,
    isAuth: false,
};

export const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case 'SET-AUTH-USER':
            return {...state, ...action.payload, isAuth: true};
        case 'SET-LOGIN-USER':
            return {
                ...state,

            }
        default:
            return state;
    }
};

export type AuthActionsType = ReturnType<typeof setAuthUserData>
    | ReturnType<typeof setLoginUserData>;

export const setAuthUserData = (id: number, login: string, email: string) => ({
    type: 'SET-AUTH-USER',
    payload: {
        id,
        login,
        email
    }
}) as const;
export const setLoginUserData = (email: string, password: string, rememberMe: boolean, captcha: boolean) => ({
    type: 'SET-LOGIN-USER',
    payload: {
        email,
        password,
        rememberMe,
        captcha,
    }
}) as const;


export const getAuthUserData = (): AppThunk => (dispatch: ThunkDispatchType) => {
    authAPI.getAuthUser().then(response => {
        if (response.resultCode === 0) {
            const {id, login, email} = response.data;
            dispatch(setAuthUserData(id, login, email));
        }
    });
};

export const getLoginUserData = (email: string, password: string, rememberMe: boolean, captcha: boolean): AppThunk => (dispatch: ThunkDispatchType) => {
    authAPI.getLogin(email, password, rememberMe, captcha).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setLoginUserData(email, password, rememberMe, captcha));
        }
    })
}