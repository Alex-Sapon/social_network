import {v1} from 'uuid';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {dialogsAPI} from '../../api/apiDialogs';

const InitialState: MessagesStateType = {
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

export const fetchDialogs = createAsyncThunk<any, number, { state: { rejectValue: string } }>('dialogs/fetchDialogs', async (id, {
    dispatch,
    rejectWithValue
}) => {
    try {
        const res = await dialogsAPI.createDialogsUser(id);
    } catch (e) {

    }
})

export const messagesReducer = (state: MessagesStateType = InitialState, action: MessageActions): MessagesStateType => {
    switch (action.type) {
        case 'MESSAGES/ADD-MESSAGE':
            return {...state, messages: [...state.messages, {id: v1(), message: action.payload.message}]};
        default:
            return state;
    }
};

export const addMessage = (message: string) => ({
    type: 'MESSAGES/ADD-MESSAGE',
    payload: {
        message,
    }
} as const);

export type UserType = {
    id: string
    name: string
};

export type MessageType = {
    id: string
    message: string
};

export type MessagesStateType = {
    users: UserType[]
    messages: MessageType[]
};

export type MessageActions = ReturnType<typeof addMessage>;