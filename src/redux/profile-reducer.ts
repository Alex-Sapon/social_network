import {DispatchProps, PostsProps, ProfilePageProps} from './state'

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST = 'UPDATE-NEW-POST'

const profileReducer = (state: ProfilePageProps, action: DispatchProps) => {
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