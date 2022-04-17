import {v1} from 'uuid'

const initialState = {
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

type InitialMessagesType = typeof initialState

export const messagesReducer = (state: InitialMessagesType = initialState, action: ActionsType): InitialMessagesType => {
    switch (action.type) {
        case 'UPDATE_NEW_MESSAGE':
            return {...state, newMessage: action.newMessage}
        case 'ADD_MESSAGE':
            return {...state, messages: [...state.messages, {id: v1(), message: state.newMessage}], newMessage: ''}
        default:
            return state
    }
}

type ActionsType = ReturnType<typeof addMessage> | ReturnType<typeof updateMessage>

export const addMessage = () => ({type: 'ADD_MESSAGE'} as const);
export const updateMessage = (newMessage: string) => ({type: 'UPDATE_NEW_MESSAGE', newMessage} as const);