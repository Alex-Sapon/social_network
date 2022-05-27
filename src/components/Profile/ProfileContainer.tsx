import React, {ComponentType, useEffect} from 'react';
import {Profile} from './Profile';
import {useParams} from 'react-router';
import {getStatus, getUserProfile, updateStatus} from '../../redux/profile-reducer';
import {useAppSelector} from '../../redux/hooks';
import {useDispatch} from 'react-redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

const ProfileContainer = () => {
    const profile = useAppSelector(state => state.profilePage.profile);
    const status = useAppSelector(state => state.profilePage.status);

    const dispatch = useDispatch();

    const params = useParams<'id'>();
    const userId = Number(params.id) || 23551;

    useEffect(() => {
        dispatch(getUserProfile(userId));
        dispatch(getStatus(userId));
    }, [userId, dispatch]);

    return <Profile profile={profile} updateStatus={updateStatus} status={status}/>
};

export default compose<ComponentType>(
    withAuthRedirect,
)(ProfileContainer);