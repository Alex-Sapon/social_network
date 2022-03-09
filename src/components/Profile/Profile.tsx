import React, {FC} from 'react';
import Posts from './Posts/Posts';
import Description from "./Description/Description";
import {StoreType} from '../../redux/redux-store';
import styles from './Profile.module.css';
import PostsContainer from './Posts/PostsContainer';

type ProfileType = {
    store: StoreType
}

const Profile: FC<ProfileType> = (props) => {
    return (
        <div className={styles.content}>
            <Description/>
            <PostsContainer props={props.store}/>
        </div>
    )
}

export default Profile;