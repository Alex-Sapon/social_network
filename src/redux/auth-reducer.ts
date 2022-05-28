import {authAPI} from '../API/api';
import {AppThunk, ThunkDispatchType} from './hooks';

export type AuthStateType = {
    login: string | null
    email: string | null
    rememberMe: boolean
    id: number | null
    isAuth: boolean
};

const initialState: AuthStateType = {
    login: '',
    email: '',
    rememberMe: false,
    id: 1,
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

export type AuthActionsType = ReturnType<typeof setAuthUserData>;

export const setAuthUserData = (id: number | null, login: string, email: string, isAuth: boolean) => ({
    type: 'SET-AUTH-USER',
    payload: {
        id,
        login,
        email,
        isAuth
    }
}) as const;


export const getAuthUserData = (): AppThunk => (dispatch: ThunkDispatchType) => {
    authAPI.getAuthUser().then(res => {
        if (res.data.resultCode === 0) {
            const {id, login, email} = res.data.data;
            dispatch(setAuthUserData(id, login, email, true));
        }
    });
};

export const getLoginUserData = (email: string, password: string, rememberMe: boolean): AppThunk => (dispatch: ThunkDispatchType) => {
    authAPI.login(email, password, rememberMe).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(getAuthUserData());
        }
    })
}

export const getLogoutUser = (): AppThunk => (dispatch: ThunkDispatchType) => {
  authAPI.logout().then(res => {
      if (res.data.resultCode === 0) {
          dispatch(setAuthUserData(null, '', '', false));
      }
  })
}