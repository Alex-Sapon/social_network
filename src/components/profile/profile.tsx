import React, {FC} from 'react';
import Posts from './posts/posts';
import Description from "./description/description";
import {StorePropsType} from "../../redux/state";
import styles from './profile.module.css';

const Profile: FC<StorePropsType> = (state) => {
    return (
        <div className={styles.content}>
            <Description dispatch={state.dispatch} state={state.state}/>
            <Posts state={state.state}/>
        </div>
    )
}

export default Profile;