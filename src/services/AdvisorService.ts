import type {AdvisorDetail} from '@/type'
import apiClient from "@/services/AxiosClient";
import type {AxiosResponse} from "axios";

export default {
    getAdvisorlist(): Promise<AxiosResponse<AdvisorDetail[]>> {
        return apiClient.get<AdvisorDetail[]>(`/advisors`)
    },
    getAdvisors(perPage: number, page: number): Promise<AxiosResponse<AdvisorDetail[]>> {
        return apiClient.get<AdvisorDetail[]>('/advisors?_limit=' + perPage + '&_page=' + page)
    },
    getAdvisorsById(id: number): Promise<AxiosResponse<AdvisorDetail>> {
        return apiClient.get<AdvisorDetail>('/advisors/' + id.toString())
    },
    saveAdvisor(advisor: AdvisorDetail): Promise<AxiosResponse<AdvisorDetail>> {
        return apiClient.post<AdvisorDetail>('/advisors', advisor)
    },
    getAdvisorsByKeyword(keyword: string, perPage: number, page: number): Promise<AxiosResponse<AdvisorDetail[]>> {
        return apiClient.get<AdvisorDetail[]>('/advisors?title=' + keyword + '&_limit=' + perPage + '&_page=' + page)
    }
}