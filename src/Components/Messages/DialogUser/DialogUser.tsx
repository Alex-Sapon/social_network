import React, {FC} from 'react';
import styles from './DialogUser.module.css';
import {NavLink} from "react-router-dom";

type UserListProps = {
    id: number;
    name: string;
}

const DialogUser: FC<UserListProps> = ({id, name}) => {
    return (
        <li><NavLink className={styles.item} to={`${id}`}>{name}</NavLink></li>
    )
}

export default DialogUser;