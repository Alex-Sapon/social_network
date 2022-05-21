import React, {FC} from 'react';
import {Description} from './Description/Description';
import styles from './Profile.module.css';
import PostsContainer from './Posts/PostsContainer';
import {ProfileType} from '../../redux/profile-reducer';

type ProfilePropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
}

export const Profile: FC<ProfilePropsType> = ({profile, updateStatus, status}) => {
    return (
        <div className={styles.content}>
            <Description profile={profile} updateStatus={updateStatus} status={status}/>
            <PostsContainer/>
        </div>
    )
};