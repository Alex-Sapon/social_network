import React, {FC} from 'react';
import Posts from './posts/posts';
import Description from "./description/description";
import {DispatchProps, StateProps} from "../../redux/state";
import styles from './profile.module.css';

type ProfileType = {
    state: StateProps
    dispatch: (action: DispatchProps) => void
}

const Profile: FC<ProfileType> = ({state, dispatch}) => {
    return (
        <div className={styles.content}>
            <Description dispatch={dispatch} state={state}/>
            <Posts posts={state.posts}/>
        </div>
    )
}

export default Profile;