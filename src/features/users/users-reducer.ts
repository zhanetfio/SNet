import {AppDispatch, AppThunk} from "../../app/store";
import { usersAPI} from "../../api/api";
import {AxiosResponse} from 'axios';
import {updateObjectInArray} from '../../utils/object-helpers';

/*

export type InitialStateType = {
    users: Array<UserType>
    pageSize: number
    totalUserCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>

}
const InitialState = {
    users: [],
    pageSize: 5,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}


export const contactsReducer = (state: InitialStateType = InitialState, action: ContactActionsType): InitialStateType => {
    switch (action.type) {
        case 'CONTACTS/FOLLOW': {
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.userId
                        ? {...user, followed: true}
                        : user)
            }
        }
        case 'CONTACTS/UNFOLLOW': {
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.userId
                        ? {...user, followed: false}
                        : user)
            }
        }
        case 'CONTACTS/SET-USERS': {
            return {...state, users: action.users}
        }
        case 'CONTACTS/SET-USERS-CURRENT-PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'CONTACTS/SET-USERS-TOTAL-COUNT':
            return {
                ...state,
                totalUserCount: action.count
            }
        case 'CONTACTS/TOGGLE-IS-FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'CONTACTS/TOGGLE-IS-FOLLOWING-PROGRESS': {
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state
    }
}
export const followSuccess = (userId: number) => ({type: 'CONTACTS/FOLLOW', userId} as const);
export const unFollowSuccess = (userId: number) => ({type: 'CONTACTS/UNFOLLOW', userId} as const);
export const setUsers = (users: Array<UserType>) => ({type: 'CONTACTS/SET-USERS', users} as const);
export const setUsersCurrentPage = (currentPage: number) => ({
    type: 'CONTACTS/SET-USERS-CURRENT-PAGE',
    currentPage
} as const)

export const setUsersTotalCount = (totalCount: number) => ({
    type: 'CONTACTS/SET-USERS-TOTAL-COUNT',
    count: totalCount
} as const)
export const toggleIsFetching = (isFetching: boolean) => ({
    type: 'CONTACTS/TOGGLE-IS-FETCHING',
    isFetching: isFetching
} as const)
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number) => ({
    type: 'CONTACTS/TOGGLE-IS-FOLLOWING-PROGRESS',
    isFetching,
    userId
} as const)

export const getUsersTC = (currentPage: number, pageSize: number): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(toggleIsFetching(true))
    const data = await contactsAPI.getContacts(currentPage, pageSize)
    dispatch(setUsers(data.items))
    dispatch(setUsersTotalCount(data.totalCount))
    dispatch(toggleIsFetching(false))
}

export const follow = (userId: number): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(toggleIsFollowingProgress(true, userId))
    const response = await contactsAPI.follow(userId)
    if (response.data.resultCode === 0) {
        dispatch(followSuccess(userId))
    }
    dispatch(toggleIsFollowingProgress(false, userId))

}
export const unFollow = (userId: number): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(toggleIsFollowingProgress(true, userId))
    const response = await contactsAPI.unFollow(userId)
    if (response.data.resultCode === 0) {
        dispatch(unFollowSuccess(userId))
    }
    dispatch(toggleIsFollowingProgress(false, userId))

}


//types
export type ContactActionsType =
    ReturnType<typeof followSuccess>
    | ReturnType<typeof unFollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setUsersCurrentPage>
    | ReturnType<typeof setUsersTotalCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleIsFollowingProgress>


export type UserType = {
    name: string,
    id: number,
    photos: {
        small: string | null,
        large: string | null
    },
    status: string | null,
    followed: boolean
}
*/

export type UserType = {
    id: number
    photos: { small: string }
    followed: boolean
    name: string
    status: string
    location: UserLocationType
}

type UserLocationType = {
    city: string
    country: string
}

let initialState: initialStateType = {
    users: [],
    pageSize: 12,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
    portionSize: 10
}

export type initialStateType = {
    users: Array<UserType>,
    pageSize: number
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: number[],
    portionSize: number
}

export const usersReducer = (state: initialStateType = initialState, action: ActionsUsersTypes): initialStateType => {

    switch (action.type) {
        case "USERS/FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case "USERS/UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case "USERS/SET_USERS":
            return {
                ...state, users: action.users
            }
        case "USERS/SET_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage}
        case "USERS/SET_TOTAL_USERS_COUNT":
            return {...state, totalUsersCount: action.totalUsersCount}
        case "USERS/TOGGLE_IS_FETCHING":
            return {...state, isFetching: action.isFetching}
        case "USERS/TOGGLE_IS_FOLLOWING_PROGRESS":
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

export type ActionsUsersTypes =
    ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>

export const followSuccess = (userId: number) => {
    return {
        type: "USERS/FOLLOW",
        userId
    } as const
}
export const unfollowSuccess = (userId: number) => {
    return {
        type: "USERS/UNFOLLOW",
        userId
    } as const
}
export const setUsers = (users: Array<UserType>) => {
    return {
        type: "USERS/SET_USERS",
        users
    } as const
}
export const setCurrentPage = (currentPage: number) => {
    return {
        type: "USERS/SET_CURRENT_PAGE",
        currentPage
    } as const
}
export const setTotalUsersCount = (totalUsersCount: number) => {
    return {
        type: "USERS/SET_TOTAL_USERS_COUNT",
        totalUsersCount
    } as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: "USERS/TOGGLE_IS_FETCHING",
        isFetching
    } as const
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => {
    return {
        type: "USERS/TOGGLE_IS_FOLLOWING_PROGRESS",
        isFetching,
        userId,
    } as const
}


/*export type ThunkType<A extends Action = Action> = ThunkAction<void, RootStateType, unknown, AnyAction | A>
export type ThunkDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>*/

export const requestUsers = (page: number, pageSize: number): AppThunk => {
    return async (dispatch: AppDispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        const data = await usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

const followUnfollowFlow = async (
    dispatch: AppDispatch,
    userId: number,
    apiMethod: (userId: number) => Promise<AxiosResponse>,
    actionCreator: (userId: number) => ReturnType<typeof followSuccess> | ReturnType<typeof unfollowSuccess>
) => {

    dispatch(toggleFollowingProgress(true, userId));
    const response = await apiMethod(userId);

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId));

}

export const follow = (userId: number): AppThunk => {
    return async (dispatch: AppDispatch) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
    }
}
export const unfollow = (userId: number): AppThunk => {
    return async (dispatch: AppDispatch) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
    }
}
