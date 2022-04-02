import {v1} from 'uuid'
import {ProfilePageProps} from './redux-store'

const ADD_POST = 'ADD_POST'
const UPDATE_NEW_POST = 'UPDATE_NEW_POST'

export type ProfileDispatchProps = {
    type: string
    newPost?: string
}

const initialState: ProfilePageProps = {
    posts: [
        {id: v1(), message: 'It\'s my first Post', likesCount: 3},
        {id: v1(), message: 'Hi, how are you?', likesCount: 4},
        {id: v1(), message: 'I want to learn React and TypeScript.', likesCount: 5},
        {id: v1(), message: 'I learn English every day.', likesCount: 3},
    ],
    newPost: ''
}

const profileReducer = (state = initialState, action: ProfileDispatchProps) => {
    switch (action.type) {
        case UPDATE_NEW_POST:
            return {...state, newPost: action.newPost}
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: v1(), message: state.newPost, likesCount: 0}],
                newPost: ''
            }
        default:
            return state
    }
}

// функции, которые возвращают action (объект)

// add Post
export const addPostActionCreator = () => ({type: ADD_POST})
export const updatePostChangeActionCreator = (text: string) => ({type: UPDATE_NEW_POST, newPost: text})

export default profileReducer