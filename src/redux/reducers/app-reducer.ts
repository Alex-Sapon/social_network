import {AppThunk} from '../redux-store';
import {getAuthUserData} from './auth-reducer';

const InitialState: AppStateType = {
    isInitialized: false,
};

export const appReducer = (state: AppStateType = InitialState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.initialized};
        default:
            return state;
    }
};

export const setInitialized = (initialized: boolean) => ({
    type: 'APP/SET-INITIALIZED',
    initialized,
} as const);

export const initializeApp = (): AppThunk => async dispatch => {
    try {
        const res = await dispatch(getAuthUserData());
    } catch (e) {

    } finally {
        dispatch(setInitialized(true));
    }
};

export type AppStateType = {
    isInitialized: boolean
};

export type AppActionsType = ReturnType<typeof setInitialized>