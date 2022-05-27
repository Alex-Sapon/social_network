import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching,
    unfollow,
    usersReducer,
    UsersStateType,
    followSuccess, unfollowSuccess, ItemsType
} from '../users-reducer'

test('change status to follow', () => {
    const initialUsers: UsersStateType = {
        items: [
            {
                id: 1,
                followed: false,
                uniqueUrlName: 'dd',
                photos: {large: null, small: null},
                name: 'Bob',
                status: 'I`am happy'
            },
            {
                id: 2,
                followed: false,
                uniqueUrlName: 'dd',
                photos: {large: null, small: null},
                name: 'Alex',
                status: 'I`am very happy'
            }
        ],
        pageSize: 6,
        totalCount: 0,
        currentPage: 1,
        isFetching: false,
        followingProgress: [] as Array<number>
    }

    const endState = usersReducer(initialUsers, followSuccess(2))

    expect(endState.items[1].followed).toBe(true)
    expect(initialUsers.items[1].followed).toBe(false)
})

test('change status to unfollow', () => {
    const initialUsers: UsersStateType = {
        items: [
            {
                id: 1,
                followed: true,
                uniqueUrlName: 'dd',
                photos: {large: null, small: null},
                name: 'Bob',
                status: 'I`am happy'
            },
            {
                id: 2,
                followed: true,
                uniqueUrlName: 'dd',
                photos: {large: null, small: null},
                name: 'Alex',
                status: 'I`am very happy'
            }
        ],
        pageSize: 6,
        totalCount: 0,
        currentPage: 1,
        isFetching: false,
        followingProgress: [] as Array<number>
    }

    const endState = usersReducer(initialUsers, unfollowSuccess(2))

    expect(endState.items[1].followed).toBe(false)
    expect(initialUsers.items[1].followed).toBe(true)
})

test('set new users', () => {
    const initialUsers: UsersStateType = {
        items: [
            {
                id: 1,
                followed: true,
                uniqueUrlName: 'dd',
                photos: {large: null, small: null},
                name: 'Bob',
                status: 'I`am happy'
            },
            {
                id: 2,
                followed: true,
                uniqueUrlName: 'dd',
                photos: {large: null, small: null},
                name: 'Alex',
                status: 'I`am very happy'
            }
        ],
        pageSize: 6,
        totalCount: 0,
        currentPage: 1,
        isFetching: false,
        followingProgress: [] as Array<number>
    }

    const users: Array<ItemsType> = [
        {
            id: 12,
            followed: false,
            uniqueUrlName: 'dd',
            photos: {large: null, small: null},
            name: 'Jay',
            status: 'Not bad'
        },
        {
            id: 22,
            followed: false,
            uniqueUrlName: 'dd',
            photos: {large: null, small: null},
            name: 'Jhon',
            status: 'Relax'
        }
    ]

    const endState = usersReducer(initialUsers, setUsers(users))

    expect(endState.items).not.toBe(initialUsers.items)
    expect(endState.items[0].name).toBe('Jay')
    expect(endState.items[1].name).toBe('Jhon')
})

test('set current page', () => {
    const initialUsers: UsersStateType = {
        items: [
            {
                id: 1,
                followed: true,
                uniqueUrlName: 'dd',
                photos: {large: null, small: null},
                name: 'Bob',
                status: 'I`am happy'
            },
            {
                id: 2,
                followed: true,
                uniqueUrlName: 'dd',
                photos: {large: null, small: null},
                name: 'Alex',
                status: 'I`am very happy'
            }
        ],
        pageSize: 6,
        totalCount: 0,
        currentPage: 1,
        isFetching: false,
        followingProgress: [] as Array<number>
    }

    const endState = usersReducer(initialUsers, setCurrentPage(2))

    expect(endState).not.toBe(initialUsers)
    expect(endState.currentPage).toBe(2)
})

test('set total users count to page', () => {
    const initialUsers: UsersStateType = {
        items: [
            {
                id: 1,
                followed: true,
                uniqueUrlName: 'dd',
                photos: {large: null, small: null},
                name: 'Bob',
                status: 'I`am happy'
            },
            {
                id: 2,
                followed: true,
                uniqueUrlName: 'dd',
                photos: {large: null, small: null},
                name: 'Alex',
                status: 'I`am very happy'
            }
        ],
        pageSize: 6,
        totalCount: 0,
        currentPage: 1,
        isFetching: false,
        followingProgress: [] as Array<number>
    }

    const endState = usersReducer(initialUsers, setTotalUsersCount(7))

    expect(endState).not.toBe(initialUsers)
    expect(endState.totalCount).toBe(7)
})

test('set total count to page', () => {
    const initialUsers: UsersStateType = {
        items: [
            {
                id: 1,
                followed: true,
                uniqueUrlName: 'dd',
                photos: {large: null, small: null},
                name: 'Bob',
                status: 'I`am happy'
            },
            {
                id: 2,
                followed: true,
                uniqueUrlName: 'dd',
                photos: {large: null, small: null},
                name: 'Alex',
                status: 'I`am very happy'
            }
        ],
        pageSize: 6,
        totalCount: 0,
        currentPage: 1,
        isFetching: false,
        followingProgress: [] as Array<number>
    }

    const endState = usersReducer(initialUsers, toggleIsFetching(true))

    expect(endState).not.toBe(initialUsers)
    expect(endState.isFetching).toBe(true)
})