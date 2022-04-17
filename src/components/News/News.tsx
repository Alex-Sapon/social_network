import React, {FC} from "react";
import styles from './News.module.css'
import {NewsCard} from './NewsCard/NewsCard'

const News: FC = () => {
    return (
        <div className={styles.news_container}>
            {[...Array(4)].map((_, i) => <NewsCard key={i}/>)}
        </div>
    )
}

export default News;