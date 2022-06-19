import {setAuthUserData, authReducer, AuthStateType, setAuthUser} from '../reducers/auth-reducer';

let initialState: AuthStateType;

beforeEach(() => {
    initialState = {
        userId: 0,
        login: null,
        email: null,
        rememberMe: false,
        isAuth: false,
    }
});

test('auth state should be created', () => {
    const endState = authReducer(initialState, setAuthUserData(2, '246hDaS3l66', 'rrr@gmail.com'));

    expect(endState.userId).toBe(2);
    expect(endState.login).toBe('246hDaS3l66');
    expect(endState.email).toBe('rrr@gmail.com');
    expect(Object.keys(endState).length).toBe(5);
});

test('isAuth of state should be change from false to true', () => {
    const endState = authReducer(initialState, setAuthUser(true))

    expect(endState.isAuth).toBeTruthy();
});
