import {ComponentType, useEffect} from 'react';
import {useParams} from 'react-router';
import {getStatus, getUserProfile} from '../../redux/reducers/profile-reducer';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {AppStateType} from '../../redux/redux-store';
import {Preloader} from '../../common/Preloader/Preloader';
import {Description} from './Description/Description';
import PostsContainer from './Posts/PostsContainer';

export const selectProfile = (state: AppStateType) => state.profilePage.profile;
export const selectProfilePhotos = (state: AppStateType) => state.profilePage.profile.photos;
export const selectLoadingStatus = (state: AppStateType) => state.profilePage.statusLoading;
export const selectStatus = (state: AppStateType) => state.profilePage.status;
export const selectIsAuth = (state: AppStateType) => state.auth.isAuth;

const Profile = () => {
    const dispatch = useAppDispatch();

    const profile = useAppSelector(selectProfile);
    const profilePhotos = useAppSelector(selectProfilePhotos);
    const loadingStatus = useAppSelector(selectLoadingStatus);
    const status = useAppSelector(selectStatus);
    const isAuth = useAppSelector(selectIsAuth);

    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            dispatch(getUserProfile(Number(id)));
            dispatch(getStatus(Number(id)));
        }
    }, [id, dispatch, isAuth, profilePhotos]);

    const profileNotReceived = Object.keys(profile).length === 0;

    if (loadingStatus === 'loading' || profileNotReceived) return <Preloader/>

    return (
        <>
            <Description profile={profile} status={status}/>
            <PostsContainer/>
        </>

    )
};

export default compose<ComponentType>(
    withAuthRedirect,
)(Profile);