import React, {FC} from 'react';
import classes from './Header.module.css';

const Header: FC = () => {
    return (
        <header className={classes.header}>
            <img className={classes.headerLogo} src="https://www.freepnglogos.com/uploads/logo-3d-png/3d-company-logos-design-logo-online-2.png"
                 alt="logo"/>
        </header>
    )
}

export default Header;