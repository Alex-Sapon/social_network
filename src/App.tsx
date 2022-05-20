import {Navigate, Route, Routes} from 'react-router-dom';

import {Container, Grid} from '@mui/material';
import './app.css';

import {HeaderContainer} from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import MessagesContainer from './components/Messages/MessagesContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import {Login} from './components/Login/Login';

const App = () => {
    return (
        <>
            <HeaderContainer/>
            <Container sx={{height: '100vh'}}>
                <Grid container columnSpacing={{xs: 2, sm: 3, md: 5}} sx={{height: '100vh'}} columns={12}>
                    <Grid item xs={3}>
                        <Navbar/>
                    </Grid>
                    <Grid item xs={9}>
                        <Routes>
                            <Route path={'/'} element={<Navigate to={'/profile/:id'}/>}/>
                            <Route path="/profile/:id" element={<ProfileContainer/>}/>
                            <Route path="/messages/" element={<MessagesContainer/>}/>
                            <Route path="/friends/" element={<UsersContainer/>}/>
                            <Route path="/news/" element={<News/>}/>
                            <Route path="/music" element={<Music/>}/>
                            <Route path="/settings" element={<Settings/>}/>
                            <Route path="/login" element={<Login/>}/>
                        </Routes>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default App;
