import type {StudentDetail} from '@/type'
import apiClient from "@/services/AxiosClient";
import type {AxiosResponse} from "axios";

export default {
    getStudents(perPage: number, page: number): Promise<AxiosResponse<StudentDetail[]>> {
        return apiClient.get<StudentDetail[]>('/students?_limit=' + perPage + '&_page=' + page)
    },
    getStudentList(): Promise<AxiosResponse<StudentDetail[]>> {
        return apiClient.get<StudentDetail[]>('/students')
    },
    getStudentsById(id: number): Promise<AxiosResponse<StudentDetail>> {
        return apiClient.get<StudentDetail>('/students/' + id)
    },
    saveStudent(student: StudentDetail): Promise<AxiosResponse<StudentDetail>> {
        return apiClient.post<StudentDetail>('students', student)
    },
    getStudentsAdvisor(advisorId: number, perPage: number, page: number): Promise<AxiosResponse<StudentDetail[]>> {
        return apiClient.get<StudentDetail[]>('/students?advisorId=' + advisorId +'&_limit=' + perPage + '&_page=' + page)
    },
    getStudentsByKeyword(advisorId: number ,keyword: string, perPage: number, page: number): Promise<AxiosResponse<StudentDetail[]>> {
        return apiClient.get<StudentDetail[]>('/students?advisorId='+ advisorId +'&title=' + keyword + '&_limit=' + perPage + '&_page=' + page)
    }
}