import {AppRootStateType} from '../../app/store';
import {UserType} from './users-reducer';
import {createSelector} from 'reselect';


const getUsersSelector = (state: AppRootStateType): Array<UserType> => {
    return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true)
})

export const getPageSize = (state: AppRootStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppRootStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppRootStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: AppRootStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AppRootStateType) => {
    return state.usersPage.followingInProgress
}

export const getPortionSize = (state: AppRootStateType) => {
    return state.usersPage.portionSize
}