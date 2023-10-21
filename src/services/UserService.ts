import type {UserDetail} from '@/type'
import apiClient from "@/services/AxiosClient";
import type {AxiosResponse} from "axios";

export default {
    getUsers(perPage: number, page: number): Promise<AxiosResponse<UserDetail[]>> {
        return apiClient.get<UserDetail[]>('/users?_limit=' + perPage + '&_page=' + page)
    },
    getUserList(): Promise<AxiosResponse<UserDetail[]>> {
        return apiClient.get<UserDetail[]>('/users')
    },
    getUsersById(id: number): Promise<AxiosResponse<UserDetail>> {
        return apiClient.get<UserDetail>('/users/' + id.toString())
    },
    saveUser(student: UserDetail): Promise<AxiosResponse<UserDetail>> {
        return apiClient.post<UserDetail>('users', student)
    },
    getUserByKeyword(keyword: string, perPage: number, page: number): Promise<AxiosResponse<UserDetail[]>> {
        return apiClient.get<UserDetail[]>('/users?title=' + keyword + '&_limit=' + perPage + '&_page=' + page)
    }
}