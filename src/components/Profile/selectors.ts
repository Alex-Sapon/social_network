import {AppStateType} from '../../redux/redux-store';

export const selectProfile = (state: AppStateType) => state.profilePage.profile;
export const selectProfileStatus = (state: AppStateType) => state.profilePage.status;
export const selectProfilePosts = (state: AppStateType) => state.profilePage.posts;
export const selectProfileLoading = (state: AppStateType) => state.profilePage.statusLoading;