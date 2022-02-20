import Messages from "../Components/Messages/Messages";

export type PostsProps = {
    id: number
    message: string
    likesCount: number
}

export type UsersProps = {
    id: number
    name: string
}

export type MessagesProps = {
    message: string
}

export const state = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 5},
        {id: 2, message: 'It\'s my first post', likesCount: 1},
        {id: 3, message: 'I learn English every day', likesCount: 3},
        {id: 4, message: 'Hi, how are you?', likesCount: 4}
    ],
    messages: [
        {message: 'Hello, how are you?'},
        {message: 'Not bad)) And you?'},
        {message: 'I`m happy!'},
        {message: 'Buy, Dima!'},
        {message: 'Buy, Sasha!'}
    ],
    users: [
        {id: 1, name: 'Sasha'},
        {id: 2, name: 'Kate'},
        {id: 3, name: 'Illya'},
        {id: 4, name: 'Sergey'},
        {id: 5, name: 'Dima'}
    ]
}