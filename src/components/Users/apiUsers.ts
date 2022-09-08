import {instance} from '../../api/instanceApi';
import {IResponse, IUserData} from '../../api';

export const usersAPI = {
    getUsers(params: IUsersParams) {
        return instance.get<IUserData>(`users`, {params});
    },
    followUser(userId: number) {
        return instance.post<IResponse>(`follow/${userId}`);
    },
    unfollowUser(userId: number) {
        return instance.delete<IResponse>(`follow/${userId}`);
    },
};

export interface IUsersParams {
    count: number
    page: number
    term?: string
    friend?: boolean
}

