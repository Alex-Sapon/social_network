import React, {FC} from 'react';
import classes from './Navbar.module.css';
import {NavLink} from 'react-router-dom';

const Navbar: FC = () => {
    const setActiveClass = (navData: {isActive: boolean}): string => navData.isActive ? classes.active : classes.item;
    return (
        <nav className={classes.nav}>
            <ul>
                <li><NavLink className={setActiveClass} to="/profile">Profile</NavLink></li>
                <li><NavLink className={setActiveClass} to="/messages">Messages</NavLink></li>
                <li><NavLink className={setActiveClass} to="/music">Music</NavLink></li>
                <li><NavLink className={setActiveClass} to="/settings">Settings</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar;