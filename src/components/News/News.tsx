import React, {useEffect, useState} from 'react';
import styles from './News.module.css'
import {NewsCard} from './NewsCard/NewsCard'
import {useActions, useAppSelector} from '../../assets/utils';
import {newsAsyncActions} from './news-reducer';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';


const country: CountryType[] = [
    {id: 1, country: 'India', code: 'in'},
    {id: 2, country: 'USA', code: 'us'},
    {id: 3, country: 'Australia', code: 'au'},
    {id: 4, country: 'France', code: 'fr'},
    {id: 5, country: 'India', code: 'in'},
    {id: 6, country: 'United Kingdom', code: 'gb'},
]

const category: CategoryType[] = [
    {id: 1, category: 'Business', code: 'business'},
    {id: 2, category: 'Entertainment', code: 'entertainment'},
    {id: 3, category: 'General', code: 'general'},
    {id: 4, category: 'Health', code: 'health'},
    {id: 5, category: 'Science', code: 'science'},
    {id: 6, category: 'Sports', code: 'sports'},
    {id: 6, category: 'Technology', code: 'technology'},
]


type CountryType = {
    id: number
    country: string
    code: string
}

type CategoryType = {
    id: number
    category: string
    code: string
}

export const News = () => {
    const {getNews} = useActions(newsAsyncActions);

    const [currPage, setCurrPage] = useState(1);
    const [prevPage, setPrevPage] = useState(0);

    const [countrySelect, setCountrySelect] = useState('');
    const [categorySelect, setCategorySelect] = useState('');

    const articles = useAppSelector(state => state.newsPage.articles);

    function isScrolling() {
        if (window.innerHeight + document.documentElement.scrollHeight !== document.documentElement.offsetHeight) {
            return;
        } else {
            console.log('scrolling down')
        }
    }

    const onCountryChange = (e: SelectChangeEvent) => {
        setCountrySelect(e.target.value);
    }

    const onCategoryChange = (e: SelectChangeEvent) => {
        setCategorySelect(e.target.value);
    }

    useEffect(() => {
        if (countrySelect && categorySelect) {
            getNews({country: countrySelect, category: categorySelect});
        }

        window.addEventListener('scroll', isScrolling);

        return () => window.removeEventListener('scroll', isScrolling);
    }, [countrySelect, categorySelect, getNews])

    return (
        <div className={styles.news_container}>
            <div className={styles.selects}>
                <FormControl size="small" sx={{width: '200px', mr: '2rem', backgroundColor: 'white'}}>
                    <Select
                        size="small"
                        value={countrySelect}
                        placeholder="Search by country"
                        onChange={onCountryChange}
                    >
                        {country.map(({id, country, code}) => <MenuItem key={id} value={code}>{country}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{width: '200px', backgroundColor: 'white'}}>
                    <Select
                        size="small"
                        value={categorySelect}
                        placeholder="Search by category"
                        onChange={onCategoryChange}
                    >
                        {category.map(({id, category, code}) => <MenuItem key={id} value={code}>{category}</MenuItem>)}
                    </Select>
                </FormControl>
            </div>
            <div>
                {articles.map(article => <NewsCard key={article.title} {...article}/>)}
            </div>

        </div>
    )
}


