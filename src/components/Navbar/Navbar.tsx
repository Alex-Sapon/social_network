import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';

import {Divider, List, ListItem, ListItemText} from '@mui/material';
import {red} from '@mui/material/colors';
import classes from './Navbar.module.css';

const navbarStyles = {
    backgroundColor: 'background.paper',
    color: red[200],
    width: '100%',
    height: '100vh'
}

const Navbar: FC = () => {
    const setActiveClass = (navData: { isActive: boolean }): string => navData.isActive ? classes.active : classes.item;
    
    return (
        <List component="nav" aria-label="mailbox folders" sx={navbarStyles}>
            <ListItem button>
                <NavLink className={setActiveClass} to="/profile/2"><ListItemText primary={"Profile"}/></NavLink>
            </ListItem>
            <Divider light/>
            <ListItem button>
                <NavLink className={setActiveClass} to="/messages"><ListItemText primary={"Messages"}/></NavLink>
            </ListItem>
            <Divider light/>
            <ListItem button>
                <NavLink className={setActiveClass} to="/friends"><ListItemText primary={"Users"}/></NavLink>
            </ListItem>
            <Divider light/>
            <ListItem button>
                <NavLink className={setActiveClass} to="/news"><ListItemText primary={"News"}/></NavLink>
            </ListItem>
            <Divider light/>
            <ListItem button>
                <NavLink className={setActiveClass} to="/music"><ListItemText primary={"Music"}/></NavLink>
            </ListItem>
            <Divider light/>
            <ListItem button>
                <NavLink className={setActiveClass} to="/settings"><ListItemText primary={"Settings"}/></NavLink>
            </ListItem>
            <Divider light/>
        </List>
    )
}

export default Navbar;