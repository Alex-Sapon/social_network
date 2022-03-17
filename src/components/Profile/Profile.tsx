import React, {FC} from 'react';
import Description from "./Description/Description";
import styles from './Profile.module.css';
import PostsContainer from './Posts/PostsContainer';

const Profile: FC = () => {
    return (
        <div className={styles.content}>
            <Description/>
            <PostsContainer/>
        </div>
    )
}

export default Profile;