import {AppStateType} from '../../redux/redux-store';

export const selectAppIsInitialized = (state: AppStateType) => state.app.isInitialized;