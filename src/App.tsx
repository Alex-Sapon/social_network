import React, {FC} from 'react';
import {Routes, Route} from 'react-router-dom';

import {Container, Grid} from '@mui/material';
import './app.css';

import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import MessagesContainer from './components/Messages/MessagesContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import FriendsContainer from './components/Friends/FriendsContainer';

const App: FC = () => {
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
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/messages/*" element={<MessagesContainer/>}/>
                            <Route path="/friends/*" element={<FriendsContainer/>}/>
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