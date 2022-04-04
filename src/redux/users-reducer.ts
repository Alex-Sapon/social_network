const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

type AddressType = {
    country: string
    city: string
}
export type UsersType = {
    id: string
    followed: boolean
    photos: { large: string | null, small: string | null }
    name: string
    status: string
    address: AddressType
}
export type UsersDispatchType = {
    type: string
    userId?: string
    currentPage?: number
    totalUsersCount?: number
    users?: UsersType[]
    isFetching?: boolean
}
export type UsersPageProps = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}

const initialUsers: UsersPageProps = {
    users: [],
    pageSize: 6,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
}

const usersReducer = (state = initialUsers, action: UsersDispatchType) => {
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
            return {...state, users: action.users} // перезатираем юзеров, чтобы небыло накопления !!!!!
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}

export type ActionTypes = ReturnType<typeof followAC> | ReturnType<typeof unfollowAC> | ReturnType<typeof setUsersAC> |
    ReturnType<typeof setCurrentPageAC> | ReturnType<typeof setTotalUsersCountAC> | ReturnType<typeof toggleIsFetchingAC>

// функции, которые возвращают action (объект)

// add users
export const followAC = (userId: string) => ({type: FOLLOW, userId} as const)
export const unfollowAC = (userId: string) => ({type: UNFOLLOW, userId})
export const setUsersAC = (users: UsersType[]) => ({type: SET_USERS, users})
export const setCurrentPageAC = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCountAC = (totalUsersCount: number) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
export const toggleIsFetchingAC = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching})

export default usersReducer