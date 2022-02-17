import React, {FC, PropsWithChildren} from 'react';
import styles from './Profile.module.css';
import Posts from './Posts/Posts';
import Description from "./Description/Description";

const Profile: FC = (props) => {
    return (
        <div className={styles.content}>
            <Description/>
            <Posts/>
        </div>
    )
}

export default Profile;