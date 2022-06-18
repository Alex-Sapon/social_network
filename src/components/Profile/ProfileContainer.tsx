import {ComponentType, useEffect} from 'react';
import {Profile} from './Profile';
import {useParams} from 'react-router';
import {getStatus, getUserProfile} from '../../redux/reducers/profile-reducer';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {AppStateType} from '../../redux/redux-store';

export const selectProfile = (state: AppStateType) => state.profilePage.profile;
export const selectStatus = (state: AppStateType) => state.profilePage.status;
export const selectUserId = (state: AppStateType) => state.auth.userId;
export const selectIsAuth = (state: AppStateType) => state.auth.isAuth;

const ProfileContainer = () => {
    const dispatch = useAppDispatch();

    const profile = useAppSelector(selectProfile);
    const status = useAppSelector(selectStatus);
    const id = useAppSelector(selectUserId);
    const isAuth = useAppSelector(selectIsAuth);

    const params = useParams<'id'>();
    const userId = Number(params.id) || id;

    console.log(params)

    useEffect(() => {
        if (!isAuth || !userId) {
            return;
        }

        dispatch(getUserProfile(userId));
        dispatch(getStatus(userId));
    }, [userId, dispatch, isAuth, id]);

    return <Profile profile={profile} status={status}/>
};

export default compose<ComponentType>(
    withAuthRedirect,
)(ProfileContainer);