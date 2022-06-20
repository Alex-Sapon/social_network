import {memo} from 'react';
import {Description} from './Description/Description';
import styles from './Profile.module.css';
import PostsContainer from './Posts/PostsContainer';
import {ProfileType} from '../../redux/reducers/profile-reducer';

type ProfilePropsType = {
    profile: ProfileType
    status: string
}

export const Profile = memo(({profile, status}: ProfilePropsType) => {
    return (
        <div className={styles.profile_content}>
            <Description profile={profile} status={status}/>
            <PostsContainer/>
        </div>
    )
});