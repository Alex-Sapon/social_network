export type AuthStateType = {
    id: number
    login: string
    email: string
    isAuth: boolean
}

const initialState: AuthStateType = {
    id: 1,
    login: '',
    email: '',
    isAuth: false
}

export const authReducer = (state: AuthStateType = initialState, action: ActionsType): AuthStateType => {
    switch (action.type) {
        case 'SET-AUTH-USER':
            return {...state, ...action.payload, isAuth: true}
        default:
            return state
    }
}

type ActionsType = ReturnType<typeof setAuthUserData>

export const setAuthUserData = (id: number, login: string, email: string) => ({type: 'SET-AUTH-USER', payload: {id, login, email}} as const)