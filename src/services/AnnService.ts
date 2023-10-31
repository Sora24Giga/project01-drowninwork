import type {Announcement} from '@/type'
import apiClient from "@/services/AxiosClient";
import type {AxiosResponse} from "axios";

export default {
    getAnnouncemenList(): Promise<AxiosResponse<Announcement[]>> {
        return apiClient.get<Announcement[]>(`/anns`)
    },
    getAnnouncements(perPage: number, page: number): Promise<AxiosResponse<Announcement[]>> {
        return apiClient.get<Announcement[]>('/anns?_limit=' + perPage + '&_page=' + page)
    },
    getAnnouncementsById(id: number): Promise<AxiosResponse<Announcement>> {
        return apiClient.get<Announcement>('/anns/' + id.toString())
    },
    saveAnnouncement(advisor: Announcement): Promise<AxiosResponse<Announcement>> {
        console.log('service save')
        console.log(advisor)
        return apiClient.post<Announcement>('/anns', advisor)
    },
    getAnnouncementsByKeyword(keyword: number, perPage: number, page: number): Promise<AxiosResponse<Announcement[]>> {
        return apiClient.get<Announcement[]>('/anns?advisorId=' + keyword + '&_limit=' + perPage + '&_page=' + page)
    }
}