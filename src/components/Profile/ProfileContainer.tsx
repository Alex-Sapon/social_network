import React from 'react';
import {Profile} from './Profile';
import {useParams} from 'react-router';
import {getUserProfile} from '../../redux/profile-reducer';
import {useAppSelector} from '../../redux/hooks';
import {useDispatch} from 'react-redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

export const ProfileContainer = withAuthRedirect(() => {
    const profile = useAppSelector(state => state.profilePage.profile);
    const dispatch = useDispatch();

    const params = useParams<'id'>();
    const userID = params.id || '2';

    dispatch(getUserProfile(userID));

    return <Profile profile={profile}/>
});