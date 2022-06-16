import React, {memo} from 'react';
import {Description} from './Description/Description';
import styles from './Profile.module.css';
import PostsContainer from './Posts/PostsContainer';
import {ProfileType} from '../../redux/reducers/profile-reducer';
import {Preloader} from '../../common/Preloader/Preloader';

type ProfilePropsType = {
    profile: ProfileType
    status: string
}

export const Profile = memo(({profile, status}: ProfilePropsType) => {

    if (Object.keys(profile).length === 0) {
        return <Preloader/>
    }

    return (
        <div className={styles.profile_content}>
            <Description profile={profile} status={status}/>
            <PostsContainer/>
        </div>
    )
});