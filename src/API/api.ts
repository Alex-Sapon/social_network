import axios from 'axios';
import {ProfileType} from '../redux/profile-reducer';
import {UsersStateType} from '../redux/users-reducer';

type FollowDataType = {
    resultCode: number
    messages: Array<string>,
    data: object
}
type AuthDataType = {
    id: number
    login: string
    email: string
}
type AuthType = {
    data: AuthDataType
    messages: Array<any>
    fieldsErrors: Array<any>
    resultCode: number
}

// DAL - data access layer
const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'a9cefb86-ff4d-4ca7-940a-48de73511e4e'
    },
});

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<UsersStateType>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },
    followUsers(userID: string) {
        return instance.post<FollowDataType>(`follow/${userID}`, {}).then(response => response.data);
    },
    unfollowUsers(userID: string) {
        return instance.delete<FollowDataType>(`follow/${userID}`).then(response => response.data);
    },
    getProfile(userID: string) {
        return instance.get<ProfileType>(`profile/${userID}`).then(response => response.data);
    },
};

export const authAPI = {
    getAuthUser() {
        return instance.get<AuthType>(`auth/me`).then(response => response.data);
    },
};