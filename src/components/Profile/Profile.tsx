import React, {memo} from 'react';
import {Description} from './Description/Description';
import styles from './Profile.module.css';
import PostsContainer from './Posts/PostsContainer';
import {ProfileType} from '../../redux/profile-reducer';
import {Preloader} from '../../common/Preloader/Preloader';

type ProfilePropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
}

export const Profile = memo(({profile, updateStatus, status}: ProfilePropsType) => {
    return (
        <>
            {Object.keys(profile).length === 0
                ? <Preloader/>
                : <div className={styles.profile_content}>
                    <Description profile={profile} updateStatus={updateStatus} status={status}/>
                    <PostsContainer/>
                </div>}
        </>
    )
});