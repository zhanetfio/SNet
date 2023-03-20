import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {ProfileActionTypes, profileReducer} from "../features/profile/profile-reducer";
import {DialogsActionTypes, dialogsReducer} from "../features/dialogs/dialogs-reducer";
import {AuthActionsType, authReducer} from "./auth-reducer";
import {ContactActionsType, contactsReducer} from "../features/contacts/contacts-reducer";


const rootReducer = combineReducers({
     profile: profileReducer,
     dialogs: dialogsReducer,
     contacts: contactsReducer,
     auth: authReducer
})

//store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;

//types
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppActionsType = AuthActionsType | ProfileActionTypes | DialogsActionTypes | ContactActionsType
