import axios from 'axios'
import {ProfileType} from '../redux/profile-reducer'
import {UsersStateType} from '../redux/users-reducer'

// DAL - data access layer

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'dc4940a2-7789-4c2e-98ae-8b765e4dc7bb'
    }
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<UsersStateType>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    followUsers(id: string) {
        return instance.post(`follow/${id}`, {}).then(response => response.data)
    },
    unfollowUsers(id: string) {
        return instance.delete(`follow/${id}`).then(response => response.data)
    },
    setAuthUser() {
        return instance.get(`auth/me`).then(response => response.data)
    },
    setProfile(id: string) {
        return instance.get<ProfileType>(`profile/${id}`).then(response => response.data)
    }
}