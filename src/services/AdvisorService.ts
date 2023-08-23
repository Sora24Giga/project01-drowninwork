import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { AdvisorDetail } from '@/type'

const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3003',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'ContentType': 'application/json'
    }
})

export default {
    getAdvisors(perPage: number, page: number): Promise<AxiosResponse<AdvisorDetail[]>> {
        return apiClient.get<AdvisorDetail[]>('/advisors?_limit=' + perPage + '&_page=' + page)
    },
    getAdvisorsById(id: number): Promise<AxiosResponse<AdvisorDetail>> {
        return apiClient.get<AdvisorDetail>('/advisors/' + id.toString())
    },
}