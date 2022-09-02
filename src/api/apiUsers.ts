import {instance} from './instanceApi';
import {IResponse, IUserData} from './types';

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<IUserData>(`users?page=${currentPage}&count=${pageSize}`);
    },
    followUser(userId: number) {
        return instance.post<IResponse>(`follow/${userId}`);
    },
    unfollowUser(userId: number) {
        return instance.delete<IResponse>(`follow/${userId}`);
    },
};
