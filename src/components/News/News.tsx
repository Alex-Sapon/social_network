import React from 'react';
import styles from './News.module.css'
import {NewsCard} from './NewsCard/NewsCard'

export const News = () => {
    return (
        <div className={styles.news_container}>
            {new Array(4).fill(null).map((_, i) => <NewsCard key={i}/>)}
        </div>
    )
}
