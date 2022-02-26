import React, {FC} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

//** Styles **//
import './app.css';

//** components **//
import Header from "./components/header/header";
import Navbar from "./components/navbar/navbar";
import Profile from "./components/profile/profile";
import Messages from "./components/messages/messages";
import Friends from "./components/friends/friends";
import News from "./components/news/news";
import Music from "./components/music/music";
import Settings from "./components/settings/settings";

import {PagesProps} from "./index";

import {Container, Grid} from "@mui/material";

const App: FC<PagesProps> = (state) => {
    return (
        <BrowserRouter>
            <Header/>
            <Container sx={{
                height: '100vh'
            }}>
                <Grid
                    container
                    spacing={1}
                    columns={12}>
                    <Grid item sm={4} sx={{height: '100vh'}}>
                        <Navbar/>
                    </Grid>
                    <Grid item xs={8}>
                        <Routes>
                            <Route path="/profile" element={<Profile
                                posts={state.posts}
                                addPost={state.addPost}
                                textArea={state.textArea}
                                updateNewPostText={state.updateNewPostText}/>}/>
                            <Route path="/messages/*"
                                   element={<Messages messages={state.messages} users={state.users}/>}/>
                            <Route path="/friends/*" element={<Friends users={state.users}/>}/>
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
