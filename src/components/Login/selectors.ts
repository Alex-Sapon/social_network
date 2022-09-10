import {AppStateType} from '../App/redux-store';

export const selectAuthId = (state: AppStateType) => state.auth.authParams.id;
export const selectAuthCaptcha = (state: AppStateType) => state.auth.captcha;
export const selectIsAuth = (state: AppStateType) => state.auth.isAuth;