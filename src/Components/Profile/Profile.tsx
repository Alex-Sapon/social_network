import React, {FC} from 'react';
import styles from './Profile.module.css';
import Posts from './Posts/Posts';
import Description from "./Description/Description";
import {PagesProps} from "../../index";

const Profile: FC<PagesProps> = ({posts, addPost}) => {
    return (
        <div className={styles.content}>
            <Description addPost={addPost}/>
            <Posts posts={posts}/>
        </div>
    )
}

export default Profile;