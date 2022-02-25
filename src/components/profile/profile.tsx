import React, {FC} from 'react';
import styles from './profile.module.css';
import Posts from './posts/posts';
import Description from "./description/description";
import {PagesProps} from "../../index";

const Profile: FC<PagesProps> = (state) => {
    return (
        <div className={styles.content}>
            <Description addPost={state.addPost} textArea={state.textArea} updateNewPostText={state.updateNewPostText}/>
            <Posts posts={state.posts}/>
        </div>
    )
}

export default Profile;