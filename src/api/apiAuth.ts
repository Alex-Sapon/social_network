import {instance} from './instanceApi';
import {IAuthData, IResponse, IUserParams} from './types';

export const authAPI = {
    me() {
        return instance.get<IResponse<IAuthData>>(`auth/me`);
    },
    login(data: IUserParams) {
        return instance.post<IResponse<{ userId: number }>>(`auth/login`, data);
    },
    logout() {
        return instance.delete<IResponse>(`auth/login`);
    },
};