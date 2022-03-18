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
    const stateCopy = {...state}

    switch (action.type) {
        case ADD_MESSAGE:
            if (stateCopy.newMessage.trim().length) {
                stateCopy.messages = [...state.messages]
                stateCopy.messages.push({message: stateCopy.newMessage})
                stateCopy.newMessage = ''
            }
            return stateCopy
        case UPDATE_NEW_MESSAGE:
            stateCopy.newMessage = action.newMessage! // ненулевой оператор утверждения = !
            return stateCopy
        default:
            return stateCopy
    }
}

// функции, которые возвращают action (объект)

// add Message
export const addMessageActionCreator = () => ({type: ADD_MESSAGE});
export const updateMessageActionCreator = (message: string) => ({type: UPDATE_NEW_MESSAGE, newMessage: message});

export default messagesReducer