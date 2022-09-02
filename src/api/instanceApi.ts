import axios from 'axios';

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'api-key': 'f792b12a-d8af-4d0c-9c10-26bd2b72a31b',
    },
});