import React from 'react';
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {logout} from '../Login';
import {useAppDispatch, useAppSelector} from '../../assets/utils';

export const Header = () => {
    const dispatch = useAppDispatch();

    const isAuth = useAppSelector(state => state.auth.isAuth);

    const handlerLogout = () => {
        dispatch(logout());
    }

    return (
        <Box sx={{flexGrow: 1, mb: '2rem'}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>News</Typography>
                    {isAuth && <Button color="inherit" onClick={handlerLogout}>Log out</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    )
};