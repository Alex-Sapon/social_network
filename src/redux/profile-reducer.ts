import {DispatchProps, PostsProps, ProfilePageProps} from './store'

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST = 'UPDATE-NEW-POST'

const initialState: ProfilePageProps = {
    posts: [
        {id: 1, message: 'It\'s my first post', likesCount: 3},
        {id: 2, message: 'I want to learn React and TypeScript.', likesCount: 5},
        {id: 3, message: 'I learn English every day.', likesCount: 3},
        {id: 4, message: 'Hi, how are you?', likesCount: 4}
    ],
    newPost: ''
}

const profileReducer = (state = initialState, action: DispatchProps) => {
    switch (action.type) {
        case ADD_POST:
            let post: PostsProps = {
                id: 5,
                message: state.newPost,
                likesCount: 1
            }
            state.posts.push(post)
            state.newPost = ''
            return state
        case UPDATE_NEW_POST:
            state.newPost = action.newPost! // ненулевой оператор утверждения = !
            return state
        default:
            return state
    }
}

// функции, которые возвращают action (объект)

// add post
export const addPostActionCreator = () => ({type: ADD_POST})
export const onPostChangeActionCreator = (text: string) => ({type: UPDATE_NEW_POST, newPost: text})

export default profileReducer