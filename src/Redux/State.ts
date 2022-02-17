export type PostsProps = {
    id: number
    message: string
    likesCount: number
}

export type UsersProps = {
    id: number
    name: string
}

export type MessageProps = {
    message: string
}

export type PagesProps = {
    posts: PostsProps[]
    users: UsersProps[]
    messages: MessageProps[]
}


export const state: PagesProps = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 5},
        {id: 2, message: 'It\'s my first post', likesCount: 1},
        {id: 3, message: 'I learn English every day', likesCount: 3},
        {id: 4, message: 'Hi, how are you?', likesCount: 4}
    ],
    users: [
        {id: 1, name: 'Sasha'},
        {id: 2, name: 'Kate'},
        {id: 3, name: 'Illya'},
        {id: 4, name: 'Sergey'},
        {id: 5, name: 'Dima'}
    ],
    messages: [
        {message: 'Hello, how are you?'},
        {message: 'Not bad)) And you?'},
        {message: 'I`m happy!'},
        {message: 'Buy, Dima!'},
        {message: 'Buy, Sasha!'}
    ]
}