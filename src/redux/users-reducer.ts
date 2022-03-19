import {v1} from 'uuid'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'

type AddressType = {
    country: string
    city: string
}
export type UsersType = {
    id: string
    followed: boolean
    photos: {large: string | null, small: string | null}
    name: string
    status: string
    address: AddressType
}
export type UsersDispatchProps = {
    type: string
    userId?: string
    users?: UsersType[]
}
export type UsersPageProps = {
    users: UsersType[]
}

const initialUsers: UsersPageProps = {users: []}

const usersReducer = (state= initialUsers, action: UsersDispatchProps) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user =>
                    (user.id === action.userId) ? {...user, followed: true} : user
                )
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user =>
                    (user.id === action.userId) ? {...user, followed: false} : user
                )
            }
        case SET_USERS:
            return {...state, users: [...state.users, ...action.users!]}
        default:
            return state
    }
}

// функции, которые возвращают action (объект)

// add users
export const followAC = (userId: string) => ({type: FOLLOW, userId})
export const unfollowAC = (userId: string) => ({type: UNFOLLOW, userId})
export const setUsersAC = (users: UsersType[]) => ({type: SET_USERS, users})

export default usersReducer