import {v1} from 'uuid';
import {dialogsReducer, DialogsStateType} from './dialogs-reducer';

let initialState: DialogsStateType;

beforeEach(() => {
    initialState = {
        users: [
            {id: v1(), name: 'Sasha'},
            {id: v1(), name: 'Kate'},
            {id: v1(), name: 'Illya'},
            {id: v1(), name: 'Sergey'},
            {id: v1(), name: 'Dima'}
        ],
        dialogs: [
            {
                id: 1,
                userName: 'Dima',
                hasNewMessages: false,
                newMessagesCount: 0,
                lastUserActivityDate: '',
                lastDialogActivityDate: '',
                photos: {
                    large: null,
                    small: null
                }
            },
        ],
        isLoading: false
    }
});