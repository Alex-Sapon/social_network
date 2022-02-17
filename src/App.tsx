import React, {FC} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';

import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import Profile from "./Components/Profile/Profile";
import Messages from "./Components/Messages/Messages";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";

import {PagesProps} from "./Redux/State";

const App: FC<PagesProps> = (state) => {
    return (
        <BrowserRouter>
            <div className='app'>
                <Header/>
                <Navbar/>
                <div className="app__content">
                    <Routes>
                        <Route path="/profile" element={<Profile posts={state.posts} />}/>
                        <Route path="/messages/*" element={<Messages messages={state.messages} users={state.users}/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
