import React, {FC} from 'react';
import styles from './DialogUser.module.css';
import {NavLink} from "react-router-dom";
import {UsersProps} from "../../../Redux/State";

const DialogUser: FC<UsersProps> = (props) => {
    return (
        <li><NavLink className={styles.item} to={`${props.id}`}>{props.name}</NavLink></li>
    )
}

export default DialogUser;