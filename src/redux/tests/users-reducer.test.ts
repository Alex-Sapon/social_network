import {
    followUnfollowToUser,
    UserType,
    usersSlice, fetchUsers,
} from '../../components/Users/users-reducer';

let initialUsers: any;
let users: UserType[];

beforeEach(() => {
    initialUsers = {
        users: [
            {
                id: 1,
                followed: false,
                uniqueUrlName: 'dd',
                photos: {large: null, small: null},
                name: 'Bob',
                status: 'I`am happy',
            },
            {
                id: 2,
                followed: true,
                uniqueUrlName: 'dd',
                photos: {large: null, small: null},
                name: 'Alex',
                status: 'I`am very happy',
            }
        ],
        count: 6,
        totalCount: 0,
        page: 1,
        isFetching: false,
        followingProgress: [] as number[],
    }

    users = [
        {
            id: 12,
            followed: false,
            uniqueUrlName: 'dd',
            photos: {large: null, small: null},
            name: 'Jay',
            status: 'Not bad',
        },
        {
            id: 22,
            followed: false,
            uniqueUrlName: 'dd',
            photos: {large: null, small: null},
            name: 'Jon',
            status: 'Relax',
        }
    ]
});

test('change status to follow', () => {
    const endState = usersSlice.reducer(initialUsers, followUnfollowToUser(1, true));

    expect(endState.users[0].followed).toBe(true);
});

test('change status to unfollow', () => {
    const endState = usersSlice.reducer(initialUsers, followUnfollowToUser(2, false));

    expect(endState.users[1].followed).toBe(false);
});

test('set users data', () => {
    const endState = usersSlice.reducer(initialUsers, fetchUsers.fulfilled({
        users: initialUsers.users,
        page: initialUsers.page,
        totalCount: initialUsers.totalCount
    }, '', {page: 1, count: 6}))

    expect(endState.users).not.toBe(initialUsers.users);
    expect(endState.users[0].name).toBe('Jay');
    expect(endState.users[1].name).toBe('Jon');
});