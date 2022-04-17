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

const initialUsers = {
    users: [] as UsersType[],
    pageSize: 6,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
}
type InitialPageType = typeof initialUsers

export const usersReducer = (state: InitialPageType = initialUsers, action: ActionTypes): InitialPageType => {
    switch (action.type) {
        case 'FOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)}
        case 'UNFOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)}
        case 'SET_USERS':
            return {...state, users: action.users}
        case 'SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}
        case 'SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.totalUsersCount}
        case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}

type ActionTypes = ReturnType<typeof follow> | ReturnType<typeof unfollow>
    | ReturnType<typeof setUsers> | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount> | ReturnType<typeof toggleIsFetching>

export const follow = (userId: string) => ({type: 'FOLLOW', userId} as const)
export const unfollow = (userId: string) => ({type: 'UNFOLLOW', userId} as const)
export const setUsers = (users: UsersType[]) => ({type: 'SET_USERS', users} as const)
export const setCurrentPage = (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const)
export const setTotalUsersCount = (totalUsersCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', totalUsersCount} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const)