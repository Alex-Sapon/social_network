import axios from 'axios';

// DAL - data access layer
const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'api-key': '22627d77-7d54-449a-a486-59a8089273ac',
    },
});


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

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<IProfile>(`profile/${userId}`);
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`);
    },
    updateStatus(status: string) {
        return instance.put<IResponse>(`profile/status`, {status: status});
    },
    savePhoto(photo: File) {
        const formData = new FormData();
        formData.append('image', photo);

        return instance.put<IResponse<{ photos: INewPhoto }>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};

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

// Interface
interface IUser {
    name: string
    id: number
    uniqueUrlName: string | null
    photos: {
        small: string | null
        large: string | null
    }
    status: string | null
    followed: boolean
}

interface IUserData {
    items: IUser[]
    totalCount: number
    error: string | null
}

export interface INewPhoto {
    large: string
    small: string
}

interface IResponse<D = {}> {
    data: D
    fieldsErrors: string[]
    resultCode: number
    messages: string[]
}

export interface IProfile {
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

export interface IAuthData {
    id: number
    login: string
    email: string
}

export interface IUserParams {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}