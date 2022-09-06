import React, {useEffect, useState} from 'react';
import styles from './News.module.css'
import {NewsCard} from './NewsCard/NewsCard'
import {useActions, useAppSelector} from '../../assets/utils';
import {newsAsyncActions} from './news-reducer';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {Preloader} from '../../common/Preloader';


const country: NewsParamsType[] = [
    {value: 'India', code: 'in'},
    {value: 'USA', code: 'us'},
    {value: 'Australia', code: 'au'},
    {value: 'France', code: 'fr'},
    {value: 'India', code: 'in'},
    {value: 'United Kingdom', code: 'gb'},
]

const category: NewsParamsType[] = [
    {value: 'Business', code: 'business'},
    {value: 'Entertainment', code: 'entertainment'},
    {value: 'General', code: 'general'},
    {value: 'Health', code: 'health'},
    {value: 'Science', code: 'science'},
    {value: 'Sports', code: 'sports'},
    {value: 'Technology', code: 'technology'},
]

const channels: NewsParamsType[] = [
    {value: 'BBC News', code: 'bbc-news'},
    {value: 'CNN', code: 'cnn'},
    {value: 'Fox News', code: 'fox-news'},
    {value: 'Google News', code: 'google-news'},
]

type NewsParamsType = {
    value: string
    code: string
}

export const News = () => {
    const {fetchTopNews, fetchAllNews} = useActions(newsAsyncActions);

    const [currPage, setCurrPage] = useState(1);
    const [prevPage, setPrevPage] = useState(0);

    const [countrySelect, setCountry] = useState('us');
    const [categorySelect, setCategory] = useState('business');
    const [channelSelect, setChannel] = useState('');

    const articles = useAppSelector(state => state.newsPage.articles);
    const isLoading = useAppSelector(state => state.newsPage.isLoading);

    function isScrolling() {
        if (window.innerHeight + document.documentElement.scrollHeight !== document.documentElement.offsetHeight) {
            return;
        } else {
            console.log('scrolling down')
        }
    }

    const onCountryChange = (e: SelectChangeEvent) => {
        setChannel('');
        setCountry(e.target.value);
    }

    const onCategoryChange = (e: SelectChangeEvent) => {
        setChannel('');
        setCategory(e.target.value);
    }

    const onChannelChange = (e: SelectChangeEvent) => {
        setCountry('');
        setCategory('');
        setChannel(e.target.value);
        fetchAllNews(e.target.value);
    }

    useEffect(() => {
        if (countrySelect && categorySelect) {
            fetchTopNews({country: countrySelect, category: categorySelect});
        }

        window.addEventListener('scroll', isScrolling);

        return () => window.removeEventListener('scroll', isScrolling);
    }, [countrySelect, categorySelect, fetchTopNews])

    return (
        <div className={styles.news_container}>
            <div className={styles.selects}>
                <FormControl size="small" sx={{width: '200px', mr: '2rem', backgroundColor: 'white'}}>
                    <Select size="small" value={countrySelect} onChange={onCountryChange}>
                        {country.map(({value, code}) => <MenuItem key={code} value={code}>{value}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{width: '200px', mr: '2rem', backgroundColor: 'white'}}>
                    <Select size="small" value={categorySelect} onChange={onCategoryChange}>
                        {category.map(({value, code}) => <MenuItem key={code} value={code}>{value}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{width: '200px', mr: '2rem', backgroundColor: 'white'}}>
                    <Select size="small" value={channelSelect} onChange={onChannelChange}>
                        {channels.map(({value, code}) => <MenuItem key={code} value={code}>{value}</MenuItem>)}
                    </Select>
                </FormControl>
            </div>
            {isLoading
                ? <Preloader/>
                : <>{articles.map(article => <NewsCard key={article.title} {...article}/>)}</>
            }


        </div>
    )
}


