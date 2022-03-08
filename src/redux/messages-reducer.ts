import {DispatchProps, MessagesPageProps} from './state'

const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE'

const messagesReducer = (state: MessagesPageProps, action: DispatchProps) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let messageBody: string = state.newMessage
            state.messages.push({message: messageBody})
            state.newMessage = ''
            return state
        case UPDATE_NEW_MESSAGE:
            state.newMessage = action.newMessage! // ненулевой оператор утверждения = !
            return state
        default:
            return state
    }
}

// функции, которые возвращают action (объект)

// add message
export const addMessageActionCreator = () => ({type: ADD_MESSAGE});
export const updateMessageActionCreator = (message: string) => ({type: UPDATE_NEW_MESSAGE, newMessage: message});

export default messagesReducer