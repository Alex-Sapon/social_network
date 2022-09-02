import {instance} from './instanceApi';
import {IResponse} from './types';

export const dialogsAPI = {
    getDialogs() {
        return instance.get<IResponse<IDialogs>>(`dialogs`);
    },
    createDialogsUser(userId: number) {
        return instance.put(`dialogs/${userId}`);
    },
    getDialogsList(userId: number, page: number, count: number) {
        return instance.get(`dialogs/${userId}/messages?page=${page}&count=${count}`);
    },
    createMessages(userId: number, message: string) {
        return instance.post(`dialogs/${userId}/messages`, message);
    },
    getDialogsViewed(messageId: number) {
        return instance.get(`dialogs/messages/${messageId}/viewed`);
    },



}

export interface IDialogs {
    id: number
    userName: string
    hasNewMessages: boolean
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: {
        small: null
        large: null
    }
}