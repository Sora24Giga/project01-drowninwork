import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { StudentDetail, AdvisorDetail } from '@/type'

const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3003',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'ContentType': 'application/json'
    }
})

export default {
    getStudents(perPage: number, page: number): Promise<AxiosResponse<StudentDetail[]>> {
        return apiClient.get<StudentDetail[]>('/students?_limit=' + perPage + '&_page=' + page)
    },
    getAdvisors(perPage: number, page: number): Promise<AxiosResponse<AdvisorDetail[]>> {
        return apiClient.get<AdvisorDetail[]>('/advisors?_limit=' + perPage + '&_page=' + page)
    },
    getStudentsById(id: number): Promise<AxiosResponse<StudentDetail>> {
        return apiClient.get<StudentDetail>('/students/' + id.toString())
    },
    getAdvisorsById(id: number): Promise<AxiosResponse<AdvisorDetail>> {
        return apiClient.get<AdvisorDetail>('/advisors/' + id.toString())
    },
}