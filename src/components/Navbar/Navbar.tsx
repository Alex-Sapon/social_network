import {NavLink} from 'react-router-dom';
import styles from './Navbar.module.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import GroupIcon from '@mui/icons-material/Group';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import {useAppSelector} from '../../assets/utils';
import {selectAuthId} from '../Login';
import React from 'react';

export const Navbar = () => {
    const setActiveClass = (navData: { isActive: boolean }): string => navData.isActive ? styles.active : styles.item;

    const id = useAppSelector(selectAuthId);

    return (
        <nav className={styles.nav}>
            <NavLink className={setActiveClass} to={`/profile/${id}`}><AccountCircleIcon/>My page</NavLink>
            <NavLink className={setActiveClass} to="/messages"><MessageIcon/>Chat</NavLink>
            <NavLink className={setActiveClass} to="/users"><GroupIcon/>Users</NavLink>
            <NavLink className={setActiveClass} to="/news"><NewspaperIcon/>News</NavLink>
            <NavLink className={setActiveClass} to="/music"><LibraryMusicIcon/>Music</NavLink>
        </nav>
    )
}
