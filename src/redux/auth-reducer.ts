export type AuthStateType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}
export type AuthType = {
    auth: AuthStateType
}

const initialState: AuthStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false
}

export const authReducer = (state: AuthStateType = initialState, action: ActionsType): AuthStateType => {
    switch (action.type) {
        case 'AUTH-ADD':
            return {...state, ...action.payload, isAuth: true}
        default:
            return state
    }
}

type ActionsType = ReturnType<typeof setAuthUserData>

export const setAuthUserData = (id: number, login: string, email: string) => ({type: 'AUTH-ADD', payload: {id, login, email}} as const)