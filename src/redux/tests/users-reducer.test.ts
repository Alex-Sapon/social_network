import {follow, setCurrentPage, setTotalUsersCount, setUsers, toggleIsFetching, unfollow, usersReducer, UsersStateType, UsersType} from '../users-reducer'

test('change status to follow', () => {
    const initialUsers: UsersStateType = {
        users: [
            {
                id: '1',
                followed: false,
                photos: {large: null, small: null},
                name: 'Bob',
                status: 'I`am happy',
                address: {
                    country: 'Belarus',
                    city: 'Minsk'
                }
            },
            {
                id: '2',
                followed: false,
                photos: {large: null, small: null},
                name: 'Alex',
                status: 'I`am very happy',
                address: {
                    country: 'Russia',
                    city: 'Moscow'
                }
            }
        ],
        pageSize: 6,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false
    }

    const endState = usersReducer(initialUsers, follow('2'))

    expect(endState.users[1].followed).toBe(true)
    expect(initialUsers.users[1].followed).toBe(false)
})

test('change status to unfollow', () => {
    const initialUsers: UsersStateType = {
        users: [
            {
                id: '1',
                followed: true,
                photos: {large: null, small: null},
                name: 'Bob',
                status: 'I`am happy',
                address: {
                    country: 'Belarus',
                    city: 'Minsk'
                }
            },
            {
                id: '2',
                followed: true,
                photos: {large: null, small: null},
                name: 'Alex',
                status: 'I`am very happy',
                address: {
                    country: 'Russia',
                    city: 'Moscow'
                }
            }
        ],
        pageSize: 6,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false
    }

    const endState = usersReducer(initialUsers, unfollow('2'))

    expect(endState.users[1].followed).toBe(false)
    expect(initialUsers.users[1].followed).toBe(true)
})

test('set new users', () => {
    const initialUsers: UsersStateType = {
        users: [
            {
                id: '1',
                followed: true,
                photos: {large: null, small: null},
                name: 'Bob',
                status: 'I`am happy',
                address: {
                    country: 'Belarus',
                    city: 'Minsk'
                }
            },
            {
                id: '2',
                followed: true,
                photos: {large: null, small: null},
                name: 'Alex',
                status: 'I`am very happy',
                address: {
                    country: 'Russia',
                    city: 'Moscow'
                }
            }
        ],
        pageSize: 6,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false
    }

    const users: Array<UsersType> = [
        {
            id: '1-2',
            followed: false,
            photos: {large: null, small: null},
            name: 'Jay',
            status: 'Not bad',
            address: {
                country: 'Ukrain',
                city: 'Kiev'
            }
        },
        {
            id: '2-2',
            followed: false,
            photos: {large: null, small: null},
            name: 'Jhon',
            status: 'Relax',
            address: {
                country: 'German',
                city: 'Berlin'
            }
        }
    ]

    const endState = usersReducer(initialUsers, setUsers(users))
    
    expect(endState.users).not.toBe(initialUsers.users)
    expect(endState.users[0].name).toBe('Jay')
    expect(endState.users[1].name).toBe('Jhon')
})

test('set current page', () => {
    const initialUsers: UsersStateType = {
        users: [
            {
                id: '1',
                followed: true,
                photos: {large: null, small: null},
                name: 'Bob',
                status: 'I`am happy',
                address: {
                    country: 'Belarus',
                    city: 'Minsk'
                }
            },
            {
                id: '2',
                followed: true,
                photos: {large: null, small: null},
                name: 'Alex',
                status: 'I`am very happy',
                address: {
                    country: 'Russia',
                    city: 'Moscow'
                }
            }
        ],
        pageSize: 6,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false
    }

    const endState = usersReducer(initialUsers, setCurrentPage(2))

    expect(endState).not.toBe(initialUsers)
    expect(endState.currentPage).toBe(2)
})

test('set total users count to page', () => {
    const initialUsers: UsersStateType = {
        users: [
            {
                id: '1',
                followed: true,
                photos: {large: null, small: null},
                name: 'Bob',
                status: 'I`am happy',
                address: {
                    country: 'Belarus',
                    city: 'Minsk'
                }
            },
            {
                id: '2',
                followed: true,
                photos: {large: null, small: null},
                name: 'Alex',
                status: 'I`am very happy',
                address: {
                    country: 'Russia',
                    city: 'Moscow'
                }
            }
        ],
        pageSize: 6,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false
    }

    const endState = usersReducer(initialUsers, setTotalUsersCount(7))

    expect(endState).not.toBe(initialUsers)
    expect(endState.totalUsersCount).toBe(7)
})

test('set total users count to page', () => {
    const initialUsers: UsersStateType = {
        users: [
            {
                id: '1',
                followed: true,
                photos: {large: null, small: null},
                name: 'Bob',
                status: 'I`am happy',
                address: {
                    country: 'Belarus',
                    city: 'Minsk'
                }
            },
            {
                id: '2',
                followed: true,
                photos: {large: null, small: null},
                name: 'Alex',
                status: 'I`am very happy',
                address: {
                    country: 'Russia',
                    city: 'Moscow'
                }
            }
        ],
        pageSize: 6,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false
    }

    const endState = usersReducer(initialUsers, toggleIsFetching(true))

    expect(endState).not.toBe(initialUsers)
    expect(endState.isFetching).toBe(true)
})