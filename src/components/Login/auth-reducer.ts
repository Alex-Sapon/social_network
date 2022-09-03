import {stopSubmit} from 'redux-form';
import {ResultCode} from '../../enums/result-code';
import {authAPI, IUserParams} from '../../api';
import {securityAPI} from '../../api/apiSecurity';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

export const getAuthUserData = createAsyncThunk<AuthStateType, void, { rejectValue: string }>
('auth/getAuthUserData', async (_, {rejectWithValue}) => {
    try {
        const res = await authAPI.me();

        if (res.data.resultCode === ResultCode.Success) {
            const {id, login, email} = res.data.data;

            const authData: AuthStateType = {
                authParams: {id, login, email},
                captcha: null,
                error: null,
                isAuth: true,
            };
            return authData;
        }

        return rejectWithValue(res.data.messages[0]);
    } catch (e) {
        return rejectWithValue((e as AxiosError).message);
    }
})

export const login = createAsyncThunk<void, IUserParams>('auth/login', async (data, {dispatch}) => {
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
    } catch (e) {
        dispatch(stopSubmit('loginForm', {_error: (e as AxiosError).message}))
    }
})

export const logout = createAsyncThunk<AuthStateType, void, { rejectValue: string }>('auth/logout', async (_, {rejectWithValue}) => {
    const res = await authAPI.logout();

    if (res.data.resultCode === ResultCode.Success) {
        const authData: AuthStateType = {
            authParams: {id: 0, login: '', email: ''},
            captcha: null,
            isAuth: false,
            error: null,
        };

        return authData;
    }

    return rejectWithValue(res.data.messages[0]);
})

export const getCaptchaUrl = createAsyncThunk<{ url: string }, void>('auth/captcha', async () => {
    const res = await securityAPI.getCaptchaUrl();
    return {url: res.data.url};
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authParams: {id: 0, login: '', email: ''},
        rememberMe: false,
        isAuth: false,
        captcha: null,
        error: null
    } as AuthStateType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getCaptchaUrl.fulfilled, (state, action) => {
                state.captcha = action.payload.url;
            })
            .addCase(getAuthUserData.fulfilled, (state, action) => {
                state.authParams = action.payload.authParams;
                state.error = action.payload.error;
                state.isAuth = action.payload.isAuth;
            })
            .addCase(getAuthUserData.rejected, (state, action) => {
                state.error = action.payload;
                state.isAuth = false;
            })
    }
})

export const authReducer = authSlice.reducer;
export const authAsyncActions = {getAuthUserData, login, logout};

export type AuthStateType = {
    authParams: {
        id: number
        login: string
        email: string
    }
    rememberMe?: boolean
    isAuth: boolean
    captcha?: null | string
    error?: string | null
};

export type SubmitActions = ReturnType<typeof stopSubmit>