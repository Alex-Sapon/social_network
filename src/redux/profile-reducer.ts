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
    const stateCopy = {...state}

    switch (action.type) {
        case ADD_POST:
            if (stateCopy.newPost.trim().length) {
                stateCopy.posts = [...state.posts]
                stateCopy.posts.push({id: 5, message: stateCopy.newPost, likesCount: 0})
                stateCopy.newPost = ''
            }
            return stateCopy
        case UPDATE_NEW_POST:
            stateCopy.newPost = action.newPost! // ненулевой оператор утверждения = !
            return stateCopy
        default:
            return stateCopy
    }
}

// функции, которые возвращают action (объект)

// add Post
export const addPostActionCreator = () => ({type: ADD_POST})
export const updatePostChangeActionCreator = (text: string) => ({type: UPDATE_NEW_POST, newPost: text})

export default profileReducer