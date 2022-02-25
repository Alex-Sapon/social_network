import React, {FC} from 'react';
import classes from './header.module.css';
import {AppBar, Toolbar, Typography, Box} from "@mui/material";

const headerStyles = {
    flexGrow: 1,
    marginBottom: "15px"
}

const Header: FC = () => {
    return (
        <Box sx={headerStyles}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" component="div">
                        Social network
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;