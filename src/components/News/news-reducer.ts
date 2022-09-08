import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {newsAPI, NewsResponseType} from './apiNews';
import {AxiosError} from 'axios';

export const fetchNews = createAsyncThunk<{ data: Omit<NewsResponseType, 'status'> },
    { category: string, country: string, channel?: string }, { rejectValue: string }>
('news/fetchNews', async ({category, country, channel}, {rejectWithValue}) => {

    try {
        const res = channel ? await newsAPI.getAllNews(channel) : await newsAPI.getTopNews(category, country);
        if (res.data.status === 'ok') {
            return {data: res.data};
        }

        return rejectWithValue('Some error has occurred');
    } catch (e) {
        return rejectWithValue((e as AxiosError).message);
    }
})

const newsSlice = createSlice({
    name: 'news',
    initialState: {
        isLoading: false,
        error: null,
        totalResults: 0,
        articles: []
    } as NewsStateType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.articles = action.payload.data.articles;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.error = action.payload!;
                state.isLoading = false;
            })
    }
})

export const newsReducer = newsSlice.reducer;
export const newsAsyncActions = {fetchNews};

type NewsStateType = Omit<NewsResponseType, 'status'> & {
    isLoading: boolean
    error: string | null
}


