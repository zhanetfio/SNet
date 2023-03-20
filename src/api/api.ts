import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '9e1ccf6a-65b5-418c-afa3-916828fe6fef'
    }
})

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
    }
}
export const authAPI = {
    me() {
        return instance.get(`auth/me`)
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