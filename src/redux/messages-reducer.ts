import {v1} from 'uuid';

export type UserType = {
    id: string
    name: string
};
export type MessageType = {
    id: string
    message: string
};
export type MessagesStateType = {
    users: Array<UserType>
    messages: Array<MessageType>
};

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
};

export const messagesReducer = (state: MessagesStateType = initialState, action: MessageActionsType): MessagesStateType => {
    switch (action.type) {
        case 'ADD-MESSAGE':
            return {...state, messages: [...state.messages, {id: v1(), message: action.payload.message}]};
        default:
            return state;
    }
};

export type MessageActionsType = ReturnType<typeof addMessage>;

export const addMessage = (message: string) => ({
    type: 'ADD-MESSAGE',
    payload: {
        message,
    }
}) as const;