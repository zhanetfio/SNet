import {applyMiddleware,compose, combineReducers,  legacy_createStore as createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {ActionsProfileTypes, profileReducer} from "../features/profile/profile-reducer";
import {ActionsDialogsTypes, dialogsReducer} from "../features/dialogs/dialogs-reducer";
// @ts-ignore
import {reducer as formReducer} from 'redux-form'
import {ActionsUsersTypes,  usersReducer} from "../features/users/users-reducer";
import {ActionsAppTypes, appReducer} from './app-reducer';
import authReducer, {ActionsAuthTypes} from '../features/auth/auth-reducer';



export type ActionsTypes =
    ActionsProfileTypes
    | ActionsDialogsTypes
    | ActionsUsersTypes
    | ActionsAuthTypes
    | ActionsAppTypes

let rootReducer = combineReducers({
     profilePage: profileReducer,
     dialogsPage: dialogsReducer,
     usersPage: usersReducer,
     auth: authReducer,
     form: formReducer,
     app: appReducer
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

//types
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, ActionsTypes>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, ActionsTypes>



export type StoreType = typeof store
// @ts-ignore
window.__store__ = store;

export default store;

