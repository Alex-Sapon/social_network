import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://saurav.tech/NewsAPI/',
})

export const newsAPI = {
    getTopNews(category: string, country: string) {
        return instance.get<NewsResponseType>(`top-headlines/category/${category}/${country}.json`);
    },
    getAllNews(channel: string) {
        return instance.get<any>(`everything/${channel}.json`);
    },
    getSourcesNews() {
        return instance.get<any>(`sources.jsonn`);
    },
}

export interface ParamsType {
    page: number
}

export type NewsResponseType = {
    status: string
    totalResults: number
    articles: NewsArticleType[]
}

export type NewsArticleType = {
    source: {
        id: null,
        name: string
    },
    author: string
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: string
    content: string
}
