import {ComponentType, useEffect} from 'react';
import {useParams} from 'react-router';
import {profileAsyncActions} from './profile-reducer';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {Preloader} from '../../common/Preloader';
import {Profile} from './Profile';
import {useActions, useAppSelector} from '../../assets/utils';
import {selectProfileLoading} from './selectors';

const ProfileContainer = () => {
    const {getUserProfile, getStatus} = useActions(profileAsyncActions);

    const loadingStatus = useAppSelector(selectProfileLoading);

    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        if (Number(id)) {
            getUserProfile(Number(id));
            getStatus(Number(id));
        }
    }, [id, getStatus, getUserProfile]);

    if (loadingStatus === 'loading') {
        return <Preloader/>;
    }

    return (
        <Profile/>
    )
};

export default compose<ComponentType>(
    withAuthRedirect,
)(ProfileContainer);