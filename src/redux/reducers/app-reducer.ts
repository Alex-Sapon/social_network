import {AppThunk} from '../redux-store';
import {getAuthUserData} from './auth-reducer';

const InitialState: AppStateType = {
    isInitialized: false,
}

export const appReducer = (state: AppStateType = InitialState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.payload.initialized};
        default:
            return state;
    }
}

// ------- actions -------
export const setInitialized = (initialized: boolean) => ({
    type: 'APP/SET-INITIALIZED',
    payload: {
        initialized,
    },
} as const);

// ------- thunks -------
export const initializeApp = (): AppThunk => dispatch => {
    const userData = dispatch(getAuthUserData());

    Promise.all([userData])
        .then(() => {
            dispatch(setInitialized(true));
        })
}

// ------- types -------
export type AppStateType = {
    isInitialized: boolean
}

export type AppActionsType = ReturnType<typeof setInitialized>