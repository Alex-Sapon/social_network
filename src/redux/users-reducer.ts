type AddressType = {
    country: string
    city: string
}
export type ItemsType = {
    name: string
    id: string
    uniqueUrlName: string
    photos: {
        small: string | null,
        large: string | null
    }
    status: string
    followed: boolean
    address: AddressType
}

const initialUsers = {
    items: [] as ItemsType[],
    totalCount: 0,
    pageSize: 6,
    currentPage: 1,
    isFetching: false,
    followingProgress: [] as Array<string>
}

export type UsersStateType = typeof initialUsers

export const usersReducer = (state: UsersStateType = initialUsers, action: ActionsType): UsersStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {...state, items: state.items.map(u => u.id === action.userId ? {...u, followed: true} : u)}
        case 'UNFOLLOW':
            return {...state, items: state.items.map(u => u.id === action.userId ? {...u, followed: false} : u)}
        case 'SET-USERS':
            return {...state, items: action.users}
        case 'SET-CURRENT-PAGE':
            return {...state, currentPage: action.currentPage}
        case 'SET-TOTAL-USERS-COUNT':
            return {...state, totalCount: action.totalCount}
        case 'TOGGLE-IS-FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'TOGGLE-FOLLOWING-PROGRESS':
            return {...state, followingProgress: action.isFetching
                    ? [...state.followingProgress, action.id] : state.followingProgress.filter(i => i !== action.id)}
        default:
            return state
    }
}

type ActionsType = ReturnType<typeof follow> | ReturnType<typeof unfollow>
    | ReturnType<typeof setUsers> | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount> | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>

export const follow = (userId: string) => ({type: 'FOLLOW', userId} as const)
export const unfollow = (userId: string) => ({type: 'UNFOLLOW', userId} as const)
export const setUsers = (users: ItemsType[]) => ({type: 'SET-USERS', users} as const)
export const setCurrentPage = (currentPage: number) => ({type: 'SET-CURRENT-PAGE', currentPage} as const)
export const setTotalUsersCount = (totalCount: number) => ({type: 'SET-TOTAL-USERS-COUNT', totalCount} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: 'TOGGLE-IS-FETCHING', isFetching} as const)
export const toggleFollowingProgress = (isFetching: boolean, id: string) => ({type: 'TOGGLE-FOLLOWING-PROGRESS', isFetching, id} as const)