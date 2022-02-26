import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';

//** Styles **//
import classes from './navbar.module.css';

//** Styles from MUI **//
import {Box, List, ListItem, Typography} from '@mui/material';
import {blue, red} from '@mui/material/colors';

const navbarStyles = {
    backgroundColor: blue[200],
    marginRight: "20px",
    color: red[200],
    height: '100%'
}

const Navbar: FC = () => {
    const setActiveClass = (navData: { isActive: boolean }): string => navData.isActive ? classes.active : classes.item;
    return (
        <Box sx={navbarStyles}>
            <nav>
                <List>
                    <ListItem><NavLink className={setActiveClass} to="/profile"><Typography variant={'h6'}>Profile</Typography></NavLink></ListItem>
                    <ListItem><NavLink className={setActiveClass} to="/messages"><Typography variant={'h6'}>Messages</Typography></NavLink></ListItem>
                    <ListItem><NavLink className={setActiveClass} to="/friends"><Typography variant={'h6'}>Friends</Typography></NavLink></ListItem>
                    <ListItem><NavLink className={setActiveClass} to="/news"><Typography variant={'h6'}>News</Typography></NavLink></ListItem>
                    <ListItem><NavLink className={setActiveClass} to="/music"><Typography variant={'h6'}>Music</Typography></NavLink></ListItem>
                    <ListItem><NavLink className={setActiveClass} to="/settings"><Typography variant={'h6'}>Settings</Typography></NavLink></ListItem>
                </List>
            </nav>
        </Box>
    )
}

export default Navbar;