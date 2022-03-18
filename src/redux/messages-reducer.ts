import {RootDispatchProps, MessagesPageProps} from './redux-store'

const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE'

const initialState: MessagesPageProps = {
    users: [
        {id: 1, name: 'Sasha'},
        {id: 2, name: 'Kate'},
        {id: 3, name: 'Illya'},
        {id: 4, name: 'Sergey'},
        {id: 5, name: 'Dima'}
    ],
    messages: [
        {message: 'Hello Dima, how are you?'},
        {message: 'Not bad)) And you?'},
        {message: 'I`m happy!'},
        {message: 'Buy, Dima!'},
        {message: 'Buy, Sasha!'}
    ],
    newMessage: ''
}

const messagesReducer = (state = initialState, action: RootDispatchProps) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE:
            return {...state, newMessage: action.newMessage}
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {message: state.newMessage}],
                newMessage: ''
            }
        default:
            return state
    }
}

// функции, которые возвращают action (объект)

// add Message
export const addMessageActionCreator = () => ({type: ADD_MESSAGE});
export const updateMessageActionCreator = (message: string) => ({type: UPDATE_NEW_MESSAGE, newMessage: message});

export default messagesReducer