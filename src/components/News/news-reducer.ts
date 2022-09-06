import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {newsAPI, NewsResponseType} from '../../api/apiNews';

export const getNews = createAsyncThunk<any, {category: string, country: string}>('news/getNews', async ({category, country}) => {
    const res = await newsAPI.getTopNews(category, country);
    return {data: res.data}
})

const newsSlice = createSlice({
    name: 'news',
    initialState: {
        totalResults: 0,
        articles: []
    } as Omit<NewsResponseType, 'status'>,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getNews.fulfilled, (state, action) => {
            state.articles = action.payload.data.articles
        })
    }
})

export const newsReducer = newsSlice.reducer;
export const newsAsyncActions = {getNews}


