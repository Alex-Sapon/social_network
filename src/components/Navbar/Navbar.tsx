import {NavLink} from 'react-router-dom';
import styles from './Navbar.module.css';
import {useAppSelector} from '../../redux/redux-store';

const Navbar = () => {
    const setActiveClass = (navData: { isActive: boolean }): string => navData.isActive ? styles.active : styles.item;

    const id = useAppSelector(state => state.auth.id);

    return (
        <nav className={styles.nav}>
            <NavLink className={setActiveClass} to={`/profile/${id}`}>Profile</NavLink>
            <NavLink className={setActiveClass} to="/messages">Messages</NavLink>
            <NavLink className={setActiveClass} to="/friends">Users</NavLink>
            <NavLink className={setActiveClass} to="/news">News</NavLink>
            <NavLink className={setActiveClass} to="/music">Music</NavLink>
            <NavLink className={setActiveClass} to="/settings">Settings</NavLink>
        </nav>
    )
}

export default Navbar;