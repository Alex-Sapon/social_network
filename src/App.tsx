import {Route, Routes} from 'react-router-dom';

import {Box, CircularProgress, Container, Grid} from '@mui/material';
import './app.css';

import Navbar from './components/Navbar/Navbar';
import MessagesContainer from './components/Messages/MessagesContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import Login from './components/Login/Login';

import {PATH} from './enums/path';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from './redux/hooks';
import {initializeApp} from './redux/reducers/app-reducer';
import {Header} from './components/Header/Header';

const App = () => {
    const dispatch = useAppDispatch();

    const isInitialized = useAppSelector(state => state.app.isInitialized);

    useEffect(() => {
        dispatch(initializeApp());
    }, [dispatch])

    if (!isInitialized) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '30%'}}>
                <CircularProgress/>
            </Box>
        )
    }

    return (
        <>
            <Header/>
            <Container sx={{height: '100vh'}}>
                <Grid container columnSpacing={{xs: 2, sm: 3, md: 5}} sx={{height: '100vh'}} columns={12}>
                    <Grid item xs={3}>
                        <Navbar/>
                    </Grid>
                    <Grid item xs={9}>
                        <Routes>
                            <Route path={PATH.PROFILE} element={<ProfileContainer/>}/>
                            <Route path={PATH.MESSAGES} element={<MessagesContainer/>}/>
                            <Route path={PATH.FRIENDS} element={<UsersContainer/>}/>
                            <Route path={PATH.NEWS} element={<News/>}/>
                            <Route path={PATH.MUSIC} element={<Music/>}/>
                            <Route path={PATH.SETTINGS} element={<Settings/>}/>
                            <Route path={PATH.LOGIN} element={<Login/>}/>
                        </Routes>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default App;
