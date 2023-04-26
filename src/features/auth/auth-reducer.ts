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
