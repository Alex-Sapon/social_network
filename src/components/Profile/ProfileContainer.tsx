import React, {ComponentType, useEffect} from 'react';
import {Profile} from './Profile';
import {useParams} from 'react-router';
import {getStatus, getUserProfile} from '../../redux/reducers/profile-reducer';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {AppStateType} from '../../redux/redux-store';

const selectProfile = (state: AppStateType) => state.profilePage.profile;
const selectStatus = (state: AppStateType) => state.profilePage.status;
const selectUserId = (state: AppStateType) => state.auth.userId;

const ProfileContainer = () => {
    const dispatch = useAppDispatch();

    const profile = useAppSelector(selectProfile);
    const status = useAppSelector(selectStatus);
    const id = useAppSelector(selectUserId);

    const params = useParams<'id'>();
    const userId = Number(params.id) || id;

    useEffect(() => {
        dispatch(getUserProfile(userId));
        dispatch(getStatus(userId));
    }, [userId, dispatch]);

    return <Profile profile={profile} status={status}/>
};

export default compose<ComponentType>(
    withAuthRedirect,
)(ProfileContainer);