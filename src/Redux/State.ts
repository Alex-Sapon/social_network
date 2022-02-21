export interface PostsProps {
    id: number
    message: string
    likesCount: number
}

export interface UsersProps {
    id: number
    name: string
}

export interface MessagesProps {
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

export const addPost = (message: string) => {
    let post: PostsProps = {
        id: 5,
        message: message,
        likesCount: 1
    }
    state.posts.push(post)
}