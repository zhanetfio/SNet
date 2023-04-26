import {AppDispatch, AppThunk} from "../../app/store";
import { usersAPI} from "../../api/api";
import {AxiosResponse} from 'axios';
import {updateObjectInArray} from '../../utils/object-helpers';


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
