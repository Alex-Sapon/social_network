import React, {FC} from 'react';
import styles from './dialog.module.css';
import {NavLink} from "react-router-dom";
import {UsersProps} from "../../../redux/state";

const Dialog: FC<UsersProps> = (props) => {
    return (
        <li><NavLink className={styles.item} to={`${props.id}`}>{props.name}</NavLink></li>
    )
}

export default Dialog;