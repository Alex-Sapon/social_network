export interface IUser {
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

export interface IUserData {
    items: IUser[]
    totalCount: number
    error: string | null
}

export interface INewPhoto {
    large: string
    small: string
}

export interface IResponse<D = {}> {
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

export interface IUpdateProfile {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
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
    captcha: null | string
}