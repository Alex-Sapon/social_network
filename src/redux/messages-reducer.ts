import {v1} from 'uuid'
import {MessagesPageProps} from './redux-store'

const ADD_MESSAGE = 'ADD_MESSAGE'
const UPDATE_NEW_MESSAGE = 'UPDATE_NEW_MESSAGE'

export type MessageDispatchProps = {
    type: string
    newMessage?: string
}

const initialState: MessagesPageProps = {
    users: [
        {id: v1(), name: 'Sasha'},
        {id: v1(), name: 'Kate'},
        {id: v1(), name: 'Illya'},
        {id: v1(), name: 'Sergey'},
        {id: v1(), name: 'Dima'}
    ],
    messages: [
        {id: v1(), message: 'Hello Dima, how are you?'},
        {id: v1(), message: 'Not bad)) And you?'},
        {id: v1(), message: 'I`m happy!'},
        {id: v1(), message: 'Buy, Dima!'},
        {id: v1(), message: 'Buy, Sasha!'}
    ],
    newMessage: ''
}

const messagesReducer = (state = initialState, action: MessageDispatchProps) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE:
            return {...state, newMessage: action.newMessage}
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: v1(), message: state.newMessage}],
                newMessage: ''
            }
        default:
            return state
    }
}

// функции, которые возвращают action (объект, у которого есть как минимум одно свойство - type)

// add Message
export const addMessageActionCreator = () => ({type: ADD_MESSAGE});
export const updateMessageActionCreator = (message: string) => ({type: UPDATE_NEW_MESSAGE, newMessage: message});

export default messagesReducer