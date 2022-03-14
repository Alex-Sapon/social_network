import {DispatchProps, MessagesPageProps} from './redux-store'

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

const messagesReducer = (state = initialState, action: DispatchProps) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let messageBody: string
            if (state.newMessage.length && state.newMessage.match(/[a-zy]/gi)) {
                messageBody = state.newMessage
                state.messages.push({message: messageBody})
                state.newMessage = ''
            }
            return state
        case UPDATE_NEW_MESSAGE:
            state.newMessage = action.newMessage! // ненулевой оператор утверждения = !
            return state
        default:
            return state
    }
}

// функции, которые возвращают action (объект)

// add Message
export const addMessageActionCreator = () => ({type: ADD_MESSAGE});
export const updateMessageActionCreator = (message: string) => ({type: UPDATE_NEW_MESSAGE, newMessage: message});

export default messagesReducer