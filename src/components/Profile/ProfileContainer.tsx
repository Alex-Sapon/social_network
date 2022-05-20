import React, {ComponentType, useEffect} from 'react';
import {Profile} from './Profile';
import {useParams} from 'react-router';
import {getUserProfile} from '../../redux/profile-reducer';
import {useAppSelector} from '../../redux/hooks';
import {useDispatch} from 'react-redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

const ProfileContainer = () => {
    const profile = useAppSelector(state => state.profilePage.profile);
    const dispatch = useDispatch();

    const params = useParams<'id'>();
    const userID = params.id || '2';

    useEffect(() => {
        dispatch(getUserProfile(userID));
    }, [userID, dispatch]);

    return <Profile profile={profile}/>
};

export default compose<ComponentType>(
    withAuthRedirect,
)(ProfileContainer);