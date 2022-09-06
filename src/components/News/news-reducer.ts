import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {newsAPI, NewsResponseType} from '../../api/apiNews';

export const fetchTopNews = createAsyncThunk<any, { category: string, country: string }>('news/fetchTopNews', async ({
                                                                                                               category,
                                                                                                               country
                                                                                                           }) => {
    const res = await newsAPI.getTopNews(category, country);
    return {data: res.data}
})

export const fetchAllNews = createAsyncThunk('news/fetchAllNews', async (channel: string) => {
    const res = await newsAPI.getAllNews(channel);
    return {data: res.data}
})

const newsSlice = createSlice({
    name: 'news',
    initialState: {
        isLoading: false,
        totalResults: 0,
        articles: []
    } as NewsStateType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTopNews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTopNews.fulfilled, (state, action) => {
                state.articles = action.payload.data.articles;
                state.isLoading = false;
            })
            .addCase(fetchAllNews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllNews.fulfilled, (state, action) => {
                state.articles = action.payload.data.articles;
                state.isLoading = false;
            })
    }
})

export const newsReducer = newsSlice.reducer;
export const newsAsyncActions = {fetchTopNews, fetchAllNews};

type NewsStateType = Omit<NewsResponseType, 'status'> & {
    isLoading: boolean
}


