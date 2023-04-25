import {PhotosType, ProfileType} from './ProfileContainer';
import {PostsType} from './posts/post/Post';
import {AppDispatch, AppThunk} from '../../app/store';
import {profileAPI, usersAPI} from '../../api/api';
import {setAppError} from '../../app/app-reducer';
import {stopSubmit} from 'redux-form';

let initialState = {
    messageForNewPost: '',
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 0},
        {id: 2, message: 'Its my first post', likesCount: 23},
    ],
    profile: {} as  ProfileType,
    status: '',
}



export type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ActionsProfileTypes): InitialStateType => {

    switch (action.type) {
        case "PROFILE/ADD_POST": {
            const newPost: PostsType = {
                id: new Date().getTime(),
                message: action.newPostText,
                likesCount: 0,
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                messageForNewPost: ''
            };
        }
        case "PROFILE/SET_STATUS": {
            return {
                ...state,
                status: action.status
            };
        }
        case  "PROFILE/SET_USER_PROFILE": {
            return {
                ...state,
                profile: action.profile
            }
        }
        case "PROFILE/SET_USER_PHOTOS": {
            if (action.photos) {
                return {
                    ...state, profile: {...state.profile, photos: action.photos}
                }
            }
            return state

        }
        case  "PROFILE/DELETE_POST": {
            return {
                ...state,
                posts: state.posts.filter((post) => post.id !== action.postId)
            }
        }
        case  "PROFILE/SAVE_PHOTO_SUCCESS": {
            return {
                ...state,
                profile: {...state.profile!, photos: action.photos}
            }
        }
        default:
            return state;
    }
}

export type ActionsProfileTypes =
    ReturnType<typeof addPost>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof deletePost>
    | ReturnType<typeof savePhotoSuccess>
    | ReturnType<typeof setUserPhotos>

export const addPost = (newPostText: string) => {
    return {
        type:"PROFILE/ADD_POST",
        newPostText
    } as const
}

export const setUserProfile = (profile: ProfileType) => {
    return {
        type: "PROFILE/SET_USER_PROFILE",
        profile
    } as const
}
export const setUserPhotos = (photos: PhotosType | null) => {
    return {
        type: "PROFILE/SET_USER_PHOTOS",
        photos
    } as const
}
export const setStatus = (status: string) => {
    return {
        type: "PROFILE/SET_STATUS",
        status
    } as const
}

export const deletePost = (postId: number) => {
    return {
        type: "PROFILE/DELETE_POST",
        postId
    } as const
}

export const savePhotoSuccess = (photos: PhotosType) => {
    return {
        type: "PROFILE/SAVE_PHOTO_SUCCESS",
        photos
    } as const
}

export const getUserProfile = (userId: number | null): AppThunk => async (dispatch: AppDispatch) => {
    const response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data))
}

export const getStatus = (status: string): AppThunk => async (dispatch: AppDispatch) => {
    const response = await profileAPI.getStatus(status);
    dispatch(setStatus(response.data))
}

export const updateStatus = (status: string): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch (error: any) {
        dispatch(setAppError(error.message))
    }
}

export const savePhoto = (file: string): AppThunk => async (dispatch: AppDispatch) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType | null): AppThunk => async (dispatch: AppDispatch, getState) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
    }
}


