export const country: NewsParamsType[] = [
    {id: 1, value: 'India', code: 'in'},
    {id: 2, value: 'USA', code: 'us'},
    {id: 3, value: 'Australia', code: 'au'},
    {id: 4, value: 'France', code: 'fr'},
    {id: 5, value: 'India', code: 'in'},
    {id: 6, value: 'United Kingdom', code: 'gb'},
]

export const category: NewsParamsType[] = [
    {id: 1, value: 'Business', code: 'business'},
    {id: 2, value: 'Entertainment', code: 'entertainment'},
    {id: 3, value: 'General', code: 'general'},
    {id: 4, value: 'Health', code: 'health'},
    {id: 5, value: 'Science', code: 'science'},
    {id: 6, value: 'Sports', code: 'sports'},
    {id: 7, value: 'Technology', code: 'technology'},
]

export const channels: NewsParamsType[] = [
    {id: 1, value: 'BBC News', code: 'bbc-news'},
    {id: 2, value: 'CNN', code: 'cnn'},
    {id: 3, value: 'Fox News', code: 'fox-news'},
    {id: 4, value: 'Google News', code: 'google-news'},
]

type NewsParamsType = {
    id: number
    value: string
    code: string
}