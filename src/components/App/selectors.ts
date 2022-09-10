import {AppStateType} from './redux-store';

export const selectAppIsInitialized = (state: AppStateType) => state.app.isInitialized;