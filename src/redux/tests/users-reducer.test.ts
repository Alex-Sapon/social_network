import {
    followUnfollowToUser,
    ItemsType,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching,
    usersReducer,
    UsersStateType
} from '../reducers/users-reducer';

let initialUsers: UsersStateType;
let users: ItemsType[];

beforeEach(() => {
    initialUsers = {
        items: [
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
        pageSize: 6,
        totalCount: 0,
        currentPage: 1,
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
    const endState = usersReducer(initialUsers, followUnfollowToUser(1, true));

    expect(endState.items[0].followed).toBe(true);
});

test('change status to unfollow', () => {
    const endState = usersReducer(initialUsers, followUnfollowToUser(2, false));

    expect(endState.items[1].followed).toBe(false);
});

test('set new users', () => {
    const endState = usersReducer(initialUsers, setUsers(users))

    expect(endState.items).not.toBe(initialUsers.items);
    expect(endState.items[0].name).toBe('Jay');
    expect(endState.items[1].name).toBe('Jon');
});

test('set current page', () => {
    const endState = usersReducer(initialUsers, setCurrentPage(2))

    expect(endState).not.toBe(initialUsers);
    expect(endState.currentPage).toBe(2);
});

test('set total users count to page', () => {
    const endState = usersReducer(initialUsers, setTotalUsersCount(7))

    expect(endState).not.toBe(initialUsers);
    expect(endState.totalCount).toBe(7);
});

test('set total count to page', () => {
    const endState = usersReducer(initialUsers, toggleIsFetching(true))

    expect(endState).not.toBe(initialUsers);
    expect(endState.isFetching).toBe(true);
});