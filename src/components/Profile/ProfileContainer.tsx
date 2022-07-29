import {ComponentType, useEffect} from 'react';
import {useParams} from 'react-router';
import {getStatus, getUserProfile} from '../../redux/reducers/profile-reducer';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {AppStateType, useAppDispatch, useAppSelector} from '../../redux/redux-store';
import {Preloader} from '../../common/Preloader/Preloader';
import {Description} from './Description/Description';
import PostsContainer from './Posts/PostsContainer';

export const selectLoadingStatus = (state: AppStateType) => state.profilePage.statusLoading;

const Profile = () => {
    const dispatch = useAppDispatch();

    const loadingStatus = useAppSelector(selectLoadingStatus);

    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        if (Number(id)) {
            dispatch(getUserProfile(Number(id)));
            dispatch(getStatus(Number(id)));
        }
    }, [id]);

    if (loadingStatus === 'loading') return <Preloader/>

    return (
        <>
            <Description/>
            <PostsContainer/>
        </>

    )
};

export default compose<ComponentType>(
    withAuthRedirect,
)(Profile);