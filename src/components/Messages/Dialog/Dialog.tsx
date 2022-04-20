import React, {FC} from 'react';
import styles from './Dialog.module.css';
import {NavLink} from "react-router-dom";

import PersonIcon from '@mui/icons-material/Person';
import {grey} from "@mui/material/colors";
import {ListItem} from "@mui/material";

type DialogType = {
    id: string
    name: string
}

const Dialog: FC<DialogType> = ({id, name}) => {
    return (
        <ListItem>
            <PersonIcon sx={{color: grey, mr: '0.5rem'}}/>
            <NavLink className={styles.item} to={`${id}`}>{name}</NavLink>
        </ListItem>
    )
}

export default Dialog;