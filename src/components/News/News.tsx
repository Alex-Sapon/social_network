import React, {useEffect, useState} from 'react';
import styles from './News.module.css'
import {NewsCard} from './NewsCard/NewsCard'
import {useActions, useAppSelector} from '../../assets/utils';
import {newsAsyncActions} from './news-reducer';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import {Preloader} from '../../common/Preloader';
import {category, channels, country} from './data';
import FormHelperText from '@mui/material/FormHelperText';

export const News = () => {
    const {fetchNews} = useActions(newsAsyncActions);

    const [countrySelect, setCountry] = useState('us');
    const [categorySelect, setCategory] = useState('business');
    const [channelSelect, setChannel] = useState('');

    const articles = useAppSelector(state => state.newsPage.articles);
    const isLoading = useAppSelector(state => state.newsPage.isLoading);

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
        fetchNews({country: '', category: '', channel: e.target.value});
    }

    useEffect(() => {
        if (countrySelect && categorySelect) {
            fetchNews({country: countrySelect, category: categorySelect});
        }
    }, [countrySelect, categorySelect, fetchNews])

    return (
        <div className={styles.news_container}>
            <Typography variant="h2" gutterBottom sx={{mb: '2rem', fontSize: '26px', textAlign: 'center'}}>
                Search news by country and category or by channel
            </Typography>
            <div className={styles.selects}>
                <FormControl size="small" sx={{width: '200px', mr: '2rem'}}>
                    <FormHelperText>Сountries</FormHelperText>
                    <Select size="small" value={countrySelect} onChange={onCountryChange} sx={{backgroundColor: 'white'}}>
                        {country.map(({value, code, id}) => <MenuItem key={id} value={code}>{value}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{width: '200px', mr: '2rem'}}>
                    <FormHelperText>Сategories</FormHelperText>
                    <Select size="small" value={categorySelect} onChange={onCategoryChange} sx={{backgroundColor: 'white'}}>
                        {category.map(({value, code, id}) => <MenuItem key={id} value={code}>{value}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{width: '200px', mr: '2rem'}}>
                    <FormHelperText>Channels</FormHelperText>
                    <Select size="small" value={channelSelect} onChange={onChannelChange} sx={{backgroundColor: 'white'}}>
                        {channels.map(({value, code, id}) => <MenuItem key={id} value={code}>{value}</MenuItem>)}
                    </Select>
                </FormControl>
            </div>
            {isLoading
                ? <Preloader/>
                : <>{articles.map((article, i) => <NewsCard key={i} {...article}/>)}</>
            }
        </div>
    )
}


