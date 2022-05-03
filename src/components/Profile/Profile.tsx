import React, {FC} from 'react';
import {Description} from './Description/Description';
import styles from './Profile.module.css';
import PostsContainer from './Posts/PostsContainer';
import {ProfileType} from '../../redux/profile-reducer';

type ProfilePropsType = {
    profile: ProfileType
}

export const Profile: FC<ProfilePropsType> = ({profile}) => {
    return (
        <div className={styles.content}>
            <Description profile={profile}/>
            <PostsContainer/>
        </div>
    )
};