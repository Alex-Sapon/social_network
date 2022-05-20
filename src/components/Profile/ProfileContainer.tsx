import React, {FC, useEffect} from 'react';
import {Profile} from './Profile';
import {useParams} from 'react-router';
import {getUserProfile} from '../../redux/profile-reducer';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../redux/hooks';
import {useDispatch} from 'react-redux';

export const ProfileContainer: FC = () => {
    const profile = useAppSelector(state => state.profilePage.profile);
    const isAuth = useAppSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const params = useParams<'id'>();
    const userID = params.id || '2';

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        };
        dispatch(getUserProfile(userID));
    }, [isAuth]);

    return <Profile profile={profile}/>
};