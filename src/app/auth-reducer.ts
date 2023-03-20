import {AppDispatch, AppThunk} from "./store";
import {authAPI, LoginDataType} from "../api/api";


const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

export const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case 'AUTH/SET-USER-DATA':
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }

        default:
            return state
    }

}

export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: 'AUTH/SET-USER-DATA',
        payload: {
            id,
            email,
            login,
            isAuth
        }

    } as const
}

export const getAuthUserDataTC = (): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setUserData(res.data.id, res.data.email, res.data.login, true))
        }
    } catch (e) {
        alert('Auth error!')
    }
}

export const setLoginDataTC = (data: LoginDataType) =>async (dispatch: AppDispatch) => {
    try {
       const res= await authAPI.login(data)
        dispatch(getAuthUserDataTC())
    }
  catch (e){
        alert ('Error!')
  }

}

export const setLogoutTC = (): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const res = await authAPI.logout()
        dispatch(setUserData(null, null, null, false))
    } catch (e) {
        alert('Log out error!')
    }

}

//types
export  type AuthStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
export type AuthActionsType = ReturnType<typeof setUserData>