import React, {FC} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

//** Styles **//
import './App.css';

//** Components **//
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import Profile from "./Components/Profile/Profile";
import Messages from "./Components/Messages/Messages";
import Friends from "./Components/Friends/Friends";
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";

//** Type of state **//
import {PagesProps} from "./index";

//** Styles from MUI **//
import {Container} from "@mui/material";

const App: FC<PagesProps> = ({posts, messages, users, addPost}) => {
    return (
        <BrowserRouter>
            <Header/>
            <Container sx={{display: 'flex', height: '100vh'}}>
                <Navbar/>
                <Routes>
                    <Route path="/profile" element={<Profile posts={posts} addPost={addPost}/>}/>
                    <Route path="/messages/*" element={<Messages messages={messages} users={users}/>}/>
                    <Route path="/friends/*" element={<Friends users={users}/>}/>
                    <Route path="/news/" element={<News/>}/>
                    <Route path="/music" element={<Music/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
