import {AppDispatch, AppThunk} from './store';
import {getAuthUserData} from '../features/auth/auth-reducer';

let initialState: appType = {
    initialized: false,
  /*  globalError: null,*/
}

export type appType = {
    initialized: boolean,
   /* globalError: null | string*/
}

export const appReducer = (state: appType = initialState, action: ActionsAppTypes): appType => {
    switch (action.type) {
        case "APP/INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true
            }
        /*case "APP/SET_ERROR":
            return {
                ...state, globalError: action.error
            }*/
        default:
            return state;
    }
}

export type ActionsAppTypes = ReturnType<typeof initializedSuccess>/* | ReturnType<typeof setAppError>*/

export const initializedSuccess = () => ({type: "APP/INITIALIZED_SUCCESS"}) as const
//export const setAppError = (error: string | null) => ({type: "APP/SET_ERROR", error}) as const

export const initializeApp = (): AppThunk => (dispatch: AppDispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        })
}

