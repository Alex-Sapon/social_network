import {AppStateType} from '../../redux/redux-store';

export const selectProfile = (state: AppStateType) => state.profilePage.profile;
export const selectProfileStatus = (state: AppStateType) => state.profilePage.status;