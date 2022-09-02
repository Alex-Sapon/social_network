import {NavLink} from 'react-router-dom';
import styles from './Navbar.module.css';
import {useAppSelector} from '../../redux/redux-store';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import GroupIcon from '@mui/icons-material/Group';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SettingsIcon from '@mui/icons-material/Settings';

export const Navbar = () => {
    const setActiveClass = (navData: { isActive: boolean }): string => navData.isActive ? styles.active : styles.item;

    const id = useAppSelector(state => state.auth.id);

    return (
        <nav className={styles.nav}>
            <NavLink className={setActiveClass} to={`/profile/${id}`}><AccountCircleIcon/>My page</NavLink>
            <NavLink className={setActiveClass} to="/messages"><MessageIcon/>Messages</NavLink>
            <NavLink className={setActiveClass} to="/users"><GroupIcon/>Users</NavLink>
            <NavLink className={setActiveClass} to="/news"><NewspaperIcon/>News</NavLink>
            <NavLink className={setActiveClass} to="/music"><LibraryMusicIcon/>Music</NavLink>
            <NavLink className={setActiveClass} to="/settings"><SettingsIcon/>Settings</NavLink>
        </nav>
    )
}
