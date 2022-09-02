import {getAuthUserData} from './auth-reducer';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const initializeApp = createAsyncThunk('app/initializeApp', async (_, {dispatch}) => {
    await dispatch(getAuthUserData());
})

export const appSlice = createSlice({
    name: 'auth',
    initialState: {isInitialized: false} as AppStateType,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(initializeApp.fulfilled, (state) => {
            state.isInitialized = true;
        })
    }
})

export const appReducer = appSlice.reducer;

export const setInitialized = (initialized: boolean) => ({
    type: 'APP/SET-INITIALIZED',
    initialized,
} as const);

export type AppStateType = {
    isInitialized: boolean
};

export type AppActionsType = ReturnType<typeof setInitialized>