import axios from 'axios';
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
type ProfileDataType = {
    aboutMe: string
    contacts: {
        facebook: string
        website: string
        vk: string
        twitter: string
        instagram: string
        youtube: string
        github: string
        mainLink: string
    }
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: {
        small: string
        large: string
    }
}
type AuthType = {
    data: AuthDataType
    messages: Array<any>
    fieldsErrors: Array<any>
    resultCode: number
}
type GetLoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: boolean
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
        return instance.get<UsersStateType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    followUsers(userID: string) {
        return instance.post<FollowDataType>(`follow/${userID}`, {}).then(response => response.data);
    },
    unfollowUsers(userID: string) {
        return instance.delete<FollowDataType>(`follow/${userID}`).then(response => response.data);
    },
};

export const profileAPI = {
    getProfile(userID: string) {
        return instance.get<ProfileDataType>(`profile/${userID}`).then(response => response.data);
    },
    getStatus(userID: string) {
        return instance.get<string>(`profile/status/${userID}`).then(response => response.data);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status}).then(response => response)
    },
};

export const authAPI = {
    getAuthUser() {
        return instance.get<AuthType>(`auth/me`).then(response => response.data);
    },
    getLogin(email: string, password: string, rememberMe: boolean, captcha: boolean) {
        return instance.post('auth/login', {email, password, rememberMe, captcha}).then(response => {
            return response;
        })
    },
};