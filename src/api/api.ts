import axios, {AxiosResponse} from "axios";
import {ProfileType} from '../features/profile/ProfileContainer';
import {UserType} from '../features/users/users-reducer';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '9e1ccf6a-65b5-418c-afa3-916828fe6fef'
    }
})
export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data;
        })
    },
    follow(userId: number) {
        return instance.post<AxiosResponse<UserType>>(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete<AxiosResponse<UserType>>(`follow/${userId}`)
    },
    getProfile(userId: number | null) {
        console.log('Obsolete method. Please use profileAPI object.')
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status});
    },
    savePhoto(photoFile: string) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType | null) {
        return instance.put(`profile`, profile);
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha});
    },
    logout() {
        return instance.delete(`auth/login`);
    },
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    }
}

/*
export const contactsAPI = {
    getContacts(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then((res) => {
                return res.data;
            })
    },
    follow(userId: number) {
        return (
            instance.post(`follow/${userId}`)
                .then((res) => {
                    return res.data;
                })
        )
    },
    unFollow(userId: number) {
        return (
            instance.delete(`follow/${userId}`)
                .then((res) => {
                    return res.data;
                })
        )
    }
}

export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: number|null) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status})
    },
    changePhoto: (image: string) => {
        const formData = new FormData()
        formData.append('image', image)
        return instance.put('/profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
}

export const authAPI = {
    me() {
        return instance.get<AuthUserDataType>(`auth/me`)
    },
    login(data: LoginDataType) {
        return instance.post<LoginDataType, ResponseLoginDataType>('auth/login', data)
    },
    logout() {
        return instance.delete('auth/login')
    }
}

export type LoginDataType = {
    email: string
    password: string
    rememberMe?: boolean
}
export type ResponseLoginDataType = {
    userId: number | null
}
export type AuthUserDataType = {
    id: number
    email: string
    login: string
}
*/
