import React, {FC, memo} from 'react';
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {AuthStateType, logoutUser} from '../../redux/auth-reducer';
import {useDispatch} from 'react-redux';

type HeaderType = {
    auth: AuthStateType
}

export const Header: FC<HeaderType> = memo(({auth}) => {
    const {login, isAuth} = auth;
    const dispatch = useDispatch();

    const handlerLogout = () => {
        dispatch(logoutUser());
    }

    return (
        <Box sx={{flexGrow: 1, mb: '2rem'}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>News</Typography>
                    <Button color="inherit">{isAuth ? login : 'Login'}</Button>
                    {isAuth && <Button color="inherit" onClick={handlerLogout}>Logout</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    )
});