import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import styles from './Music.module.css';
import Typography from '@mui/material/Typography';

export const Music = () => {
    return (
        <>
            <Typography variant="h2" gutterBottom sx={{mb: '2rem', fontSize: '26px', textAlign: 'center'}}>
                My favorite music
            </Typography>
            <div className={styles.music_list}>
                {songs.map((song, i) =>
                    <ReactAudioPlayer key={i} src={song} controls className={styles.music_player}/>
                )}
            </div>
        </>
    )
}

const songs = [
    'https://dl2.mp3party.net/online/7473483.mp3',
    'https://dl2.mp3party.net/online/5325193.mp3',
    'https://dl1.savemusic.me/mp3/03510f8db23b0b88dc48f9526f75b5fd.mp3',
]
