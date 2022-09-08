import {Navigate, Route, Routes} from 'react-router-dom';

import {Box, CircularProgress, Container, Grid} from '@mui/material';
import './app.css';

import {Navbar} from '../Navbar/Navbar';
import {News} from '../News/News';
import Music from '../Music/Music';
import Settings from '../Settings/Settings';
import ProfileContainer from '../Profile/ProfileContainer';
import {Login} from '../Login';

import {PATH} from '../../enums/path';
import React, {lazy, Suspense, useEffect} from 'react';
import {initializeApp} from './app-reducer';
import {Preloader} from '../../common/Preloader';
import {useAppDispatch, useAppSelector} from '../../assets/utils';
import {selectAppIsInitialized} from './selectors';

const UsersContainer = lazy(() => import('../Users/UsersContainer'));
const DialogsContainer = lazy(() => import('../Dialogs/Dialogs'));

export const App = () => {
    const dispatch = useAppDispatch();

    const isInitialized = useAppSelector(selectAppIsInitialized);

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
        <Container sx={{pt: '3rem'}}>
            <Grid container columns={12} columnGap={8}>
                <Grid item xs={3}>
                    <Navbar/>
                </Grid>
                <Grid item xs>
                    <Suspense fallback={<Preloader/>}>
                        <Routes>
                            <Route path={PATH.HOME} element={<Navigate to={PATH.LOGIN}/>}/>
                            <Route path={PATH.PROFILE} element={<ProfileContainer/>}/>
                            <Route path={PATH.MESSAGES} element={<DialogsContainer/>}/>
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
    );
};
