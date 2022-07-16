import {setAuthUserData, authReducer, AuthStateType} from '../reducers/auth-reducer';

let initialState: AuthStateType;

beforeEach(() => {
    initialState = {
        id: 0,
        login: '',
        email: '',
        rememberMe: false,
        isAuth: false,
    }
});

test('auth state should be created', () => {
    const authData: AuthStateType = {
        id: 2,
        login: '246hDaS3l66',
        email: 'rrr@gmail.com',
        isAuth: true,
    };

    const endState = authReducer(initialState, setAuthUserData(authData));

    expect(endState.id).toBe(2);
    expect(endState.login).toBe('246hDaS3l66');
    expect(endState.email).toBe('rrr@gmail.com');
    expect(Object.keys(endState).length).toBe(5);
});

test('isAuth of state should be change from false to true', () => {
    const authData: AuthStateType = {
        id: 0,
        login: '',
        email: '',
        isAuth: false,
    };

    const endState = authReducer(initialState, setAuthUserData(authData))

    expect(endState.isAuth).toBeTruthy();
});
