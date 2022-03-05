import React, {FC} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {Container, Grid} from "@mui/material";
import './app.css';

import Header from "./components/header/header";
import Navbar from "./components/navbar/navbar";
import Profile from "./components/profile/profile";
import Messages from "./components/messages/messages";
import Friends from "./components/friends/friends";
import News from "./components/news/news";
import Music from "./components/music/music";
import Settings from "./components/settings/settings";

import {DispatchProps, StateProps} from "./redux/state";

type AppType = {
    state: StateProps
    dispatch: (action: DispatchProps) => void
}

const App: FC<AppType> = (props) => {
    return (
        <BrowserRouter>
            <Header/>
            <Container sx={{height: '100vh'}}>
                <Grid
                    container
                    columnSpacing={{xs: 2, sm: 3, md: 5}}
                    columns={12}>
                    <Grid item sm={3} sx={{height: '100vh'}}>
                        <Navbar/>
                    </Grid>
                    <Grid item xs={9}>
                        <Routes>
                            <Route path="/profile" element={<Profile state={props.state} dispatch={props.dispatch}/>}/>
                            <Route path="/messages/*" element={<Messages state={props.state} dispatch={props.dispatch}/>}/>
                            <Route path="/friends/*" element={<Friends users={props.state.users}/>}/>
                            <Route path="/news/" element={<News/>}/>
                            <Route path="/music" element={<Music/>}/>
                            <Route path="/settings" element={<Settings/>}/>
                        </Routes>
                    </Grid>
                </Grid>
            </Container>
        </BrowserRouter>
    );
}

export default App;
