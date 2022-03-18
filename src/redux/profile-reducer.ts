import {RootDispatchProps, ProfilePageProps} from './redux-store'

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST = 'UPDATE-NEW-POST'

const initialState: ProfilePageProps = {
    posts: [
        {id: 1, message: 'It\'s my first Post', likesCount: 3},
        {id: 2, message: 'I want to learn React and TypeScript.', likesCount: 5},
        {id: 3, message: 'I learn English every day.', likesCount: 3},
        {id: 4, message: 'Hi, how are you?', likesCount: 4}
    ],
    newPost: ''
}

const profileReducer = (state = initialState, action: RootDispatchProps) => {
    switch (action.type) {
        case UPDATE_NEW_POST:
            return {...state, newPost: action.newPost}
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 5, message: state.newPost, likesCount: 0}],
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