import {HashRouter, Route, Routes, Navigate} from 'react-router-dom';

import {Box, CircularProgress, Container, Grid} from '@mui/material';
import './app.css';

import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import ProfileContainer from './components/Profile/ProfileContainer';
import {Login} from './components/Login/Login';

import {PATH} from './enums/path';
import React, {lazy, Suspense, useEffect} from 'react';
import {initializeApp} from './redux/reducers/app-reducer';
import {Header} from './components/Header/Header';
import {Provider} from 'react-redux';
import {store, useAppDispatch, useAppSelector} from './redux/redux-store';
import {Preloader} from './common/Preloader/Preloader';

const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));
const MessagesContainer = lazy(() => import('./components/Messages/MessagesContainer'));

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
            {/*<Header/>*/}
            <Container sx={{mt: '3rem'}}>
                <Grid container columns={12} columnGap={8}>
                    <Grid item xs={3}>
                        <Navbar/>
                    </Grid>
                    <Grid item xs>
                        <Suspense fallback={<Preloader/>}>
                            <Routes>
                                <Route path={'/'} element={<Navigate to={PATH.LOGIN}/>}/>
                                <Route path={PATH.PROFILE} element={<ProfileContainer/>}/>
                                <Route path={PATH.MESSAGES} element={<MessagesContainer/>}/>
                                <Route path={PATH.USERS} element={<UsersContainer/>}/>
                                <Route path={PATH.NEWS} element={<News/>}/>
                                <Route path={PATH.MUSIC} element={<Music/>}/>
                                <Route path={PATH.SETTINGS} element={<Settings/>}/>
                                <Route path={PATH.LOGIN} element={<Login/>}/>
                            </Routes>
                        </Suspense>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export const SamuraiJSApp = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </HashRouter>
    )
};
