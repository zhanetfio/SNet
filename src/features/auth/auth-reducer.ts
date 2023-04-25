import {AppDispatch, AppThunk} from "../../app/store";
import {authAPI, securityAPI} from '../../api/api';
import {setAppError} from '../../app/app-reducer';



let initialState: authStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null // if null, then captcha is not required
}

export type authStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null
}

const authReducer = (state: authStateType = initialState, action: ActionsAuthTypes): authStateType => {

    switch (action.type) {
        case "AUTH/SET_USER_DATA":
        case "AUTH/GET_CAPTCHA_URL_SUCCESS":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export type ActionsAuthTypes = ReturnType<typeof setAuthUserData> | ReturnType<typeof getCaptchaUrlSuccess>

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: "AUTH/SET_USER_DATA",
    payload: {userId, email, login, isAuth}
}) as const

export const getCaptchaUrlSuccess = (captchaUrl: string) => ({
    type: "AUTH/GET_CAPTCHA_URL_SUCCESS",
    payload: {captchaUrl}
}) as const

export const getAuthUserData = (): AppThunk => async (dispatch: AppDispatch) => {
    const response = await authAPI.me();
    if (response.data.resultCode === 0) {
        const {id, email, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setAppError(null))
    const response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        // success, get auth data
        dispatch(getAuthUserData())
    } else if (response.data.resultCode === 10) {
        dispatch(getCaptchaUrl())
    } else if (response.data.resultCode === 1) {
        dispatch(setAppError(response.data.messages[0]))
    }
}

export const getCaptchaUrl = (): AppThunk => async (dispatch: AppDispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logout = (): AppThunk => async (dispatch: AppDispatch) => {
    const response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer;

/*

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

            }
        /!* case 'AUTH/SET-IS-LOGGED-IN':
             return {...state, isAuth: action.isAuth}*!/

        default:
            return state
    }
}
*/
/*
export type AuthStateType = typeof initialState
export type AuthUserDataType = {
    id: number
    email: string
    login: string
}
const initialState = {
    isLoggedIn: false,
    userData: null as AuthUserDataType | null,
    avatar: null as string | null,
}

export const authReducer = (
    state: AuthStateType = initialState,
    action: AuthActionsType
): AuthStateType => {
    switch (action.type) {
        case 'AUTH/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.isLoggedIn }
        case 'AUTH/SET-USER-DATA':
            return { ...state, userData: action.userData }
        case 'AUTH/SET-AVATAR':
            return { ...state, avatar: action.avatar }
        default:
            return state
    }
}*/

/*

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
/!*export const setIsLoggedIn = (isAuth: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', isAuth} as const)*!/


// thunks
export const getAuthUserDataTC = (): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const res = await authAPI.me()
        dispatch(setUserData(res.data.id, res.data.email, res.data.login, true))
    } catch (e) {
        alert('Auth error!')
    }
}

export const setLoginDataTC = (data: LoginDataType) => async (dispatch: AppDispatch) => {
    try {
        const res = await authAPI.login(data)
        dispatch(getAuthUserDataTC())
    } catch (e) {
        alert('Error!')
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
*/
/*


export type AuthActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setUserDataAC>
    | ReturnType<typeof setAvatarAC>

export const setIsLoggedInAC = (isLoggedIn: boolean) =>
    ({
        type: 'AUTH/SET-IS-LOGGED-IN',
        isLoggedIn,
    } as const)

export const setUserDataAC = (userData: AuthUserDataType | null) =>
    ({
        type: 'AUTH/SET-USER-DATA',
        userData,
    } as const)

export const setAvatarAC = (avatar: string | null) =>
    ({
        type: 'AUTH/SET-AVATAR',
        avatar,
    } as const)


// thunks
export const getAuthUserDataTC = (): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const res = await authAPI.me()
        dispatch(setUserDataAC(res.data))
        dispatch(setIsLoggedInAC(true))
    } catch (e) {
        alert('Auth error!')
    }
}

export const setLoginDataTC = (data: LoginDataType) => async (dispatch: AppDispatch) => {
    try {
        const res = await authAPI.login(data)
        dispatch(getAuthUserDataTC())

    } catch (e) {
        alert('Error!')
    }

}
export const setLogoutTC = (): AppThunk => async (dispatch: AppDispatch) => {
    try {
        await authAPI.logout()
        dispatch(setIsLoggedInAC(false))
        dispatch(setUserDataAC(null))
    } catch (e) {
        alert('Log out error!')
    }
}
 export const fetchAvatarTC=(userId:number):AppThunk=> async (dispatch:AppDispatch)=>{
    try{
        const profile=await profileAPI.getProfile(userId)
        dispatch(setAvatarAC(profile.data))
    }
    catch (e){
        alert ('Error!')
    }
 }
*/



//types
/*export type AuthStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}*/
/*
export type AuthActionsType = ReturnType<typeof setUserData>*/
