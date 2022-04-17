import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import {Container, Grid} from '@mui/material';
import './app.css';

import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import MessagesContainer from './components/Messages/MessagesContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer'

const App = () => {
    return (
        <>
            <Header/>
            <Container sx={{height: '100vh'}}>
                <Grid container columnSpacing={{xs: 2, sm: 3, md: 5}} columns={12}>
                    <Grid item sm={3} sx={{height: '100vh'}}>
                        <Navbar/>
                    </Grid>
                    <Grid item xs={9}>
                        <Routes>
                            <Route path={'/'} element={<Navigate to={'/profile'}/>}/>
                            <Route path="/profile/*" element={<ProfileContainer/>}/>
                            <Route path="/messages/*" element={<MessagesContainer/>}/>
                            <Route path="/friends/*" element={<UsersContainer/>}/>
                            <Route path="/news/" element={<News/>}/>
                            <Route path="/music" element={<Music/>}/>
                            <Route path="/settings" element={<Settings/>}/>
                        </Routes>
                    </Grid>
                </Grid>
            </Container>
        </>

    );
}

export default App;
