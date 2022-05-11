import React, {FC} from 'react';
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {AuthStateType} from '../../redux/auth-reducer';

type HeaderType = {
    auth: AuthStateType
}

export const Header: FC<HeaderType> = (props) => {
    const {id, login, email, isAuth} = props.auth;

    return (
        <Box sx={{flexGrow: 1, mb: '2rem'}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>News</Typography>
                    <Button color="inherit">{isAuth ? login : 'Login'}</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
};