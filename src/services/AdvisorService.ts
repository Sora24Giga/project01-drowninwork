import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type {AdvisorDetail, AdvisorOption, AdvisorReg} from '@/type'

const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'ContentType': 'application/json'
    }
})

export default {
    getAdvisorlist(): Promise<AxiosResponse<AdvisorOption[]>> {
        return apiClient.get<AdvisorOption[]>(`/advisors`)
    },
    getAdvisors(perPage: number, page: number): Promise<AxiosResponse<AdvisorDetail[]>> {
        return apiClient.get<AdvisorDetail[]>('/advisors?_limit=' + perPage + '&_page=' + page)
    },
    getAdvisorsById(id: number): Promise<AxiosResponse<AdvisorDetail>> {
        return apiClient.get<AdvisorDetail>('/advisors/' + id.toString())
    },
    saveAdvisor(advisor: AdvisorReg): Promise<AxiosResponse<AdvisorDetail>> {
        return apiClient.post<AdvisorDetail>('/advisors', advisor)
    }
}