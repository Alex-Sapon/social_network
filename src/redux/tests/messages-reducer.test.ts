import {v1} from 'uuid';
import {addMessage, messagesReducer, MessagesStateType} from '../reducers/messages-reducer';

test('new message should be added', () => {
    const initialState: MessagesStateType = {
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
    }

    const endState = messagesReducer(initialState, addMessage('rrr'))

    expect(endState.messages.length).toBe(6)
    expect(endState.messages[5].message).toBe('rrr')
    expect(initialState.messages.length).toBe(5)
})