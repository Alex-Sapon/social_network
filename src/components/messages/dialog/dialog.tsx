import React, {FC} from 'react';
import styles from './dialog.module.css';
import {NavLink} from "react-router-dom";
import {UsersProps} from "../../../redux/state";
import {ListItem} from "@mui/material";

const Dialog: FC<UsersProps> = (store) => {
    return (
        <ListItem><NavLink className={styles.item} to={`${store.id}`}>{store.name}</NavLink></ListItem>
    )
}

export default Dialog;